// import { AnimLoopEngine } from 'anim-loop-engine';
import { AnimLoopEngine } from '../../anim-loop-engine/lib/index';
import { Easel } from '../../easel-js/lib/index';
import { arc } from '../../easel-js/lib/draw/arc';
import { line } from '../../easel-js/lib/draw/line';
import { rect } from '../../easel-js/lib/draw/rect';
// import { Easel } from 'easel-js';

import { degreesToRadians, radiansToDegrees } from './utils/math';

import { Player } from './entities/Player';
import { Rock } from './entities/Rock';

let gameHasFocus = true;
let paused = false;

const engine = new AnimLoopEngine();
const easel = new Easel('sr', { tabIndex: 0, focus: true });
easel.config({
  fillStyle: '#FFF',
  font: '50px VT323',
  lineWidth: 2,
  strokeStyle: '#FFF',
  textAlign: 'center',
  textBaseline: 'middle'
});

const scalingBase = easel.w > easel.h ? easel.w : easel.h;
const rockRadius = scalingBase / 15;
const rockBaseVel = scalingBase / 40;

const calcRockSpawnCoord = (axis: string) => {
  if (axis === 'x') {
    return Math.random() < 0.5
      ? (easel.w / 4) * Math.random()
      : (easel.w / 4) * Math.random() + (easel.w / 3) * 2;
  } else {
    return Math.random() < 0.5
      ? (easel.h / 4) * Math.random()
      : (easel.h / 4) * Math.random() + (easel.h / 3) * 2;
  }
};

const rotateShape = (shape: number[][], angle: number) => {
  const rad = degreesToRadians(angle);
  const rShape: number[][] = [];
  for (let i = 0; i < shape.length; i++) {
    rShape[i] = [
      shape[i][0] * Math.cos(rad) - shape[i][1] * Math.sin(rad),
      shape[i][0] * Math.sin(rad) + shape[i][1] * Math.cos(rad)
    ];
  }
  return rShape;
};

// const scaleShape = (entity: Player | Rock) => {
//   const s = entity.getShape();
//   for (let i = 0; i < s.length; i++) {
//     s[i][0] *= 1;
//     s[i][1] *= 1;
//   }
//   return entity;
// };

const translateShape = (shape: number[][], matrix: number[]) => {
  const tShape: number[][] = [];
  for (let i = 0; i < shape.length; i++) {
    tShape[i] = [shape[i][0] + matrix[0], shape[i][1] + matrix[1]];
  }
  return tShape;
};

const randomNeg = () => (Math.random() < 0.5 ? 1 : -1);

// GENERATE SHIT

// Gen player
const plyr = new Player();

// Gen rocks
let aRocks: Rock[] = [];
for (let i = 0; i < 5; i++) {
  aRocks.push(
    new Rock(
      calcRockSpawnCoord('x'),
      calcRockSpawnCoord('y'),
      // -10,
      // -10,
      (Math.random() * rockBaseVel + 50) * randomNeg(),
      (Math.random() * rockBaseVel + 50) * randomNeg(),
      Math.random() * 100 * randomNeg(),
      rockRadius
    )
  );
  // console.log(...aRocks);
}

// Gen rock's screen boundaries
const genRockInner = (radius: number) => {
  return [0 + radius, easel.w - radius, easel.h - radius, 0 + radius];
};

// Draw an entity shape at calced location and rotation
const drawEntity = (entity: Rock | Player, dt: number = 0) => {
  let drawable: number[][] = [];

  // Screen wrap boundaries
  const inner = genRockInner(entity.radius);

  entity.x += parseInt((entity.vx * dt).toFixed(4));
  entity.y += parseInt((entity.vy * dt).toFixed(4));
  entity.r += entity.va * dt;

  // Don't accrue large spin angles
  if (entity.r > 360) {
    entity.r -= 360;
  } else if (entity.r < -360) {
    entity.r += 360;
  }

  // Wrap main rock at screen edges
  // x < 0
  if (entity.x < 0) {
    entity.x += easel.w;
  }
  // x > width
  else if (entity.x > easel.w) {
    entity.x -= easel.w;
  }

  // y < 0
  if (entity.y < 0) {
    entity.y += easel.h;
  }
  // y > height
  if (entity.y > easel.h) {
    entity.y -= easel.h;
  }

  // Add main rock to drawable array
  drawable.push([entity.x, entity.y]);

  // Check for boundary overlap to generate faux-rocks:
  // Top left
  if (entity.x < inner[3] && entity.y < inner[0]) {
    drawable.push(
      [entity.x, entity.y + easel.h],
      [entity.x + easel.w, entity.y],
      [entity.x + easel.w, entity.y + easel.h]
    );
  }
  // Top right
  else if (entity.x > inner[1] && entity.y < inner[0]) {
    drawable.push(
      [entity.x - easel.w, entity.y],
      [entity.x - easel.w, entity.y + easel.h],
      [entity.x, entity.y + easel.h]
    );
  }
  // Bottom right
  else if (entity.x > inner[1] && entity.y < inner[2]) {
    drawable.push(
      [entity.x - easel.w, entity.y - easel.h],
      [entity.x, entity.y - easel.h],
      [entity.x - easel.w, entity.y]
    );
  }
  // Bottom left
  else if (entity.x < inner[3] && entity.y > inner[2]) {
    drawable.push(
      [entity.x, entity.y - easel.h],
      [entity.x + easel.w, entity.y - easel.h],
      [entity.x + easel.w, entity.y]
    );
  }
  // Top
  else if (entity.y < inner[0]) {
    drawable.push([entity.x, entity.y + easel.h]);
  }
  // Right
  else if (entity.x > inner[1]) {
    drawable.push([entity.x - easel.w, entity.y]);
  }
  // Bottom
  else if (entity.y > inner[2]) {
    drawable.push([entity.x, entity.y - easel.h]);
  }
  // Left
  else if (entity.x < inner[3]) {
    drawable.push([entity.x + easel.w, entity.y]);
  }

  let j = 0;
  while (j < drawable.length) {
    line(
      easel.cx,
      translateShape(rotateShape(entity.getShape(), entity.r), drawable[j]),
      's',
      true
    );

    j++;
  }
};

