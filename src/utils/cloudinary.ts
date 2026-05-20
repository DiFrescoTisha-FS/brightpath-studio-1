/**
 * Cloudinary URL builder for BrightPath assets.
 *
 * Cloud name comes from VITE_CLOUDINARY_CLOUD_NAME in .env, falling back to
 * Tisha's personal Cloudinary account `djqw1de3s` if the env var isn't set.
 * (Robin's separate account `ddquft3sh` is used by the AweStruck site —
 * don't confuse the two.)
 *
 * BrightPath public IDs are FLAT (no folder prefix) and carry a 6-char random
 * suffix from upload (e.g. `lh-5_laoadg` rather than `lh-5`). Cloudinary's UI
 * folders are visual organization only; they're not part of the public ID.
 *
 * URLs use slash-separated transformations (not commas) to sidestep the same
 * srcset/preload parsing bug we hit on the AweStruck site — commas in the URL
 * confuse the browser's srcset parser.
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? 'djqw1de3s';

interface CloudinaryOptions {
  /** Delivery width in pixels. Cloudinary downsizes the source on the fly. */
  width?: number;
  /** Crop mode. `limit` keeps aspect ratio and never upscales — safe default. */
  crop?: 'limit' | 'fill' | 'fit' | 'scale' | 'crop' | 'thumb';
  /** Override automatic quality. `auto:good` is the default; use `auto:best` for hero images. */
  quality?: 'auto:low' | 'auto:eco' | 'auto:good' | 'auto:best' | number;
  /** Override automatic format. `auto` lets Cloudinary pick AVIF/WebP/JPEG per browser. */
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  /** Devicepixelratio. `auto` honors the visitor's screen DPR. */
  dpr?: 'auto' | number;
}

/**
 * Build a Cloudinary delivery URL for a public ID.
 *
 * Defaults give you `f_auto/q_auto:good/c_limit/dpr_auto` — modern format,
 * smart quality, no upscaling, and retina-aware. Pass `width` for responsive
 * delivery.
 *
 * Example:
 *   buildCloudinaryUrl('lh-5_laoadg', { width: 800 })
 *   // → https://res.cloudinary.com/djqw1de3s/image/upload/f_auto/q_auto:good/w_800/c_limit/dpr_auto/lh-5_laoadg
 */
export function buildCloudinaryUrl(publicId: string, options: CloudinaryOptions = {}): string {
  const {
    width,
    crop = 'limit',
    quality = 'auto:good',
    format = 'auto',
    dpr = 'auto',
  } = options;

  const transformations: string[] = [`f_${format}`, `q_${quality}`];
  if (width) transformations.push(`w_${width}`);
  transformations.push(`c_${crop}`, `dpr_${dpr}`);

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations.join('/')}/${publicId}`;
}

/**
 * Build a Cloudinary video delivery URL.
 *
 * Example:
 *   buildCloudinaryVideoUrl('awestruck-interactive-wheel_xxxxxx')
 */
export function buildCloudinaryVideoUrl(publicId: string, options: { quality?: string } = {}): string {
  const { quality = 'auto:good' } = options;
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/q_${quality}/${publicId}.mp4`;
}
