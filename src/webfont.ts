import * as React from 'react';
import { Platform } from 'react-native';

/**
 * Give the substitute face a real weight axis on web.
 *
 * The web build receives its fonts from expo-font, which declares one @font-face per file with no
 * font-weight descriptor. A descriptor-less face counts as `normal` (400), so every `fontWeight:
 * '600'` / `'700'` in tokens.ts was being resolved by the browser's own *synthetic* bold — the
 * strokes smeared about 30% wider than a real SemiBold/Bold instance. That reads plainly heavier
 * than the design's own type: every 600/700 run painted far darker than the design shows, while
 * the 400-weight runs sat where the design sits.
 *
 * PlusJakartaSans-VF.ttf is a variable font carrying the whole 200-800 wght axis, so the fix is to
 * re-declare that same file with the axis' range: the browser then instances real weights. The src
 * is read back off expo-font's own rule, so whatever hashed asset URL the build produced is reused.
 * Only the descriptor is added — no second file is shipped and nothing else about the loading is
 * changed.
 */
export function useVariableWeightFont() {
  React.useEffect(() => {
    if (Platform.OS !== 'web') return undefined;
    let patched = false;
    const patch = () => {
      if (patched) return;
      const sheets = Array.from(document.styleSheets);
      for (const sheet of sheets) {
        let rules: CSSRuleList | null = null;
        try {
          rules = sheet.cssRules;
        } catch {
          continue; // a cross-origin sheet cannot be read; the build's own sheet is same-origin
        }
        for (const rule of Array.from(rules ?? [])) {
          const face = rule as CSSFontFaceRule;
          const style = face.style as CSSStyleDeclaration | undefined;
          if (!style || typeof style.getPropertyValue !== 'function') continue;
          const family = style.getPropertyValue('font-family').replace(/['"]/g, '');
          const src = style.getPropertyValue('src');
          if (family !== 'PJS' || !src) continue;
          const el = document.createElement('style');
          el.dataset.weightAxis = 'PJS';
          el.textContent =
            `@font-face{font-family:'PJS';src:${src};font-weight:100 900;font-style:normal;font-display:swap;}`;
          document.head.appendChild(el);
          patched = true;
          return;
        }
      }
    };
    patch();
    // expo-font appends its rule asynchronously, so keep looking until it shows up.
    const timer = window.setInterval(() => {
      patch();
      if (patched) window.clearInterval(timer);
    }, 50);
    window.setTimeout(() => window.clearInterval(timer), 5000);
    return () => window.clearInterval(timer);
  }, []);
}
