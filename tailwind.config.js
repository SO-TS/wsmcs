/**
 * @file tailwind.config.js
 * @description Tailwind CSS configuration file.
 * Defines content paths, theme extensions, and plugins for the project.
 */

/** @type {import('tailwindcss').Config} */
export default {
  // Configure files to scan for Tailwind classes to generate CSS
  content: [
    "./index.html", // Main HTML file
    "./src/**/*.{vue,js,ts,jsx,tsx}", // All Vue components, JS, TS, JSX, TSX files in src
  ],
  // Define and extend Tailwind's default theme
  theme: {
    extend: {
      // Customizations or additions to Tailwind's default theme go here
    },
  },
  // Add Tailwind plugins here
  plugins: [],
}
