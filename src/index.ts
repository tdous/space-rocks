import { AnimLoopEngine } from 'anim-loop-engine';
// import { AnimLoopEngine } from '../../anim-loop-engine/lib/index';
// import { Easel } from '../../easel-js/lib/index';
// import { arc } from '../../easel-js/lib/draw/arc';
// import { line } from '../../easel-js/lib/draw/line';
// import { rect } from '../../easel-js/lib/draw/rect';
import { Easel } from 'easel-js';
import { arc } from 'easel-js/lib/draw/arc';
import { line } from 'easel-js/lib/draw/line';
import { rect } from 'easel-js/lib/draw/rect';

import { degreesToRadians, radiansToDegrees } from './utils/math';

import { Bullet } from './entities/Bullet';
import { Player } from './entities/Player';
import { Rock } from './entities/Rock';

let initNumRocks = 4;
let gameHasFocus = true;
let paused = false;
let fired = false;

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
const rockBaseVel = scalingBase / 15;

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
let aBullets: Bullet[] = [];

// Gen player
const player = new Player();

// Gen rocks
let aRocks: Rock[] = [];
for (let i = 0; i < 4; i++) {
  let vx = (Math.random() * rockBaseVel + 15) * randomNeg();
  let vy = (Math.random() * rockBaseVel + 15) * randomNeg();
  aRocks.push(
    new Rock(
      calcRockSpawnCoord('x'),
      calcRockSpawnCoord('y'),
      vx,
      vy,
      Math.random() * 100 * randomNeg(),
      rockRadius
    )
  );
}

// Gen rock's screen boundaries
const genRockInner = (radius: number) => {
  return [0 + radius, easel.w - radius, easel.h - radius, 0 + radius];
};

// Draw an entity shape at calced location and rotation
const drawEntity = (entity: Rock | Player, dt: number = 0, fill?: boolean) => {
  let drawable: number[][] = [];

  // Screen wrap boundaries
  const inner = genRockInner(entity.radius);

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
      fill ? 'fs' : 's',
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

    r.x += r.vx * dt;
    r.y += r.vy * dt;
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
  player.x = player.x !== 0 ? player.x : easel.w / 2;
  player.y = player.y !== 0 ? player.y : easel.h / 2;

  player.r += player.va * dt;

  if (player.thrust || player.reverse) {
    player.tx =
      Math.sin(degreesToRadians(player.reverse ? player.r + 180 : player.r)) *
      400;
    player.ty =
      -Math.cos(degreesToRadians(player.reverse ? player.r + 180 : player.r)) *
      400;

    if (player.vx < player.tx || player.vx > player.tx) {
      player.vx += player.reverse
        ? (player.tx / 2 - player.vx) * dt
        : (player.tx - player.vx) * dt;
    }
    if (player.vy < player.ty || player.vy > player.ty) {
      player.vy += player.reverse
        ? (player.ty / 2 - player.vy) * dt
        : (player.ty - player.vy) * dt;
    }
  }

  player.x += player.vx * dt;
  player.y += player.vy * dt;

  drawEntity(player, dt);
};

// Fire a bullet
const fireBullet = () => {
  let rad = degreesToRadians(player.r);
  aBullets.push(
    new Bullet(
      player.x + Math.sin(rad) * 14,
      player.y + -Math.cos(rad) * 14,
      player.vx + Math.sin(rad) * 350,
      player.vy + -Math.cos(rad) * 350
    )
  );
};

// Draw bullets
const drawBullets = (dt: number) => {
  let i = 0;
  while (i < aBullets.length) {
    let b = aBullets[i];

    b.x += b.vx * dt;
    b.y += b.vy * dt;

    arc(easel.cx, b.x, b.y, 2, 0, 2 * Math.PI, 'f');

    if (b.x < 0 || b.x > easel.w || b.y < 0 || b.y > easel.h) {
      delete aBullets[i];
      aBullets = aBullets.filter(b => typeof b !== 'undefined');
    }

    i++;
  }
};

// Check for player

// Call updates and redraws for all entities
const update = (ts: number = 0, dt: number = 0) => {
  if (paused || !gameHasFocus) {
    return;
  }

  easel.wipe();
  drawRocks(dt);
  drawPlayer(dt);
  drawBullets(dt);
  // checkPlayerCollisions();

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
      player.thrust = true;
      break;

    case 40: // Down
      player.reverse = true;
      // player.vx *= -0.2;
      // player.vy *= -0.2;
      break;

    case 37: // Left
      player.va = -300;
      break;

    case 39: // Right
      player.va = 300;
      break;

    case 32: // Space (fire)
      if (!fired) {
        fired = true;
        fireBullet();
      }
      break;
  }
};
easel.cv.onkeyup = (e: KeyboardEvent) => {
  switch (e.keyCode) {
    case 38: // Up
      player.thrust = false;
      break;

    case 40: // Down
      player.reverse = false;
      break;

    case 37: // Left
    case 39: // Right
      player.va = 0;
      break;

    case 32: // Space (stop firing)
      fired = false;
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