// Calculate and draw new rock positions
const drawRocks = (dt: number = 0) => {
  let i = 0;
  while (i < aRocks.length) {
    let r = aRocks[i];

    r.x += parseInt((r.vx * dt).toFixed(4));
    r.y += parseInt((r.vy * dt).toFixed(4));
    r.r += r.va * dt;

    // Don't accrue large spin angles
    if (r.r > 360) {
      r.r -= 360;
    } else if (r.r < -360) {
      r.r += 360;
    }

    drawEntity(r, dt);

    i++;
  }
};

// Calculate and draw player ship
const drawPlayer = (dt: number = 0) => {
  plyr.x = plyr.x !== 0 ? plyr.x : easel.w / 2;
  plyr.y = plyr.y !== 0 ? plyr.y : easel.h / 2;

  plyr.r += plyr.va * dt;

  if (plyr.thrust || plyr.reverse) {
    plyr.tx =
      Math.sin(degreesToRadians(plyr.reverse ? plyr.r + 180 : plyr.r)) * 400;
    plyr.ty =
      -Math.cos(degreesToRadians(plyr.reverse ? plyr.r + 180 : plyr.r)) * 400;

    if (plyr.vx < plyr.tx || plyr.vx > plyr.tx) {
      plyr.vx += plyr.reverse
        ? ((plyr.tx - plyr.vx) * dt) / 2
        : (plyr.tx - plyr.vx) * dt;
    }
    if (plyr.vy < plyr.ty || plyr.vy > plyr.ty) {
      plyr.vy += plyr.reverse
        ? ((plyr.ty - plyr.vy) * dt) / 2
        : (plyr.ty - plyr.vy) * dt;
    }
  }

  plyr.x += plyr.vx * dt;
  plyr.y += plyr.vy * dt;

  drawEntity(plyr, dt);
};

// Call updates and redraws for all entities
const update = (ts: number = 0, dt: number = 0) => {
  if (paused || !gameHasFocus) {
    return;
  }

  easel.wipe();
  drawRocks(dt);
  drawPlayer(dt);

  easel.cx.fillText(
    'Space Rocks: Space Rocks!',
    easel.w / 2,
    easel.h / 2 - 100
  );
};
engine.addTask(update);

const start = () => {
  paused = false;
  console.log('START');
  engine.start();
};

const stop = () => {
  paused = true;
  console.log('STOP');
  engine.stop();
};

// 37, 38, 39, left up, right
easel.cv.onkeydown = (e: KeyboardEvent) => {
  switch (e.keyCode) {
    case 38: // Up
      plyr.thrust = true;
      break;

    case 40: // Down
      plyr.reverse = true;
      // plyr.vx *= -0.2;
      // plyr.vy *= -0.2;
      break;

    case 37: // Left
      plyr.va = -200;
      break;

    case 39: // Right
      plyr.va = 200;
      break;
  }
};
easel.cv.onkeyup = (e: KeyboardEvent) => {
  switch (e.keyCode) {
    case 38: // Up
      plyr.thrust = false;
      break;

    case 40: // Down
      plyr.reverse = false;
      break;

    case 37: // Left
    case 39: // Right
      plyr.va = 0;
      break;
  }
};

// FOCUS/BLUR
easel.cv.onblur = () => {
  gameHasFocus = false;
  console.log('BLUR');
  stop();
};

easel.cv.onfocus = () => {
  gameHasFocus = true;
  console.log('FOCUS');
  start();
};

start();
