/**
 * @file v-edge-glow.js
 * @description Vue custom directive for applying an interactive edge glow effect to elements.
 * The glow effect follows the mouse cursor and adapts to the current theme.
 */

export default {
  /**
   * Called when the directive is bound to the element.
   * @param {HTMLElement} el - The element the directive is bound to.
   */
  mounted(el) {
    // Initialize glow opacity as hidden
    el.style.setProperty('--glow-opacity', '0');

    /**
     * Handles the mousemove event to update the glow position and visibility.
     * @param {MouseEvent} event - The mousemove event object.
     */
    const handleMouseMove = (event) => {
      const rect = el.getBoundingClientRect();
      // Calculate mouse position relative to the element's top-left corner
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // The --mouse-x and --mouse-y should directly reflect the mouse position
      // relative to the element. The ::before's CSS positioning will handle the offset.
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
      el.style.setProperty('--glow-opacity', '1'); // Make the glow visible
    };

    /**
     * Handles the mouseleave event to fade out the glow.
     */
    const handleMouseLeave = () => {
      el.style.setProperty('--glow-opacity', '0'); // Fade out the glow via CSS transition
    };

    // Attach event listeners
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    // Store handlers on the element for cleanup
    el._handleMouseMove = handleMouseMove;
    el._handleMouseLeave = handleMouseLeave;
  },

  /**
   * Called when the directive is unbound from the element.
   * @param {HTMLElement} el - The element the directive is bound to.
   */
  beforeUnmount(el) {
    // Remove event listeners to prevent memory leaks
    if (el._handleMouseMove) {
      el.removeEventListener('mousemove', el._handleMouseMove);
    }
    if (el._handleMouseLeave) {
      el.removeEventListener('mouseleave', el._handleMouseLeave);
    }
  },
};
