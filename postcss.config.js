/**
 * @file postcss.config.js
 * @description PostCSS configuration file with performance optimizations.
 * Used by build tools (like Vite) to process CSS with plugins like Tailwind CSS and Autoprefixer.
 */

export default {
  plugins: {
    // Tailwind CSS plugin for PostCSS with optimization settings
    tailwindcss: {
      // Enable production mode optimizations
      future: {
        hoverOnlyWhenSupported: true,
      },
    },
    // Autoprefixer plugin to add vendor prefixes to CSS rules
    autoprefixer: {
      overrideBrowserslist: [
        'last 2 versions',
        'not dead',
        '> 0.5%',
      ],
    },
  },
}
