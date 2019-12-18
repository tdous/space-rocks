import { Mover } from './Mover';

export class Rock implements Mover {
  s: number[][] = [];
  r = 0;
  gen = 1; // Generation - 1 = 1st, 2 = 2nd, 3 = 3rd and last

  constructor(
    public x = 0,
    public y = 0,
    public vx = 0,
    public vy = 0,
    public va = 0,
    public radius = 1,
    gen?: number
  ) {
    if (gen) {
      this.gen = gen;
    }
  }

  getShape(): number[][] {
    if (this.s.length > 0) {
      return this.s;
    }

    const div: number = 7;
    const angle: number = (2 * Math.PI) / div;

    for (let i = 0; i < div; i++) {
      this.s.push([
        Math.sin(i * angle) * (Math.random() * 10 + this.radius - 5),
        Math.cos(i * angle) * (Math.random() * 10 + this.radius - 5)
      ]);
    }

    return this.s;
  }
}
