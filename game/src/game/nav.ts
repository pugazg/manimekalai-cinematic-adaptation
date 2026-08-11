// Shared navigation hooks so any scene/overlay can request routing without relying
// on Phaser scene-data being threaded through every transition. main.ts sets these.

export interface Nav {
  restart(): void;
  returnToTitle(): void;
  keepExploring(): void;
}

const noop = () => {};

export const nav: Nav = {
  restart: noop,
  returnToTitle: noop,
  keepExploring: noop,
};

export function setNav(n: Partial<Nav>): void {
  Object.assign(nav, n);
}
