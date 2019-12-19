import { Mover } from './Mover';

export class Player implements Mover {
  s = [];
  r = 0;
  radius = 14;
  reverse = false;
  thrust = false;
  vx = 0;
  vy = 0;
  va = 0;
  tx = 0; // Target x - gives x something to aspire to
  ty = 0; // Target y - gives y something to aspire to

  constructor(public x = 0, public y = 0, public scale = 1) {}

  getShape(): number[][] {
    return !this.thrust
      ? [
          [0, -14],
          [10, 10],
          [0, 7],
          [-10, 10]
        ]
      : [
          [0, -14],
          [10, 10],
          [0, 7],

          [5, 9],
          [0, 7 + Math.random() * 10],
          [-5, 9],
          [0, 7],

          [-10, 10]
        ];
  }

  reset(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.r = 0;
    this.vx = 0;
    this.vy = 0;
    this.tx = 0;
    this.ty = 0;
    this.va = 0;
  }
}
