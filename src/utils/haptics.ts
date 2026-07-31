/**
 * Safely triggers haptic feedback on supported touch devices
 */
export function triggerHaptic(type: 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'selection' = 'light') {
  if (typeof window === 'undefined' || !('navigator' in window) || !window.navigator.vibrate) {
    return;
  }

  try {
    switch (type) {
      case 'selection':
      case 'light':
        window.navigator.vibrate(10);
        break;
      case 'medium':
        window.navigator.vibrate(25);
        break;
      case 'heavy':
        window.navigator.vibrate(45);
        break;
      case 'success':
        window.navigator.vibrate([15, 30, 25]);
        break;
      case 'error':
        window.navigator.vibrate([40, 50, 40]);
        break;
    }
  } catch (err) {
    // Ignore vibration errors on un-persisted gestures
  }
}
