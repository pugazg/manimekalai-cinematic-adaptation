import Phaser from 'phaser';

// All placeholder art is generated procedurally in-project — no external/scraped/AI
// images. Prototype 0.2 adds simple faces (so characters are not emotionally neutral)
// and clear interaction ICONS that replace the old anonymous circle markers.

export const PALETTE = {
  sand: 0xcda165,
  sandDark: 0xb98f52,
  stone: 0xbfae93,
  stoneDark: 0xa2917a,
  ochre: 0xc07b3c,
  ochreRoof: 0x7d4a2b,
  robe: 0x9c3b2e, // Manimekalai
  child: 0x4f8a8b, // the child
  paati: 0x7a6a86, // Paati's shawl (muted violet)
  youngMan: 0x3d6470,
  mother: 0x8a5a3b,
  carrier: 0x4a6b3a,
  helper: 0x9a8235,
  crowd: 0x6d5c48,
  skin: 0x7a5334,
  skinPaati: 0x8a6a4a,
  water: 0x4f7d96,
  waterLight: 0x8fc0d8,
  bowl: 0xd9b46a,
  bowlRim: 0xf0d79a,
  ink: 0x2a2018,
  icon: 0xf4ead2,
  iconEdge: 0x2a2018,
};

export type Expr = 'neutral' | 'concerned' | 'tired' | 'relieved' | 'attentive';

/** Draw a tiny face at (cx, cy). Expression changes eyes/mouth only. */
export function drawFace(g: Phaser.GameObjects.Graphics, cx: number, cy: number, expr: Expr, scale = 1): void {
  const eyeY = cy - 1 * scale;
  const eyeDx = 3 * scale;
  g.fillStyle(PALETTE.ink, 1);
  if (expr === 'tired') {
    // half-closed eyes
    g.fillRect(cx - eyeDx - 1.5 * scale, eyeY, 3 * scale, 1 * scale);
    g.fillRect(cx + eyeDx - 1.5 * scale, eyeY, 3 * scale, 1 * scale);
  } else {
    const r = (expr === 'attentive' ? 1.6 : 1.2) * scale;
    g.fillCircle(cx - eyeDx, eyeY, r);
    g.fillCircle(cx + eyeDx, eyeY, r);
  }
  // brows for concern
  if (expr === 'concerned') {
    g.lineStyle(1 * scale, PALETTE.ink, 1);
    g.lineBetween(cx - eyeDx - 2 * scale, eyeY - 3 * scale, cx - eyeDx + 1 * scale, eyeY - 2 * scale);
    g.lineBetween(cx + eyeDx + 2 * scale, eyeY - 3 * scale, cx + eyeDx - 1 * scale, eyeY - 2 * scale);
  }
  // mouth
  const my = cy + 4 * scale;
  g.lineStyle(1.4 * scale, PALETTE.ink, 1);
  if (expr === 'relieved') {
    g.beginPath();
    g.arc(cx, my - 1 * scale, 3 * scale, 0.15 * Math.PI, 0.85 * Math.PI, false);
    g.strokePath();
  } else if (expr === 'concerned' || expr === 'tired') {
    g.beginPath();
    g.arc(cx, my + 2 * scale, 3 * scale, 1.15 * Math.PI, 1.85 * Math.PI, false);
    g.strokePath();
  } else {
    g.lineBetween(cx - 2.5 * scale, my, cx + 2.5 * scale, my);
  }
}

function figure(
  scene: Phaser.Scene,
  key: string,
  robe: number,
  opts: { expr?: Expr; skin?: number; shawl?: boolean; small?: boolean } = {},
): void {
  const small = opts.small ?? false;
  const w = 32;
  const h = small ? 40 : 48;
  const g = scene.make.graphics({ x: 0, y: 0 }, false);
  g.fillStyle(0x000000, 0.18);
  g.fillEllipse(w / 2, h - 3, 24, 7);
  const bodyTop = small ? 22 : 18;
  g.fillStyle(robe, 1);
  g.beginPath();
  g.moveTo(10, bodyTop);
  g.lineTo(22, bodyTop);
  g.lineTo(27, h - 4);
  g.lineTo(5, h - 4);
  g.closePath();
  g.fillPath();
  g.fillStyle(0x000000, 0.12);
  g.fillRect(7, bodyTop + 10, 18, 3);
  // head
  const headY = small ? 15 : 11;
  g.fillStyle(opts.skin ?? PALETTE.skin, 1);
  g.fillCircle(w / 2, headY, 8);
  // hair or shawl
  if (opts.shawl) {
    g.fillStyle(robe, 1);
    g.fillEllipse(w / 2, headY - 3, 20, 14);
    g.fillStyle(opts.skin ?? PALETTE.skin, 1);
    g.fillCircle(w / 2, headY + 1, 7);
  } else {
    g.fillStyle(PALETTE.ink, 1);
    g.fillEllipse(w / 2, headY - 3, 17, 11);
    g.fillStyle(opts.skin ?? PALETTE.skin, 1);
    g.fillCircle(w / 2, headY + 1, 6.5);
  }
  drawFace(g, w / 2, headY + 1, opts.expr ?? 'neutral');
  g.generateTexture(key, w, h);
  g.destroy();
}

