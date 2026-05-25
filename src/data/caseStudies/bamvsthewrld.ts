import type { WebProjectCaseStudy } from '@/types/caseStudy';
import { cloudinaryAssets } from '@/data/cloudinaryAssets';

export const bamvsthewrldCaseStudy: WebProjectCaseStudy = {
  id: 'bamvsthewrld',
  slug: 'bamvsthewrld',
  type: 'web',
  title: 'Bamvsthewrld',
  subtitle: 'A full-stack MERN platform for music artist Gavin Di Fresco — immersive 3D, Firebase auth, embedded media, and an interactive audio image map.',
  client: 'Gavin Di Fresco — Bamvsthewrld',
  industry: 'Music / Artist Platform',
  category: 'Full-Stack MERN Web Application',
  badge: 'FULL-STACK MERN BUILD',
  liveUrl: 'https://bamvsthewrld.com',
  description:
    'Full-stack MERN platform for music artist Bamvsthewrld — immersive 3D galactic experience, Firebase authentication, embedded SoundCloud + YouTube media, and an interactive audio-enabled image map. Designed, built, and deployed solo as Frontend, Backend, UI/UX, and Deployment lead.',
  featuredImage: cloudinaryAssets.bamHeroDesktop,
  hoverImage: cloudinaryAssets.bamMusicDesktop,
  heroImage: cloudinaryAssets.bamBanner,
  tags: ['React', 'MongoDB', 'Three.js', 'Firebase', 'Full-Stack MERN'],

  overview:
    "A vibrant, immersive platform designed to connect fans with Gavin Di Fresco — artistically known as Bamvsthewrld. The site unveils his talents across a spectrum of engaging media: dynamic content, embedded music, integrated video, and direct avenues for fan interaction. Packed with cinematic visual design and full-stack functionality, the site is an exclusive pass into Bamvsthewrld's universe of sound and vision.",

  goals: [
    "Build an immersive, on-brand digital home for the artist",
    "Integrate authentication, music playback, and video embeds in one cohesive experience",
    "Deliver a custom 3D galactic visual identity that sets the brand apart",
    "Ship a production-ready full-stack application solo — frontend, backend, deployment",
  ],

  deliverables: [
    { title: 'Custom React + ThreeJS frontend', description: 'Immersive cosmic-themed UI with 3D planetary model and celestial imagery' },
    { title: 'Node + Express + MongoDB backend', description: 'Scalable data layer for user sessions, comments, and content management' },
    { title: 'Firebase authentication', description: 'Google sign-in integration for secure, frictionless fan login' },
    { title: 'Embedded SoundCloud playlist', description: 'In-app music player streaming Bamvsthewrld\'s SoundCloud directly' },
    { title: 'Integrated YouTube video player', description: 'React-Player powered video releases viewable without leaving the site' },
    { title: 'Interactive audio image map', description: 'Clickable planets in the Thoughts section trigger song playback — visual storytelling meets audio' },
  ],

  process: [
    { step: 1, title: 'Discovery', description: "Aligned with Bam on the artistic vision — cosmic, immersive, fan-first — and the technical scope (full-stack MERN)" },
    { step: 2, title: 'Design system', description: 'Built the cosmic visual identity: color palette, typography, 3D planetary motifs, animated star backgrounds' },
    { step: 3, title: 'Build', description: 'Frontend in React + ThreeJS + Styled Components + Tailwind; backend in Node, Express, MongoDB; Firebase auth wired in' },
    { step: 4, title: 'Integrate + optimize', description: 'SoundCloud playlist, React-Player video, interactive image map, Cloudinary asset pipeline, responsive layouts across breakpoints' },
    { step: 5, title: 'Launch + debug', description: 'Production deployment, environment configuration, auth-flow debugging, and troubleshooting cross-service integrations' },
  ],

  results: [
    'Shipped a production full-stack MERN application end-to-end as sole developer',
    'Immersive 3D cosmic UI with custom ThreeJS planetary model and celestial backgrounds',
    'Firebase Google authentication wired in for secure fan accounts',
    'Embedded SoundCloud playlist + YouTube video player for unified media experience',
    'Interactive audio-enabled image map — clickable planets trigger song playback',
    'Live at bamvsthewrld.com',
  ],

  techStack: [
    'React.js',
    'Node.js',
    'Express',
    'MongoDB',
    'Three.js',
    'Firebase',
    'Styled Components',
    'Tailwind CSS',
    'Cloudinary',
    'React-Player',
    'React-Scroll',
  ],

  techStackPills: ['React', 'Node', 'Express', 'MongoDB', 'Three.js', 'Firebase', 'Tailwind', 'Cloudinary'],

  projectSnapshot: {
    metadata: [
      { label: 'Client', value: 'Gavin Di Fresco — Bamvsthewrld' },
      { label: 'Project Type', value: 'Full-Stack MERN Web Application' },
      { label: 'Platform', value: 'React + Node + Express + MongoDB' },
      { label: 'My Role', value: 'Sole Developer — Frontend, Backend, UI/UX, Deployment' },
    ],
    achievements: [
      'Designed, built, and deployed the full-stack MERN platform end-to-end as sole developer',
      'Architected an immersive 3D cosmic UI with a custom ThreeJS planetary model and animated star backgrounds',
      'Integrated Firebase Google authentication for secure fan accounts and sessions',
      'Embedded SoundCloud playlist + React-Player YouTube video for in-app music and video playback',
      'Built an interactive audio-enabled image map — clickable planets trigger song playback from the Thoughts section',
      'Managed environment configuration, Cloudinary asset pipeline, and production deployment debugging',
    ],
  },

  challenge: [
    "One of the biggest challenges in building Bamvsthewrld was creating a platform that combined immersive visual design with full-stack functionality while maintaining performance and responsiveness across devices. The project included dynamic animations, interactive UI elements, authentication systems, media handling, database integration, and responsive layouts — all within a single cohesive experience. Balancing creative freedom with technical stability became a major focus throughout development.",
    "Another significant challenge was deployment and infrastructure management. The application required coordinating frontend and backend environments, configuring authentication workflows, managing environment variables, handling cloud-hosted assets, and troubleshooting production issues that did not appear in development. Integrating features such as Google authentication, user sessions, comment functionality, and cloud image storage introduced additional complexity, especially while working through real-world deployment limitations and debugging across multiple services and platforms.",
  ],

  approach: [
    "I approached the project by treating it as both a technical learning experience and a production-level application. I designed the frontend using React with a strong focus on creating an engaging user experience through animation, layered visuals, and responsive layouts. At the same time, I structured the backend using Node.js, Express, and MongoDB to support scalable data management, authentication, and API functionality. I worked iteratively, simplifying and rebuilding sections when necessary to isolate issues and improve long-term maintainability.",
    "Performance and user experience were also central to my process. I optimized visual effects such as animated star backgrounds and interactive elements to reduce unnecessary rendering overhead while preserving the atmosphere of the site. I implemented responsive styling across screen sizes and continuously tested layouts to ensure consistency between desktop and mobile experiences. The project pushed me to strengthen my debugging skills, especially when working with deployment environments, authentication services, and third-party integrations.",
    "Throughout development, I handled every stage of the project independently — from UI/UX design and frontend implementation to backend architecture, deployment configuration, and troubleshooting. This experience helped me develop a deeper understanding of full-stack workflows, production problem-solving, and the importance of balancing creativity with technical execution.",
  ],

  featureShowcase: [
    {
      title: 'Vivid Galactic Experience',
      description:
        "Traverse the cosmic expanse of Bam's Wrld through stunning sections rich with a 3D planetary model and celestial imagery. As users navigate the interface, they embark on a virtual tour, immersing themselves in the artistic universe curated by Bamvsthewrld — a visually rich exploration that captures the essence of the artist's vision.",
      image: cloudinaryAssets.bamHeroDesktop,
    },
    {
      title: 'Embedded SoundCloud Playlist',
      description:
        "The app incorporates a sleek, in-built music player that streams Bamvsthewrld's SoundCloud playlist directly. Users can indulge in the artist's tracks seamlessly within the app's environment — no need to visit an external SoundCloud page.",
      image: cloudinaryAssets.bamMusicDesktop,
    },
    {
      title: 'Integrated Video Player',
      description:
        "Powered by React-Player, the app provides a window into Bamvsthewrld's visual world with the latest YouTube releases. Fans can watch new videos from the artist without ever leaving the site, ensuring an uninterrupted and engaging multimedia experience.",
      image: cloudinaryAssets.bamNewDesktop,
    },
    {
      title: 'Interactive Audio-Enabled Image Map',
      description:
        "The Thoughts section introduces an innovative way to experience the artist's music through an interactive image map. Clicking on any planet within the visual display triggers playback of a unique song, providing an immersive auditory journey through Bamvsthewrld's discography. This feature blends visual storytelling with auditory pleasure, creating a memorable exploration of the artist's work.",
      image: cloudinaryAssets.bamThoughtsDesktop,
    },
  ],

  mobileShowcase: {
    images: [
      { src: cloudinaryAssets.bamHeroPhone, label: 'Hero' },
      { src: cloudinaryAssets.bamBioPhone, label: 'Bio' },
      { src: cloudinaryAssets.bamMusicPhone, label: 'Music' },
      { src: cloudinaryAssets.bamNewPhone, label: 'Video' },
      { src: cloudinaryAssets.bamThoughtsPhone, label: 'Thoughts' },
    ],
    caption:
      "Bamvsthewrld on a phone, section by section. Every layout adapts — the 3D galactic hero, embedded SoundCloud playlist, video player, and interactive image map all carry across breakpoints without losing their cosmic identity.",
  },

  screenshots: [
    { label: 'Bio section', after: cloudinaryAssets.bamBioDesktop },
    { label: 'Music — embedded SoundCloud playlist', after: cloudinaryAssets.bamMusicDesktop },
    { label: 'Video — React-Player YouTube integration', after: cloudinaryAssets.bamNewDesktop },
    { label: 'Thoughts — interactive audio image map', after: cloudinaryAssets.bamThoughtsDesktop },
    { label: 'Style tile — brand identity and visual system', after: cloudinaryAssets.bamStyleTile },
  ],

  metrics: {},

  testimonial: {
    quoteTitle: "What it's like to work with Tisha",
    quote: `Working with Tish on Bamvsthewrld was an incredible experience. She brought creativity, technical skill, and persistence to every part of the project. From the immersive design and animations to the full-stack functionality behind the scenes, she handled every challenge with determination and attention to detail. The final result feels unique, modern, and professionally built from top to bottom.

What stood out most was her ability to combine artistic vision with real development expertise. She didn't just create a website — she built an experience. Her dedication to learning, problem-solving, and pushing the project forward through every obstacle was inspiring to watch. I would absolutely recommend her for any creative or full-stack web development project.`,
    author: 'Gavin Di Fresco',
    role: 'Artist, Bamvsthewrld',
  },
};
