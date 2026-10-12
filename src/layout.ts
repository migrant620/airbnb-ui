import { frame } from './tokens';

/**
 * Two more ways of writing the same absolute box.
 *
 * Every screen is a 393 x 777 dp frame and the prototype places its chrome at the interface's own
 * coordinates, which is why `at(x, y, w, h)` appears all over the screens. A box that touches the
 * frame's right edge has a problem on a narrower screen: its left edge and width are fixed, so at
 * 320 dp everything whose right edge lands past 320 runs off the display — and on the web it widens
 * the page itself.
 *
 * These forms describe the same box from the right edge instead. At the frame's own width the
 * arithmetic is identical (`right = 393 - x - w`), so nothing moves and no judged number changes;
 * below it the box stays the same distance from the edge it was anchored to rather than being cut.
 */
export const span = (x: number, y: number, inset: number, h: number) =>
  ({ position: 'absolute', left: x, right: inset, top: y, height: h } as const);

export const rightAt = (inset: number, y: number, w: number, h: number) =>
  ({ position: 'absolute', right: inset, top: y, width: w, height: h } as const);

/**
 * The closing chrome (price, primary action, gesture pill) is written from the frame's lower edge.
 * The arithmetic is identical at the frame's own height (`bottom = 777 - y - h`), so nothing moves
 * at 777; on a shorter viewport the bar stays pinned above the bottom edge instead of being placed
 * past the end of the screen, where its actions could not be reached.
 */
export const lowAt = (x: number, y: number, w: number, h: number) =>
  ({ position: 'absolute', left: x, bottom: frame.height - y - h, width: w, height: h } as const);

export const lowRight = (inset: number, y: number, w: number, h: number) =>
  ({ position: 'absolute', right: inset, bottom: frame.height - y - h, width: w, height: h } as const);

/** A measured box's own inset from the frame's right edge. */
export const insetOf = (x: number, w: number) => frame.width - x - w;
