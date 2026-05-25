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
  angelCityHomepage: 'brightpath/portfolio/case-studies/acm/main_pages1_sxuvkv',
  daleTiffanyLong: 'brightpath/home-page/DT-LONG_qixl3l',
  bamvsthewrldScroll: 'brightpath/home-page/scroll-img-3_e0g8uh',
  bamBanner: 'brightpath/portfolio/case-studies/bamvsthewrld/bam-banner_lpywul',
  bamHeroDesktop: 'brightpath/portfolio/case-studies/bamvsthewrld/bam-hero-desktop_hqqx5p',
  bamHeroPhone: 'brightpath/portfolio/case-studies/bamvsthewrld/bam-hero-phone_agshzq',
  bamBioDesktop: 'brightpath/portfolio/case-studies/bamvsthewrld/bam-bio-desktop_aljd96',
  bamBioPhone: 'brightpath/portfolio/case-studies/bamvsthewrld/bam-bio-r-phone_fcqdmu',
  bamMusicDesktop: 'brightpath/portfolio/case-studies/bamvsthewrld/bam-music-desktop_uc9rpe',
  bamMusicPhone: 'brightpath/portfolio/case-studies/bamvsthewrld/bam-music-phone_mp2kl7',
  bamNewDesktop: 'brightpath/portfolio/case-studies/bamvsthewrld/bam-new-desktop_n9xepk',
  bamNewPhone: 'brightpath/portfolio/case-studies/bamvsthewrld/bam-new-phone_ygjx2f',
  bamThoughtsDesktop: 'brightpath/portfolio/case-studies/bamvsthewrld/bam-thoughts-desktop_aidewd',
  bamThoughtsPhone: 'brightpath/portfolio/case-studies/bamvsthewrld/bam-thoughts-phone_q9lfab',
  bamStyleTile: 'brightpath/portfolio/case-studies/bamvsthewrld/style-tile_sco1kh',
  lighthouseGift: 'brightpath/home-page/lighthouse-gift_t93s4t',
  awestruckCardHero: 'brightpath/portfolio/case-studies/awestruck/card-hero_mocn2q',
  homepageServicesBgDark: 'brightpath/background-images/39D0F6A1-1E44-47D3-AF62-76DA60A068D2_vrt9t4',
  homepageServicesBgLight: 'brightpath/background-images/09733844-51EB-4FED-9D45-96D27F6B5721_h0pgqv',
  homepageServicesBgDarkMobile: 'brightpath/background-images/775767A6-F757-46B8-BEDB-07E2CAFAE02A_tzca8a.png',
  homepageServicesBgLightMobile: 'brightpath/background-images/DD66B962-520A-4DB7-B601-AF7B05C10EA4_x49gkb',
  homepageTestimonialsBgDark: 'brightpath/background-images/A8DC3DBB-E83E-4F6D-8BE0-EB82145DF29A_cyrlwi',
  homepageTestimonialsBgLight: 'brightpath/background-images/773F3E3F-CEF6-4DA0-BB15-AC025AEAA336_qhyuw3',
  homepageTestimonialsBgDarkMobile: 'brightpath/background-images/786F78DB-EC9D-478E-9F21-52905E7BEB81_rsel8f',
  homepageTestimonialsBgLightMobile: 'brightpath/background-images/E163A136-43C0-4F7A-A3BC-D9F60A029A6E_nonghd',
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

  // Bamvsthewrld music-artist site — full-page scroll capture, same
  // hover-scroll-reveal treatment as Dale Tiffany.
  bamvsthewrldScrollFull: buildCloudinaryUrl(ID.bamvsthewrldScroll),

  // Bamvsthewrld case study assets.
  // Banner: landscape hero for the case study page header and og:image.
  // Desktop screenshots: 1200w for gallery + feature cards (~600 displayed).
  // Phone screenshots: 600w for the mobile-first phone-frame grid (~200 displayed at 3x DPR).
  bamBanner: buildCloudinaryUrl(ID.bamBanner, { width: 1600 }),
  bamHeroDesktop: buildCloudinaryUrl(ID.bamHeroDesktop, { width: 1200 }),
  bamHeroPhone: buildCloudinaryUrl(ID.bamHeroPhone, { width: 600 }),
  bamBioDesktop: buildCloudinaryUrl(ID.bamBioDesktop, { width: 1200 }),
  bamBioPhone: buildCloudinaryUrl(ID.bamBioPhone, { width: 600 }),
  bamMusicDesktop: buildCloudinaryUrl(ID.bamMusicDesktop, { width: 1200 }),
  bamMusicPhone: buildCloudinaryUrl(ID.bamMusicPhone, { width: 600 }),
  bamNewDesktop: buildCloudinaryUrl(ID.bamNewDesktop, { width: 1200 }),
  bamNewPhone: buildCloudinaryUrl(ID.bamNewPhone, { width: 600 }),
  bamThoughtsDesktop: buildCloudinaryUrl(ID.bamThoughtsDesktop, { width: 1200 }),
  bamThoughtsPhone: buildCloudinaryUrl(ID.bamThoughtsPhone, { width: 600 }),
  bamStyleTile: buildCloudinaryUrl(ID.bamStyleTile, { width: 1200 }),

  // AweStruck card-hero (the 1080×3645 phone-scroll image). Two variants:
  // - Full size for the homepage portfolio scroll-on-hover animation.
  // - Width 760 for the AweStruck card thumbnail in the portfolio grid.
  awestruckCardHeroFull: buildCloudinaryUrl(ID.awestruckCardHero),
  awestruckCardHeroThumb: buildCloudinaryUrl(ID.awestruckCardHero, { width: 760 }),

  // Full-width motif backgrounds for the homepage ServicesSection.
  // Width 1920 covers the largest typical viewport; Cloudinary auto-quality
  // keeps bytes low and dpr_auto handles retina displays.
  homepageServicesBgDark: buildCloudinaryUrl(ID.homepageServicesBgDark, { width: 1920 }),
  homepageServicesBgLight: buildCloudinaryUrl(ID.homepageServicesBgLight, { width: 1920 }),

  // Mobile-portrait variants for the homepage Services section. Width 1200
  // covers 3x DPR on most phones (~414 css px * 3 = 1242). Used below the
  // `md` breakpoint where the wide desktop image would crop badly.
  homepageServicesBgDarkMobile: buildCloudinaryUrl(ID.homepageServicesBgDarkMobile, { width: 1200 }),
  homepageServicesBgLightMobile: buildCloudinaryUrl(ID.homepageServicesBgLightMobile, { width: 1200 }),

  // Backgrounds for the homepage Client Testimonials section.
  homepageTestimonialsBgDark: buildCloudinaryUrl(ID.homepageTestimonialsBgDark, { width: 1920 }),
  homepageTestimonialsBgLight: buildCloudinaryUrl(ID.homepageTestimonialsBgLight, { width: 1920 }),

  // Mobile-portrait variants for the homepage Testimonials section.
  homepageTestimonialsBgDarkMobile: buildCloudinaryUrl(ID.homepageTestimonialsBgDarkMobile, { width: 1200 }),
  homepageTestimonialsBgLightMobile: buildCloudinaryUrl(ID.homepageTestimonialsBgLightMobile, { width: 1200 }),
};
