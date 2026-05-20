import { buildCloudinaryUrl } from '@/utils/cloudinary';

/**
 * Single source of truth for Cloudinary public IDs used in BrightPath.
 * Cloudinary auto-appends a 6-char random suffix on upload, so we can't
 * derive IDs from filenames — they live here and are imported wherever
 * an asset is referenced.
 *
 * Adding a new asset:
 *   1. Upload it to Cloudinary (drag-drop in Media Library)
 *   2. Open it, copy the Public ID (e.g. `my-image_xxxxxx`)
 *   3. Add to the ID map and export a pre-built URL below
 */
// Public IDs include the folder path because the djqw1de3s cloud uses
// Cloudinary's Dynamic Folders mode — folder structure is part of the
// public ID, not just visual organization. The display name in the
// Media Library list is NOT the public ID. Get the real public ID by
// right-clicking an asset → "Copy URL" and reading what comes after
// `/image/upload/v{timestamp}/`.
const ID = {
  lighthouseGraphic: 'brightpath/home-page/lh-5_laoadg',
  angelCityHomepage: 'brightpath/portfolio/case-studies/acm/ACM_HOME_1_a2t424',
  daleTiffanyLong: 'brightpath/home-page/DT-LONG_qixl3l',
  lighthouseGift: 'brightpath/home-page/lighthouse-gift_t93s4t',
  awestruckCardHero: 'brightpath/portfolio/case-studies/awestruck/card-hero_mocn2q',
} as const;

/**
 * Pre-built Cloudinary delivery URLs with per-use-case widths baked in.
 * Cloudinary applies f_auto/q_auto/c_limit/dpr_auto regardless — these
 * variants only differ in their requested width.
 */
export const cloudinaryAssets = {
  // Lighthouse photo in BrandStorySection on the homepage (displays ~376×210).
  // Width 800 gives a crisp retina-ready image at 2x the displayed size.
  lighthouseGraphic: buildCloudinaryUrl(ID.lighthouseGraphic, { width: 800 }),

  // Lighthouse gift icon — small inline use in InspiredSection, Footer,
  // and AboutPage. Displays around 98×74; width 200 is plenty for retina.
  lighthouseGift: buildCloudinaryUrl(ID.lighthouseGift, { width: 200 }),

  // Angel City homepage screenshot — used in portfolio cards on the homepage
  // and inside the Angel City case study. Image is landscape (1905×961),
  // displayed at 760 wide.
  angelCityHomepage: buildCloudinaryUrl(ID.angelCityHomepage, { width: 760 }),

  // Dale Tiffany long-format image. Preserved at FULL size because the
  // homepage PortfolioSection animates a scroll-up reveal on hover and
  // needs the original tall dimensions. Cloudinary still serves it as
  // AVIF/WebP with auto-quality, so it's much smaller than the original
  // PNG even at full resolution.
  daleTiffanyLongFull: buildCloudinaryUrl(ID.daleTiffanyLong),

  // AweStruck card-hero (the 1080×3645 phone-scroll image). Two variants:
  // - Full size for the homepage portfolio scroll-on-hover animation.
  // - Width 760 for the AweStruck card thumbnail in the portfolio grid.
  awestruckCardHeroFull: buildCloudinaryUrl(ID.awestruckCardHero),
  awestruckCardHeroThumb: buildCloudinaryUrl(ID.awestruckCardHero, { width: 760 }),
};
