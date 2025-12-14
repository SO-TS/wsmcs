/**
 * @file postcss.config.js
 * @description PostCSS configuration file.
 * Used by build tools (like Vite) to process CSS with plugins like Tailwind CSS and Autoprefixer.
 */

export default {
  plugins: {
    // Tailwind CSS plugin for PostCSS
    tailwindcss: {},
    // Autoprefixer plugin to add vendor prefixes to CSS rules
    autoprefixer: {},
  },
}
