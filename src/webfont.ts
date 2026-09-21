import * as React from 'react';
import { Platform } from 'react-native';
export function useVariableWeightFont() {
    React.useEffect(() => {
        if (Platform.OS !== 'web')
            return undefined;
        let patched = false;
        const patch = () => {
            if (patched)
                return;
            const sheets = Array.from(document.styleSheets);
            for (const sheet of sheets) {
                let rules: CSSRuleList | null = null;
                try {
                    rules = sheet.cssRules;
                }
                catch {
                    continue;
                }
                for (const rule of Array.from(rules ?? [])) {
                    const face = rule as CSSFontFaceRule;
                    const style = face.style as CSSStyleDeclaration | undefined;
                    if (!style || typeof style.getPropertyValue !== 'function')
                        continue;
                    const family = style.getPropertyValue('font-family').replace(/['"]/g, '');
                    const src = style.getPropertyValue('src');
                    if (family !== 'PJS' || !src)
                        continue;
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
        const timer = window.setInterval(() => {
            patch();
            if (patched)
                window.clearInterval(timer);
        }, 50);
        window.setTimeout(() => window.clearInterval(timer), 5000);
        return () => window.clearInterval(timer);
    }, []);
}
