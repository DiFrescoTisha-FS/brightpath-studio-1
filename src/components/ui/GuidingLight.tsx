import { useEffect, useState, useRef, useMemo } from "react";

export interface Waypoint {
  /** Section ID or identifier */
  id: string;
  /** Horizontal position: 'left' | 'right' | number (0-1 where 0=left gutter, 1=right gutter) */
  side: "left" | "right" | number;
  /** Vertical position as percentage of page height (0-1), or 'auto' to detect from DOM */
  scrollProgress: number | "auto";
}

interface GuidingLightProps {
  /** Array of waypoints defining the zig-zag path */
  waypoints?: Waypoint[];
  /** Size of the orb in pixels */
  size?: number;
  /** Base opacity of the orb (0-1) */
  opacity?: number;
  /** Whether to show the orb */
  enabled?: boolean;
  /** Easing factor (0-1, lower = smoother/slower) */
  easing?: number;
  /** Gutter offset from viewport edge in pixels */
  gutterOffset?: number;
  /** Content area max-width to avoid (defaults to 1280px / max-w-7xl) */
  contentMaxWidth?: number;
   /** Scales the glow layers only (1 = normal) */
  glowScale?: number;
}

// Default waypoints for a zig-zag path through typical page sections
const DEFAULT_WAYPOINTS: Waypoint[] = [
  { id: "hero", side: "right", scrollProgress: 0 },
  { id: "services", side: "left", scrollProgress: 0.15 },
  { id: "portfolio", side: "right", scrollProgress: 0.35 },
  { id: "reviews", side: "left", scrollProgress: 0.55 },
  { id: "story", side: "right", scrollProgress: 0.75 },
  { id: "footer", side: "left", scrollProgress: 0.95 },
];

/**
 * GuidingLight - A scroll-based guiding light with zig-zag path
 *
 * A soft glowing orb that follows a waypoint-defined path as the user scrolls,
 * traveling through page gutters and avoiding content overlap.
 */
