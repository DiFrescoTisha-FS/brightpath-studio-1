# BrightPath Web Studio

Portfolio site for Tisha Di Fresco / BrightPath Web Studio LLC. React 18 + TypeScript +
Vite + Tailwind CSS + Framer Motion, deployed on Netlify with 12 statically prerendered
routes.

```bash
npm run dev      # local dev server
npm run build    # production build (set SKIP_PRERENDER=1 to skip prerender + its gate)
npm run lint
```

## Before changing anything visual

Read **`CLAUDE.md`** first. It records the approved visual system and the reasoning behind
decisions that are easy to undo by accident. Two that matter most:

- **One gold per theme.** Dark `#F2C94C`, light `#846300`, both driven by the `--primary`
  token. Don't add per-role gold shades — several were built and rejected.
- **Background artwork is meant to be visible.** The grading, feathering and scrim values
  are deliberate; don't fade them back without a design reason.

`CLAUDE.md` also covers the prerendering rules, which have several non-obvious constraints
(never `hydrateRoot`, `/app.html` is the SPA fallback, the `verifyPrerender` build gate).

Dated changelogs (`CHANGELOG-YYYY-MM-DD.md`) record what changed in each session.

---

## Vite + React tooling notes

Two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs..
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
