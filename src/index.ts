import { AnimLoopEngine } from 'anim-loop-engine';
// import { Easel } from 'easel-js';
// import { arc } from 'easel-js/lib/draw/arc';
// import { line } from 'easel-js/lib/draw/line';
import { Easel } from '../../easel-js/lib/index';
import { arc } from '../../easel-js/lib/draw/arc';
import { line } from '../../easel-js/lib/draw/line';

import { degreesToRadians, radiansToDegrees } from './utils/math';

import { Bullet } from './entities/Bullet';
import { Player } from './entities/Player';
import { Rock } from './entities/Rock';
import { Splodicle } from './entities/Splodicle';

let controls = {
  thrust: { key: 'Up', code: 38 },
  reverse: { key: 'Down', code: 40 },
  left: { key: 'Left', code: 37 },
  right: { key: 'Right', code: 39 },
  fire: { key: 'Space', code: 32 }
};
let fired = false;
let gameHasFocus = true;
let initNumRocks = 2;
let level = 1;
let lives = 3;
let mode = 'menu'; // 'menu' | 'config' | 'game' | 'end'
let paused = false;
let score = 0;
let sploded = false;

// Arrays of shit
let aBullets: Bullet[] = [];
let aRocks: Rock[] = [];
let aSplodicles: Splodicle[] = [];
let collisionRocks: number[][] = [];
let collisionPlayers: number[][] = [];

const engine = new AnimLoopEngine();
const esl = new Easel('sr', { tabIndex: 0, focus: true });
esl.config({
  fillStyle: '#FFF',
  lineWidth: 2,
  strokeStyle: '#FFF',
  textBaseline: 'middle'
});

const scalingBase = esl.w > esl.h ? esl.w : esl.h;
const rockRadius = scalingBase / 45;
const rockBaseVel = scalingBase / 15;