export default function GuidingLight({
  waypoints = DEFAULT_WAYPOINTS,
  size = 20,
  opacity = 0.55,
  enabled = true,
  easing = 0.06,
  gutterOffset = 40,
  contentMaxWidth = 1280,
  glowScale = 1,
}: GuidingLightProps) {
  const [position, setPosition] = useState({ x: 0, y: 0, opacity: opacity });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const rafRef = useRef<number | null>(null);
  const currentPosRef = useRef({ x: 0, y: 0 });
  const targetPosRef = useRef({ x: 0, y: 0 });

  // Check for reduced motion preference and viewport size
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    motionQuery.addEventListener("change", handleMotionChange);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate gutter positions based on viewport and content width
  const gutterPositions = useMemo(() => {
    const contentStart = Math.max(0, (viewportWidth - contentMaxWidth) / 2);
    const contentEnd = viewportWidth - contentStart;

    // Left gutter: between viewport edge and content
    const leftGutter = Math.max(gutterOffset, contentStart / 2);
    // Right gutter: between content and viewport edge
    const rightGutter = Math.min(
      viewportWidth - gutterOffset,
      contentEnd + (viewportWidth - contentEnd) / 2
    );

    // On mobile, use minimal lateral movement - stay in right gutter
    if (isMobile) {
      const mobileGutter = viewportWidth - gutterOffset;
      return { left: mobileGutter, right: mobileGutter, center: mobileGutter };
    }

    return {
      left: leftGutter,
      right: rightGutter,
      center: viewportWidth / 2,
    };
  }, [viewportWidth, contentMaxWidth, gutterOffset, isMobile]);

  // Convert waypoint side to x position
  const getXPosition = (side: "left" | "right" | number): number => {
    if (side === "left") return gutterPositions.left;
    if (side === "right") return gutterPositions.right;
    // Numeric value: interpolate between left and right gutters
    return gutterPositions.left + side * (gutterPositions.right - gutterPositions.left);
  };

  // Smooth animation loop
  useEffect(() => {
    if (!enabled || prefersReducedMotion) return;

    const verticalPadding = 80;
    const viewportHeight = window.innerHeight;
    const travelDistance = viewportHeight - verticalPadding * 2 - size;

    const updateTargetPosition = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;

      // Find current and next waypoint based on scroll progress
      let currentWaypointIndex = 0;
      for (let i = 0; i < waypoints.length - 1; i++) {
        const wpProgress = waypoints[i].scrollProgress;
        if (typeof wpProgress === "number" && scrollProgress >= wpProgress) {
          currentWaypointIndex = i;
        }
      }

      const currentWaypoint = waypoints[currentWaypointIndex];
      const nextWaypoint = waypoints[Math.min(currentWaypointIndex + 1, waypoints.length - 1)];

      const currentProgress =
        typeof currentWaypoint.scrollProgress === "number" ? currentWaypoint.scrollProgress : 0;
      const nextProgress =
        typeof nextWaypoint.scrollProgress === "number" ? nextWaypoint.scrollProgress : 1;

      // Calculate interpolation factor between waypoints
      const progressRange = nextProgress - currentProgress;
      const localProgress =
        progressRange > 0 ? (scrollProgress - currentProgress) / progressRange : 0;

      // Smooth easing function (ease-in-out)
      const easedProgress = localProgress < 0.5
        ? 2 * localProgress * localProgress
        : 1 - Math.pow(-2 * localProgress + 2, 2) / 2;

      // Clamp to valid range
      const clampedProgress = Math.max(0, Math.min(1, easedProgress));

      // Interpolate X position between waypoints
      const startX = getXPosition(currentWaypoint.side);
      const endX = getXPosition(nextWaypoint.side);
      const targetX = startX + (endX - startX) * clampedProgress;

      // Y position based on overall scroll progress
      const targetY = verticalPadding + scrollProgress * travelDistance;

      targetPosRef.current = { x: targetX, y: targetY };
    };

    const animate = () => {
      // Smooth interpolation toward target
      const dx = targetPosRef.current.x - currentPosRef.current.x;
      const dy = targetPosRef.current.y - currentPosRef.current.y;

      // Only update if there's meaningful movement
      if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
        currentPosRef.current.x += dx * easing;
        currentPosRef.current.y += dy * easing;

        // Calculate opacity based on proximity to content center
        const distanceFromCenter = Math.abs(currentPosRef.current.x - viewportWidth / 2);
        const contentHalfWidth = contentMaxWidth / 2;
        const isOverContent = distanceFromCenter < contentHalfWidth;

        // Reduce opacity when closer to center (over content)
        const proximityFactor = isOverContent
          ? 0.5 + (distanceFromCenter / contentHalfWidth) * 0.5
          : 1;

        setPosition({
          x: currentPosRef.current.x,
          y: currentPosRef.current.y,
          opacity: opacity * proximityFactor,
        });
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // Initialize positions
    updateTargetPosition();
    currentPosRef.current = { ...targetPosRef.current };
    setPosition({
      x: currentPosRef.current.x,
      y: currentPosRef.current.y,
      opacity,
    });

    // Start animation loop
    rafRef.current = requestAnimationFrame(animate);

    // Listen for scroll to update target
    window.addEventListener("scroll", updateTargetPosition, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateTargetPosition);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled, prefersReducedMotion, easing, waypoints, gutterPositions, viewportWidth, contentMaxWidth, opacity, size]);

  // Don't render if disabled or reduced motion is preferred
  if (!enabled || prefersReducedMotion) {
    return null;
  }

  // Calculate blur based on opacity (more blur when faded)
  const dynamicBlur = position.opacity < opacity ? 4 + (1 - position.opacity / opacity) * 8 : 0;

  return (
    <div
      className="fixed pointer-events-none z-30"
      style={{
        left: 0,
        top: 0,
        transform: `translate(${position.x - size / 2}px, ${position.y}px)`,
        willChange: "transform, opacity",
        filter: dynamicBlur > 0 ? `blur(${dynamicBlur}px)` : undefined,
      }}
      aria-hidden="true"
    >
      {/* Outer glow layer - softest, largest */}
      <div
        className="absolute rounded-full transition-opacity duration-300"
        style={{
          width: size * 4 * glowScale,
          height: size * 4 * glowScale,
          top: -(size * 4 * glowScale - size) / 2,
          left: -(size * 4 * glowScale - size) / 2,
          
          background: `radial-gradient(circle, hsl(44 91% 54% / ${position.opacity * 0.2}) 0%, transparent 70%)`,
          filter: "blur(16px)",
          opacity: position.opacity / opacity,
        }}
      />

      {/* Middle glow layer */}
      <div
        className="absolute rounded-full transition-opacity duration-300"
        style={{
          width: size * 2.5 * glowScale,
          height: size * 2.5 * glowScale,
          top: -(size * 2.5 * glowScale - size) / 2,
          left: -(size * 2.5 * glowScale - size) / 2,
          
          background: `radial-gradient(circle, hsl(44 91% 54% / ${position.opacity * 0.35}) 0%, transparent 70%)`,
          filter: "blur(8px)",
          opacity: position.opacity / opacity,
        }}
      />

      {/* Core orb with subtle highlight */}
      <div
        className="rounded-full transition-opacity duration-300"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 30% 30%,
            hsl(48 100% 78% / ${position.opacity}) 0%,
            hsl(44 91% 54% / ${position.opacity}) 40%,
            hsl(40 85% 45% / ${position.opacity * 0.9}) 100%)`,
          boxShadow: `
            0 0 ${size / 2}px hsl(44 91% 54% / ${position.opacity * 0.4}),
            0 0 ${size}px hsl(44 91% 54% / ${position.opacity * 0.25}),
            0 0 ${size * 2}px hsl(44 91% 54% / ${position.opacity * 0.1})
          `,
          opacity: position.opacity / opacity,
        }}
      />
    </div>
  );
}
