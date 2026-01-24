import * as React from "react";

interface TikTokIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function TikTokIcon({
  size = 24,
  className = "",
  ...props
}: TikTokIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 3v12.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M16 3c.6 2.5 2.5 4 5 4" />
    </svg>
  );
}
