import type { AccessibilitySettings } from '../state/types';

// Applies accessibility settings to the document root via data-attributes and a CSS
// variable. All information in the UI also carries text/shape, never colour alone.

const SCALE_MAP: Record<AccessibilitySettings['textScale'], string> = {
  small: '0.9',
  medium: '1',
  large: '1.25',
};

export function applyAccessibility(settings: AccessibilitySettings): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--text-scale', SCALE_MAP[settings.textScale]);
  root.dataset.reduceMotion = settings.reduceMotion ? 'true' : 'false';
  root.dataset.textScale = settings.textScale;
}

export function prefersReducedMotion(): boolean {
  try {
    return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}
