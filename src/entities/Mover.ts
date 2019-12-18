export interface Mover {
  s: number[][];
  x: number;
  y: number;
  r: number; // Current angle of rotation
  vx: number;
  vy: number;
  va: number; // Spin angular velocity
}