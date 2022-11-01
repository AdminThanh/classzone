import { RGBColor } from 'react-color';

/**
 * Convert color:
 * @param {*} r red
 * @param {*} g green
 * @param {*} b blue
 * @param {*} a alpha
 * @returns (string) A hexadecimal color.
 */
export function convertRGBAToHexA(r: any, g: any, b: any, a: any) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  a = Math.round(a * 255).toString(16);

  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;
  if (a.length == 1) a = '0' + a;

  return '#' + r + g + b + a;
}

/**
 *
 * @param {string} h hex
 * @returns (object) A rgba color in detail.
 */
export function convertHexAToRGBA(h: string): { str: string; rgb: RGBColor } {
  let r: any = 0,
    g: any = 0,
    b: any = 0,
    a: any = 1;

  if (h.length == 5) {
    r = '0x' + h[1] + h[1];
    g = '0x' + h[2] + h[2];
    b = '0x' + h[3] + h[3];
    a = '0x' + h[4] + h[4];
  } else if (h.length == 9) {
    r = '0x' + h[1] + h[2];
    g = '0x' + h[3] + h[4];
    b = '0x' + h[5] + h[6];
    a = '0x' + h[7] + h[8];
  }
  a = +(a / 255).toFixed(3);

  return {
    str: 'rgba(' + +r + ',' + +g + ',' + +b + ',' + a + ')',
    rgb: {
      r: +r,
      g: +g,
      b: +b,
      a: +a,
    },
  };
}