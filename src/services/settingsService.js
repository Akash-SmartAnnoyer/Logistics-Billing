const SETTINGS_KEYS = {
  NAVIGATION_MODE: 'navigation_mode',
};

const NAVIGATION_MODES = {
  BOTH: 'both',
  SIDEBAR_ONLY: 'sidebar_only',
  HEADER_ONLY: 'header_only',
};

export const settingsService = {
  // Get navigation mode preference
  getNavigationMode() {
    const saved = localStorage.getItem(SETTINGS_KEYS.NAVIGATION_MODE);
    return saved || NAVIGATION_MODES.BOTH; // Default to both
  },

  // Set navigation mode preference
  setNavigationMode(mode) {
    if (Object.values(NAVIGATION_MODES).includes(mode)) {
      localStorage.setItem(SETTINGS_KEYS.NAVIGATION_MODE, mode);
      return { success: true };
    }
    return { success: false, error: 'Invalid navigation mode' };
  },

  // Check if sidebar should be visible
  shouldShowSidebar() {
    const mode = this.getNavigationMode();
    return mode === NAVIGATION_MODES.BOTH || mode === NAVIGATION_MODES.SIDEBAR_ONLY;
  },

  // Check if header navigation should be visible
  shouldShowHeaderNav() {
    const mode = this.getNavigationMode();
    return mode === NAVIGATION_MODES.BOTH || mode === NAVIGATION_MODES.HEADER_ONLY;
  },

  // Get all navigation modes for settings UI
  getNavigationModes() {
    return NAVIGATION_MODES;
  },
};