function icon(scene: Phaser.Scene, key: string, draw: (g: Phaser.GameObjects.Graphics) => void): void {
  const g = scene.make.graphics({ x: 0, y: 0 }, false);
  draw(g);
  g.generateTexture(key, 34, 34);
  g.destroy();
}

export function createTextures(scene: Phaser.Scene): void {
  const tile = (key: string, base: number, dark: number) => {
    const g = scene.make.graphics({ x: 0, y: 0 }, false);
    g.fillStyle(base, 1);
    g.fillRect(0, 0, 64, 64);
    g.fillStyle(dark, 0.3);
    for (let i = 0; i < 6; i++) g.fillRect((i * 17) % 60, (i * 29) % 58, 4, 3);
    g.lineStyle(1, dark, 0.2);
    g.strokeRect(0, 0, 64, 64);
    g.generateTexture(key, 64, 64);
    g.destroy();
  };
  tile('tile_ground', PALETTE.sand, PALETTE.sandDark);
  tile('tile_stone', PALETTE.stone, PALETTE.stoneDark);

  {
    const g = scene.make.graphics({ x: 0, y: 0 }, false);
    g.fillStyle(0x000000, 0.12);
    g.fillRect(6, 168, 120, 8);
    g.fillStyle(PALETTE.ochre, 1);
    g.fillRect(0, 40, 120, 130);
    g.fillStyle(PALETTE.ochreRoof, 1);
    g.fillRect(-6, 24, 132, 24);
    g.fillStyle(0x000000, 0.18);
    g.fillRect(18, 70, 22, 34);
    g.fillRect(78, 70, 22, 34);
    g.fillRect(48, 108, 26, 62);
    g.generateTexture('building', 126, 176);
    g.destroy();
  }

  {
    const g = scene.make.graphics({ x: 0, y: 0 }, false);
    g.fillStyle(PALETTE.water, 1);
    g.fillRect(0, 0, 64, 64);
    g.fillStyle(PALETTE.waterLight, 0.5);
    g.fillRect(6, 12, 30, 3);
    g.fillRect(24, 34, 34, 3);
    g.fillRect(10, 52, 24, 3);
    g.generateTexture('water', 64, 64);
    g.destroy();
  }

  // a well (stone ring)
  {
    const g = scene.make.graphics({ x: 0, y: 0 }, false);
    g.fillStyle(PALETTE.stoneDark, 1);
    g.fillEllipse(28, 26, 52, 30);
    g.fillStyle(PALETTE.water, 1);
    g.fillEllipse(28, 24, 34, 18);
    g.fillStyle(PALETTE.waterLight, 0.6);
    g.fillEllipse(24, 22, 12, 5);
    g.fillStyle(PALETTE.ochreRoof, 1);
    g.fillRect(6, 0, 4, 24);
    g.fillRect(46, 0, 4, 24);
    g.fillRect(2, -2, 52, 5);
    g.generateTexture('well', 56, 44);
    g.destroy();
  }

  // a food basket / serving vessels
  {
    const g = scene.make.graphics({ x: 0, y: 0 }, false);
    g.fillStyle(0x000000, 0.15);
    g.fillEllipse(24, 30, 40, 8);
    g.fillStyle(PALETTE.bowl, 1);
    g.beginPath();
    g.arc(24, 14, 18, 0, Math.PI, false);
    g.closePath();
    g.fillPath();
    g.fillStyle(PALETTE.bowlRim, 1);
    g.fillRect(4, 12, 40, 4);
    g.fillStyle(0xf7f0dd, 1);
    g.fillEllipse(24, 12, 26, 6); // rice mound
    g.generateTexture('bowl', 48, 34);
    g.destroy();
  }
  // an empty water pot (for the young man)
  {
    const g = scene.make.graphics({ x: 0, y: 0 }, false);
    g.fillStyle(PALETTE.ochreRoof, 1);
    g.fillEllipse(16, 18, 26, 22);
    g.fillStyle(0x000000, 0.35);
    g.fillEllipse(16, 8, 14, 6);
    g.generateTexture('pot', 32, 32);
    g.destroy();
  }
  // a serving mat
  {
    const g = scene.make.graphics({ x: 0, y: 0 }, false);
    g.fillStyle(PALETTE.helper, 0.9);
    g.fillRect(0, 0, 90, 46);
    g.lineStyle(2, PALETTE.ochreRoof, 0.8);
    g.strokeRect(3, 3, 84, 40);
    g.generateTexture('mat', 90, 46);
    g.destroy();
  }

  // ---- interaction ICONS (replace anonymous circles) ----
  icon(scene, 'icon_talk', (g) => {
    g.fillStyle(PALETTE.icon, 1);
    g.lineStyle(2, PALETTE.iconEdge, 1);
    g.fillRoundedRect(3, 3, 28, 20, 5);
    g.strokeRoundedRect(3, 3, 28, 20, 5);
    g.fillTriangle(10, 22, 18, 22, 10, 30);
    g.fillStyle(PALETTE.iconEdge, 1);
    g.fillCircle(11, 13, 1.6);
    g.fillCircle(17, 13, 1.6);
    g.fillCircle(23, 13, 1.6);
  });
  icon(scene, 'icon_water', (g) => {
    g.fillStyle(PALETTE.waterLight, 1);
    g.lineStyle(2, 0x2a5566, 1);
    g.beginPath();
    g.moveTo(17, 3);
    g.lineTo(27, 20);
    g.arc(17, 22, 11, 0, Math.PI, false);
    g.lineTo(7, 20);
    g.closePath();
    g.fillPath();
    g.strokePath();
  });
  icon(scene, 'icon_food', (g) => {
    g.fillStyle(PALETTE.bowl, 1);
    g.lineStyle(2, PALETTE.ochreRoof, 1);
    g.beginPath();
    g.arc(17, 14, 12, 0, Math.PI, false);
    g.closePath();
    g.fillPath();
    g.strokePath();
    g.fillStyle(0xf7f0dd, 1);
    g.fillEllipse(17, 13, 18, 5);
  });
  icon(scene, 'icon_look', (g) => {
    g.fillStyle(PALETTE.icon, 1);
    g.lineStyle(2, PALETTE.iconEdge, 1);
    g.beginPath();
    g.arc(17, 17, 12, 1.15 * Math.PI, 1.85 * Math.PI, false);
    g.arc(17, 17, 12, 0.15 * Math.PI, 0.85 * Math.PI, false);
    g.closePath();
    g.strokePath();
    g.fillStyle(PALETTE.iconEdge, 1);
    g.fillCircle(17, 17, 4);
  });
  icon(scene, 'icon_path', (g) => {
    g.lineStyle(3, PALETTE.icon, 1);
    g.fillStyle(PALETTE.icon, 1);
    // arrow
    g.lineBetween(5, 17, 24, 17);
    g.fillTriangle(24, 10, 24, 24, 32, 17);
  });

  // ---- figures with expressions ----
  figure(scene, 'mani', PALETTE.robe, { expr: 'attentive' });
  figure(scene, 'mani_concerned', PALETTE.robe, { expr: 'concerned' });
  figure(scene, 'mani_relieved', PALETTE.robe, { expr: 'relieved' });

  figure(scene, 'child', PALETTE.child, { expr: 'neutral', small: true });
  figure(scene, 'child_concerned', PALETTE.child, { expr: 'concerned', small: true });
  figure(scene, 'child_relieved', PALETTE.child, { expr: 'relieved', small: true });

  figure(scene, 'paati', PALETTE.paati, { expr: 'tired', skin: PALETTE.skinPaati, shawl: true, small: true });
  figure(scene, 'paati_relieved', PALETTE.paati, { expr: 'relieved', skin: PALETTE.skinPaati, shawl: true, small: true });

  figure(scene, 'young_man', PALETTE.youngMan, { expr: 'concerned' });
  figure(scene, 'young_man_relieved', PALETTE.youngMan, { expr: 'relieved' });
  figure(scene, 'mother', PALETTE.mother, { expr: 'concerned' });
  figure(scene, 'mother_relieved', PALETTE.mother, { expr: 'relieved' });
  figure(scene, 'carrier', PALETTE.carrier, { expr: 'neutral' });
  figure(scene, 'helper', PALETTE.helper, { expr: 'neutral' });
  figure(scene, 'crowd', PALETTE.crowd, { expr: 'neutral' });

  {
    const g = scene.make.graphics({ x: 0, y: 0 }, false);
    g.fillStyle(PALETTE.ink, 0.6);
    g.fillRect(0, 1, 3, 1);
    g.fillRect(3, 0, 2, 1);
    g.fillRect(5, 1, 3, 1);
    g.generateTexture('bird', 8, 3);
    g.destroy();
  }
}
