export interface Mover {
  s: number[][]; // Shape vertices [[x, y], [x, y]]
  x: number; // x pos
  y: number; // y pos
  vx: number; // x velocity px/s
  vy: number; // y velocity px/s
}