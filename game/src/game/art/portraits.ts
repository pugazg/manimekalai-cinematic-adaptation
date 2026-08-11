// Procedural DOM portraits for dialogue. Drawn to an offscreen canvas and returned as
// a data URL — original, provenance-safe, no image files. Gives characters visible
// expressions so the player connects with them.

export type Expr = 'neutral' | 'concerned' | 'tired' | 'relieved' | 'attentive';

interface Look {
  robe: string;
  skin: string;
  hair: string;
  shawl?: boolean;
}

const LOOKS: Record<string, Look> = {
  mani: { robe: '#9c3b2e', skin: '#7a5334', hair: '#2a2018' },
  child: { robe: '#4f8a8b', skin: '#7a5334', hair: '#2a2018' },
  paati: { robe: '#7a6a86', skin: '#8a6a4a', hair: '#cfc6d6', shawl: true },
  youngMan: { robe: '#3d6470', skin: '#6b4a30', hair: '#2a2018' },
  mother: { robe: '#8a5a3b', skin: '#7a5334', hair: '#2a2018' },
  carrier: { robe: '#4a6b3a', skin: '#6b4a30', hair: '#2a2018' },
  helper: { robe: '#9a8235', skin: '#7a5334', hair: '#2a2018' },
};

const cache = new Map<string, string>();

export function portrait(character: string, expr: Expr = 'neutral'): string {
  const key = `${character}:${expr}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const look = LOOKS[character] ?? LOOKS.mani;
  const S = 96;
  const c = document.createElement('canvas');
  c.width = S;
  c.height = S;
  const g = c.getContext('2d')!;

  // background disc
  g.fillStyle = '#1c1610';
  g.beginPath();
  g.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2);
  g.fill();

  // shoulders / robe
  g.fillStyle = look.robe;
  g.beginPath();
  g.moveTo(14, S);
  g.quadraticCurveTo(S / 2, 60, S - 14, S);
  g.fill();

  // neck + head
  g.fillStyle = look.skin;
  g.fillRect(S / 2 - 8, 52, 16, 16);
  g.beginPath();
  g.arc(S / 2, 44, 22, 0, Math.PI * 2);
  g.fill();

  // hair / shawl
  g.fillStyle = look.hair;
  if (look.shawl) {
    g.beginPath();
    g.arc(S / 2, 40, 26, Math.PI, 0);
    g.lineTo(S / 2 + 26, 64);
    g.quadraticCurveTo(S / 2, 52, S / 2 - 26, 64);
    g.fill();
    g.fillStyle = look.skin;
    g.beginPath();
    g.arc(S / 2, 46, 18, 0, Math.PI * 2);
    g.fill();
  } else {
    g.beginPath();
    g.arc(S / 2, 38, 23, Math.PI, 0);
    g.fill();
    g.fillStyle = look.skin;
    g.beginPath();
    g.arc(S / 2, 46, 19, 0, Math.PI * 2);
    g.fill();
  }

  // face
  const cx = S / 2;
  const eyeY = 44;
  g.fillStyle = '#2a2018';
  g.strokeStyle = '#2a2018';
  g.lineWidth = 2;
  if (expr === 'tired') {
    g.beginPath();
    g.moveTo(cx - 12, eyeY); g.lineTo(cx - 4, eyeY);
    g.moveTo(cx + 4, eyeY); g.lineTo(cx + 12, eyeY);
    g.stroke();
  } else {
    const r = expr === 'attentive' ? 3 : 2.4;
    g.beginPath(); g.arc(cx - 8, eyeY, r, 0, Math.PI * 2); g.fill();
    g.beginPath(); g.arc(cx + 8, eyeY, r, 0, Math.PI * 2); g.fill();
  }
  if (expr === 'concerned') {
    g.beginPath();
    g.moveTo(cx - 13, eyeY - 8); g.lineTo(cx - 4, eyeY - 5);
    g.moveTo(cx + 13, eyeY - 8); g.lineTo(cx + 4, eyeY - 5);
    g.stroke();
  }
  // mouth
  const my = 58;
  g.beginPath();
  if (expr === 'relieved') g.arc(cx, my - 2, 7, 0.15 * Math.PI, 0.85 * Math.PI, false);
  else if (expr === 'concerned' || expr === 'tired') g.arc(cx, my + 5, 7, 1.15 * Math.PI, 1.85 * Math.PI, false);
  else { g.moveTo(cx - 6, my); g.lineTo(cx + 6, my); }
  g.stroke();

  const url = c.toDataURL('image/png');
  cache.set(key, url);
  return url;
}
