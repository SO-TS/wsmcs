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
      fontFamily: {
        // Primary font family - MiSans with Maple Mono fallback
        sans: [
          '"MiSans"',
          '"Maple Mono NF"',
          '"Maple Mono"',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"'
        ],
        // Monospace font - Maple Mono with MiSans fallback
        mono: [
          '"Maple Mono NF"',
          '"Maple Mono"',
          '"MiSans"',
          'ui-monospace',
          'SFMono-Regular',
          '"SF Mono"',
          'Menlo',
          'Consolas',
          '"Liberation Mono"',
          'Courier',
          'monospace'
        ],
      },
      // Configure font weights - support bold (700)
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700', // Use bold weight
        extrabold: '800',
        black: '900',
      },
    },
  },
  // Add Tailwind plugins here
  plugins: [],
}
