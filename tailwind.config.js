// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  './pages/**/*.{ts,tsx}',
	  './components/**/*.{ts,tsx}',
	  './app/**/*.{ts,tsx}',
	  './src/**/*.{ts,tsx}',
	],
	theme: {
	  container: {
		  center: true,
		  padding: '2rem',
		  screens: {
			  '2xl': '1400px'
		  }
	  },
	  extend: {
		  fontFamily: {
			  poppins: [
				  'Poppins',
				  'sans-serif'
			  ],
			  lato: [
				  'Lato',
				  'sans-serif'
			  ]
		  },
		  colors: {
			  primary: {
				  DEFAULT: 'hsl(var(--primary))',
				  foreground: 'hsl(var(--primary-foreground))'
			  },
			  secondary: {
				  DEFAULT: 'hsl(var(--secondary))',
				  foreground: 'hsl(var(--secondary-foreground))'
			  },
			  stone: '#9CA5AF',
			  white: '#FFFFFF',
			  black: '#000000',
			  'gray-300': '#E5E7EB',
			  background: 'hsl(var(--background))',
			  foreground: 'hsl(var(--foreground))',
			  'card-bg': 'var(--card-bg)',
			  'card-foreground': 'var(--card-foreground)',
			  'header-bg': 'var(--header-bg)',
			  'header-foreground': 'var(--header-foreground)',
			  'hero-heading': 'var(--hero-heading)',
			  'hero-paragraph': 'var(--hero-paragraph)',
			  'services-bg': 'var(--services-bg)',
			  'services-h2': 'var(--services-h2)',
			  'services-card-bg': 'var(--services-card-bg)',
			  'services-card-title': 'var(--services-card-title)',
			  'services-card-paragraph': 'var(--services-card-paragraph)',
			  card: {
				  DEFAULT: 'hsl(var(--card))',
				  foreground: 'hsl(var(--card-foreground))'
			  },
			  popover: {
				  DEFAULT: 'hsl(var(--popover))',
				  foreground: 'hsl(var(--popover-foreground))'
			  },
			  muted: {
				  DEFAULT: 'hsl(var(--muted))',
				  foreground: 'hsl(var(--muted-foreground))'
			  },
			  accent: {
				  DEFAULT: 'hsl(var(--accent))',
				  foreground: 'hsl(var(--accent-foreground))'
			  },
			  destructive: {
				  DEFAULT: 'hsl(var(--destructive))',
				  foreground: 'hsl(var(--destructive-foreground))'
			  },
			  border: 'hsl(var(--border))',
			  input: 'hsl(var(--input))',
			  ring: 'hsl(var(--ring))',
			  chart: {
				  '1': 'hsl(var(--chart-1))',
				  '2': 'hsl(var(--chart-2))',
				  '3': 'hsl(var(--chart-3))',
				  '4': 'hsl(var(--chart-4))',
				  '5': 'hsl(var(--chart-5))'
			  }
		  },
		  borderRadius: {
			  lg: 'var(--radius)',
			  md: 'calc(var(--radius) - 2px)',
			  sm: 'calc(var(--radius) - 4px)'
		  },
		  textShadow: {
			  'md': '0em 0em 0.1em rgba(0, 0, 0, 0.2)',
		  },
		  dropShadow: {
			  'lg': '0 4px 6px rgba(0, 0, 0, 0.25)',
		  },
		  boxShadow: {
			'glow-primary': '0 0 8px 0px rgba(242, 201, 76, 0.45)',
		  },
	  }
	},
	plugins: [require("tailwindcss-animate")],
  };