const calcRockSpawnCoord = (axis: string) => {
  if (axis === 'x') {
    return Math.random() < 0.5
      ? (esl.w / 4) * Math.random()
      : (esl.w / 4) * Math.random() + (esl.w / 3) * 2;
  } else {
    return Math.random() < 0.5
      ? (esl.h / 4) * Math.random()
      : (esl.h / 4) * Math.random() + (esl.h / 3) * 2;
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

const wrapAtEdges = (entity: Rock | Player | Splodicle) => {
  // Wrap main rock at screen edges
  // x < 0
  if (entity.x < 0) {
    entity.x += esl.w;
  }
  // x > width
  else if (entity.x > esl.w) {
    entity.x -= esl.w;
  }

  // y < 0
  if (entity.y < 0) {
    entity.y += esl.h;
  }
  // y > height
  if (entity.y > esl.h) {
    entity.y -= esl.h;
  }
};

const randomNeg = () => (Math.random() < 0.5 ? 1 : -1);

// --- Generate entities, and other lovely things

// Gen player
const player = new Player();

// Generate rocks
const genRocks = (num: number = initNumRocks) => {
  // Gen rocks
  for (let i = 0; i < num; i++) {
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
};
const clearRocks = () => {
  aRocks = [];
};

// Gen rock's screen boundaries
const genRockInner = (radius: number) => {
  return [0 + radius, esl.w - radius, esl.h - radius, 0 + radius];
};

// Generate player explosion
const genSplosion = () => {
  let i = 0;
  while (i < 20) {
    aSplodicles.push(
      new Splodicle(
        player.x + Math.random() * 10 * randomNeg(),
        player.y + Math.random() * 10 * randomNeg(),
        player.vx / 2 + Math.random() * 50 * randomNeg(),
        player.vy / 2 + Math.random() * 50 * randomNeg(),
        Math.random() * 2.5 + 0.5
      )
    );
    i++;
  }

  // Start timer to reset after explosion
  setTimeout(() => {
    aSplodicles = [];
    sploded = false;
    player.reset(esl.w / 2, esl.h / 2);
  }, 3000);
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

// Kill a rock
const killRock = (i: number) => {
  if (aRocks[i].gen > 1) {
    let j = 0;
    while (j < 2) {
      aRocks.push(
        new Rock(
          aRocks[i].x + ((Math.random() * aRocks[i].radius) / 2) * randomNeg(),
          aRocks[i].y + ((Math.random() * aRocks[i].radius) / 2) * randomNeg(),
          aRocks[i].vx + Math.random() * rockBaseVel * randomNeg(),
          aRocks[i].vy + Math.random() * rockBaseVel * randomNeg(),
          Math.random() * 100 * randomNeg(),
          rockRadius,
          aRocks[i].gen - 1
        )
      );
      j++;
    }
  }

  delete aRocks[i];
  aRocks = aRocks.filter(b => typeof b !== 'undefined');
};

// --- Draw things ---

// Draw an entity shape at calced location and rotation
const drawEntity = (
  index: number,
  entity: Rock | Player,
  colliders: number[][]
) => {
  let drawable = [];

  // Screen wrap boundaries
  const inner = genRockInner(entity.radius);

  // Don't accrue large spin angles
  if (entity.r > 360) {
    entity.r -= 360;
  } else if (entity.r < -360) {
    entity.r += 360;
  }

  // Wrap entity at screen edges
  wrapAtEdges(entity);

  // Add main rock to drawable array
  drawable.push([entity.x, entity.y, entity.radius]);

  // Check for boundary overlap to generate faux-rocks:
  // Top left
  if (entity.x < inner[3] && entity.y < inner[0]) {
    drawable.push(
      [entity.x, entity.y + esl.h, entity.radius],
      [entity.x + esl.w, entity.y, entity.radius],
      [entity.x + esl.w, entity.y + esl.h, entity.radius]
    );
  }
  // Top right
  else if (entity.x > inner[1] && entity.y < inner[0]) {
    drawable.push(
      [entity.x - esl.w, entity.y, entity.radius],
      [entity.x - esl.w, entity.y + esl.h, entity.radius],
      [entity.x, entity.y + esl.h, entity.radius]
    );
  }
  // Bottom right
  else if (entity.x > inner[1] && entity.y > inner[2]) {
    drawable.push(
      [entity.x - esl.w, entity.y - esl.h, entity.radius],
      [entity.x, entity.y - esl.h, entity.radius],
      [entity.x - esl.w, entity.y, entity.radius]
    );
  }
  // Bottom left
  else if (entity.x < inner[3] && entity.y > inner[2]) {
    drawable.push(
      [entity.x, entity.y - esl.h, entity.radius],
      [entity.x + esl.w, entity.y - esl.h, entity.radius],
      [entity.x + esl.w, entity.y, entity.radius]
    );
  }
  // Top
  else if (entity.y < inner[0]) {
    drawable.push([entity.x, entity.y + esl.h, entity.radius]);
  }
  // Right
  else if (entity.x > inner[1]) {
    drawable.push([entity.x - esl.w, entity.y, entity.radius]);
  }
  // Bottom
  else if (entity.y > inner[2]) {
    drawable.push([entity.x, entity.y - esl.h, entity.radius]);
  }
  // Left
  else if (entity.x < inner[3]) {
    drawable.push([entity.x + esl.w, entity.y, entity.radius]);
  }

  // Radius arc for testing
  // arc(esl.cx, entity.x, entity.y, entity.radius, 0, 2 * Math.PI, 's');

  let j = 0;
  while (j < drawable.length) {
    line(
      esl.cx,
      translateShape(rotateShape(entity.getShape(), entity.r), drawable[j]),
      's',
      true
    );

    colliders.push([...drawable[j], index]);

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

    drawEntity(i, r, collisionRocks);

    i++;
  }
};

// Calculate and draw player ship
const drawPlayer = (dt: number = 0) => {
  player.x = player.x !== 0 ? player.x : esl.w / 2;
  player.y = player.y !== 0 ? player.y : esl.h / 2;

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

  drawEntity(0, player, collisionPlayers);
};

// Draw player explosion
const drawSplosion = (dt: number) => {
  let i = 0;
  while (i < aSplodicles.length) {
    let s = aSplodicles[i];

    s.x += s.vx * dt;
    s.y += s.vy * dt;

    wrapAtEdges(s);

    arc(esl.cx, s.x, s.y, s.radius, 0, 2 * Math.PI, 'f');

    if (s.x < 0 || s.x > esl.w || s.y < 0 || s.y > esl.h) {
      delete aSplodicles[i];
      aSplodicles = aSplodicles.filter(b => typeof b !== 'undefined');
    }

    i++;
  }
};

// Draw bullets
const drawBullets = (dt: number) => {
  let i = 0;
  while (i < aBullets.length) {
    let b = aBullets[i];

    b.x += b.vx * dt;
    b.y += b.vy * dt;

    arc(esl.cx, b.x, b.y, 2, 0, 2 * Math.PI, 'f');

    if (b.x < 0 || b.x > esl.w || b.y < 0 || b.y > esl.h) {
      delete aBullets[i];
      aBullets = aBullets.filter(b => typeof b !== 'undefined');
    }

    i++;
  }
};

// Draw score
const drawScore = () => {
  esl.config({
    font: '25px VT323',
    textAlign: 'left'
  });
  let str = score.toString();
  while (str.length < 8) {
    str = '0' + str;
  }
  esl.cx.fillText(`SCORE: ${str}`, 23, 30);
};

// Draw start menu
const drawStartMenu = () => {
  esl.config({
    font: '50px VT323',
    textAlign: 'center'
  });

  esl.cx.fillText('Space Rocks: Space Rocks!', esl.w / 2, esl.h / 2 - 100);

  esl.config({ font: '25px VT323' });
  esl.cx.fillText('Start [space]', esl.w / 2, esl.h / 2);
  esl.cx.fillText('Configure [c]', esl.w / 2, esl.h / 2 + 40);
};

// Check for bullet collisions
const checkBulletCollisions = () => {
  // For each collideable rock...
  let i = 0;
  while (i < collisionRocks.length) {
    // ...check each bullet
    let j = 0;
    while (j < aBullets.length) {
      // Distance from x-y diffs
      const dx = collisionRocks[i][0] - aBullets[j].x;
      const dy = collisionRocks[i][1] - aBullets[j].y;
      // If distance apart is less than combined radii, collision
      if (Math.sqrt(dx * dx + dy * dy) < collisionRocks[i][2]) {
        delete aBullets[j];
        aBullets = aBullets.filter(b => typeof b !== 'undefined');

        killRock(collisionRocks[i][3]);
      }
      j++;
    }
    i++;
  }
};

// Check for player collisions
const checkPlayerCollisions = () => {
  let playerRadius = player.radius * 0.75;

  // For each collideable rock...
  let i = 0;
  while (i < collisionRocks.length) {
    // ...check each collideable player
    let j = 0;
    while (j < collisionPlayers.length) {
      // Distance from x-y diffs
      const dx = collisionRocks[i][0] - collisionPlayers[j][0];
      const dy = collisionRocks[i][1] - collisionPlayers[j][1];
      // If distance apart is less than combined radii, collision
      if (Math.sqrt(dx * dx + dy * dy) < playerRadius + collisionRocks[i][2]) {
        sploded = true;
        player.thrust = false;
        player.reverse = false;
        fired = false;
        j = collisionPlayers.length;
        i = collisionRocks.length;
      }
      j++;
    }
    i++;
  }

  if (sploded) {
    genSplosion();
  }
};

// Call updates and redraws for all entities
const update = (ts: number = 0, dt: number = 0) => {
  if (paused || !gameHasFocus) {
    return;
  }

  collisionRocks = [];
  collisionPlayers = [];
  esl.wipe();

  drawRocks(dt);

  switch (mode) {
    case 'game':
      drawBullets(dt);
      if (!sploded) {
        drawPlayer(dt);
        checkBulletCollisions();
        checkPlayerCollisions();
      } else {
        drawSplosion(dt);
      }
      drawScore();
      break;

    case 'menu':
      drawStartMenu();
      break;
  }
};
engine.addTask(update);

const start = () => {
  paused = false;
  engine.start();
};

const stop = () => {
  paused = true;
  engine.stop();
};

// 37, 38, 39, left up, right
esl.cv.onkeydown = (e: KeyboardEvent) => {
  if (sploded) {
    return;
  }

  switch (mode) {
    case 'game':
      switch (e.keyCode) {
        case controls.thrust.code: // Up
          player.thrust = true;
          break;

        case controls.reverse.code: // Down
          player.reverse = true;
          break;

        case controls.left.code: // Left
          player.va = -300;
          break;

        case controls.right.code: // Right
          player.va = 300;
          break;

        case controls.fire.code: // Space (fire)
          if (!fired) {
            fired = true;
            fireBullet();
          }
          break;
      }
      break;

    case 'menu':
      switch (e.keyCode) {
        case 32: // Space (start)
          clearRocks()
          genRocks();
          mode = 'game';
          break;

        case 67: // C (configure keys)
          mode = 'config';
          break;
      }
      break;

    case 'config':
      let key;
      switch (e.keyCode) {
        case 32:
          key = 'Space';
          break;
        case 37:
          key = 'Left';
          break;
        case 38:
          key = 'Up';
          break;
        case 39:
          key = 'Right';
          break;
        case 40:
          key = 'Down';
          break;
        default:
          key = e.key;
      }
      break;
  }
};
esl.cv.onkeyup = (e: KeyboardEvent) => {
  if (sploded) {
    return;
  }

  switch (mode) {
    case 'game':
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
      break;
  }
};

// FOCUS/BLUR
esl.cv.onblur = () => {
  gameHasFocus = false;
  stop();
};

esl.cv.onfocus = () => {
  gameHasFocus = true;
  start();
};

genRocks(8);
start();
