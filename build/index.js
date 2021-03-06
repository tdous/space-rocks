/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../easel-js/lib/draw/arc.js":
/*!***********************************!*\
  !*** ../easel-js/lib/draw/arc.js ***!
  \***********************************/
/*! exports provided: arc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arc", function() { return arc; });
/* harmony import */ var _mode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mode */ "../easel-js/lib/draw/mode.js");

const arc = (cx, x, y, radius, radFrom, radTo, mode, antiClockwise = false) => {
    cx.beginPath();
    cx.arc(x, y, radius, radFrom, radTo, antiClockwise);
    Object(_mode__WEBPACK_IMPORTED_MODULE_0__["drawWithMode"])(cx, mode);
};


/***/ }),

/***/ "../easel-js/lib/draw/line.js":
/*!************************************!*\
  !*** ../easel-js/lib/draw/line.js ***!
  \************************************/
/*! exports provided: line */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "line", function() { return line; });
/* harmony import */ var _mode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mode */ "../easel-js/lib/draw/mode.js");

const line = (cx, points, mode, close) => {
    cx.beginPath();
    cx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        cx.lineTo(points[i][0], points[i][1]);
    }
    if (close) {
        cx.lineTo(points[0][0], points[0][1]);
    }
    Object(_mode__WEBPACK_IMPORTED_MODULE_0__["drawWithMode"])(cx, mode);
};


/***/ }),

/***/ "../easel-js/lib/draw/mode.js":
/*!************************************!*\
  !*** ../easel-js/lib/draw/mode.js ***!
  \************************************/
/*! exports provided: drawWithMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawWithMode", function() { return drawWithMode; });
var DrawModes;
(function (DrawModes) {
    DrawModes[DrawModes["f"] = 0] = "f";
    DrawModes[DrawModes["s"] = 1] = "s";
    DrawModes[DrawModes["fs"] = 2] = "fs";
    DrawModes[DrawModes["sf"] = 3] = "sf"; // Stroke then fill
})(DrawModes || (DrawModes = {}));
const drawWithMode = (cx, mode) => {
    switch (mode) {
        case 'f':
            cx.fill();
            break;
        case 's':
            cx.stroke();
            break;
        case 'fs':
            cx.fill();
            cx.stroke();
            break;
        case 'sf':
            cx.stroke();
            cx.fill();
            break;
    }
};


/***/ }),

/***/ "../easel-js/lib/index.js":
/*!********************************!*\
  !*** ../easel-js/lib/index.js ***!
  \********************************/
/*! exports provided: Easel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Easel", function() { return Easel; });
const defaultOpts = {
    focus: false,
    canvasId: 'base',
    tabIndex: 0
};
class Easel {
    constructor(id, opts) {
        opts = Object.assign(defaultOpts, opts);
        return this.bindTo(id, opts);
    }
    bindTo(id, opts) {
        opts = Object.assign(defaultOpts, opts);
        const div = document.getElementById(id);
        const cv = document.createElement('canvas');
        const divStyle = window.getComputedStyle(div);
        cv.id = opts.canvasId || 'base';
        cv.style.width = divStyle.width;
        cv.style.height = divStyle.height;
        div.appendChild(cv);
        this.cv = cv;
        this.cx = this.cv.getContext('2d');
        this.setupCanvas(opts);
        return this;
    }
    setupCanvas(opts) {
        if (opts) {
            if (typeof opts.tabIndex !== 'undefined') {
                this.cv.tabIndex = opts.tabIndex;
            }
            if (opts.focus) {
                this.cv.focus();
            }
        }
        const cvStyle = window.getComputedStyle(this.cv);
        this.cv.setAttribute('width', cvStyle.width);
        this.cv.setAttribute('height', cvStyle.height);
        this.w = parseInt(cvStyle.width);
        this.h = parseInt(cvStyle.height);
        this.rt = this.cv.getBoundingClientRect();
    }
    config(conf) {
        for (let i in conf) {
            this.cx[i] = conf[i];
        }
    }
    wipe() {
        this.cx.clearRect(0, 0, this.w, this.h);
    }
}


/***/ }),

/***/ "./node_modules/anim-loop-engine/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/anim-loop-engine/lib/index.js ***!
  \****************************************************/
/*! exports provided: AnimLoopEngine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimLoopEngine", function() { return AnimLoopEngine; });
/**
 * Simple boilerplate avoidance class for requestAnimationFrame looping
 * which runs an array of tasks you specify for frame. It's not clever -
 * it assumes you're keeping your frame tasks fast.
 */
class AnimLoopEngine {
    constructor() {
        this.frameReqId = 0;
        this.frameTasks = [];
        this.lastFrameTaskId = 0;
        this.tsPrev = 0; // Previous timestamp
        this.tick = (ts = 0) => {
            if (this.tsPrev === null) {
                this.tsPrev = ts;
            }
            let i = 0;
            let dt = (ts - this.tsPrev) / 1000;
            while (i < this.frameTasks.length) {
                this.frameTasks[i].fn(ts, dt);
                i++;
            }
            this.tsPrev = ts;
            this.frameReqId = window.requestAnimationFrame(this.tick);
        };
        this.addTasks = this.addTasks.bind(this);
    }
    addTask(task) {
        return this.addTasks([task])[0];
    }
    addTasks(tasks) {
        const createdIds = [];
        if (tasks.length == 0) {
            return createdIds;
        }
        tasks.forEach(task => {
            this.frameTasks.push({ id: this.lastFrameTaskId, fn: task });
            createdIds.push(this.lastFrameTaskId);
            this.lastFrameTaskId++;
        });
        return createdIds;
    }
    deleteTask(taskId) {
        this.frameTasks = this.frameTasks.filter(t => t.id !== taskId);
    }
    start() {
        this.tsPrev = null;
        this.frameReqId = window.requestAnimationFrame(this.tick);
    }
    stop() {
        window.cancelAnimationFrame(this.frameReqId);
        this.frameReqId = null;
    }
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./src/entities/Bullet.ts":
/*!********************************!*\
  !*** ./src/entities/Bullet.ts ***!
  \********************************/
/*! exports provided: Bullet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bullet", function() { return Bullet; });
var Bullet = /** @class */ (function () {
    function Bullet(x, y, vx, vy) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (vx === void 0) { vx = 0; }
        if (vy === void 0) { vy = 0; }
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    }
    return Bullet;
}());



/***/ }),

/***/ "./src/entities/Player.ts":
/*!********************************!*\
  !*** ./src/entities/Player.ts ***!
  \********************************/
/*! exports provided: Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
var Player = /** @class */ (function () {
    function Player(x, y, scale) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (scale === void 0) { scale = 1; }
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.s = [];
        this.r = 0;
        this.radius = 14;
        this.reverse = false;
        this.thrust = false;
        this.vx = 0;
        this.vy = 0;
        this.va = 0;
        this.tx = 0; // Target x - gives x something to aspire to
        this.ty = 0; // Target y - gives y something to aspire to
    }
    Player.prototype.getShape = function () {
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
    };
    Player.prototype.reset = function (x, y) {
        this.x = x;
        this.y = y;
        this.r = 0;
        this.vx = 0;
        this.vy = 0;
        this.tx = 0;
        this.ty = 0;
        this.va = 0;
    };
    return Player;
}());



/***/ }),

/***/ "./src/entities/Rock.ts":
/*!******************************!*\
  !*** ./src/entities/Rock.ts ***!
  \******************************/
/*! exports provided: Rock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rock", function() { return Rock; });
var Rock = /** @class */ (function () {
    function Rock(x, y, vx, vy, va, radius, gen) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (vx === void 0) { vx = 0; }
        if (vy === void 0) { vy = 0; }
        if (va === void 0) { va = 0; }
        if (radius === void 0) { radius = 1; }
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.va = va;
        this.radius = radius;
        this.s = [];
        this.r = 0;
        this.gen = 3; // Generation - 3 = 1st, 2 = 2nd, 1 = 3rd and last
        if (gen) {
            this.gen = gen;
        }
        this.radius = radius * this.gen;
    }
    Rock.prototype.getShape = function () {
        if (this.s.length > 0) {
            return this.s;
        }
        var div = 13;
        var angle = (2 * Math.PI) / div;
        for (var i = 0; i < div; i++) {
            this.s.push([
                Math.sin(i * angle) * (Math.random() * 10 + this.radius),
                Math.cos(i * angle) * (Math.random() * 10 + this.radius)
            ]);
        }
        return this.s;
    };
    return Rock;
}());



/***/ }),

/***/ "./src/entities/Splodicle.ts":
/*!***********************************!*\
  !*** ./src/entities/Splodicle.ts ***!
  \***********************************/
/*! exports provided: Splodicle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Splodicle", function() { return Splodicle; });
var Splodicle = /** @class */ (function () {
    function Splodicle(x, y, vx, vy, radius) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (vx === void 0) { vx = 0; }
        if (vy === void 0) { vy = 0; }
        if (radius === void 0) { radius = 0; }
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
    }
    return Splodicle;
}());



/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var anim_loop_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! anim-loop-engine */ "./node_modules/anim-loop-engine/lib/index.js");
/* harmony import */ var _easel_js_lib_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../easel-js/lib/index */ "../easel-js/lib/index.js");
/* harmony import */ var _easel_js_lib_draw_arc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../easel-js/lib/draw/arc */ "../easel-js/lib/draw/arc.js");
/* harmony import */ var _easel_js_lib_draw_line__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../easel-js/lib/draw/line */ "../easel-js/lib/draw/line.js");
/* harmony import */ var _utils_math__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/math */ "./src/utils/math.ts");
/* harmony import */ var _entities_Bullet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./entities/Bullet */ "./src/entities/Bullet.ts");
/* harmony import */ var _entities_Player__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./entities/Player */ "./src/entities/Player.ts");
/* harmony import */ var _entities_Rock__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./entities/Rock */ "./src/entities/Rock.ts");
/* harmony import */ var _entities_Splodicle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./entities/Splodicle */ "./src/entities/Splodicle.ts");
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

// import { Easel } from 'easel-js';
// import { arc } from 'easel-js/lib/draw/arc';
// import { line } from 'easel-js/lib/draw/line';








var controls = {
    thrust: { key: 'Up', code: 38 },
    reverse: { key: 'Down', code: 40 },
    left: { key: 'Left', code: 37 },
    right: { key: 'Right', code: 39 },
    fire: { key: 'Space', code: 32 }
};
var fired = false;
var gameHasFocus = true;
var initNumRocks = 2;
var level = 1;
var lives = 3;
var mode = 'menu'; // 'menu' | 'config' | 'game' | 'end'
var paused = false;
var score = 0;
var sploded = false;
// Arrays of shit
var aBullets = [];
var aRocks = [];
var aSplodicles = [];
var collisionRocks = [];
var collisionPlayers = [];
var engine = new anim_loop_engine__WEBPACK_IMPORTED_MODULE_0__["AnimLoopEngine"]();
var esl = new _easel_js_lib_index__WEBPACK_IMPORTED_MODULE_1__["Easel"]('sr', { tabIndex: 0, focus: true });
esl.config({
    fillStyle: '#FFF',
    lineWidth: 2,
    strokeStyle: '#FFF',
    textBaseline: 'middle'
});
var scalingBase = esl.w > esl.h ? esl.w : esl.h;
var rockRadius = scalingBase / 45;
var rockBaseVel = scalingBase / 15;
var calcRockSpawnCoord = function (axis) {
    if (axis === 'x') {
        return Math.random() < 0.5
            ? (esl.w / 4) * Math.random()
            : (esl.w / 4) * Math.random() + (esl.w / 3) * 2;
    }
    else {
        return Math.random() < 0.5
            ? (esl.h / 4) * Math.random()
            : (esl.h / 4) * Math.random() + (esl.h / 3) * 2;
    }
};
var rotateShape = function (shape, angle) {
    var rad = Object(_utils_math__WEBPACK_IMPORTED_MODULE_4__["degreesToRadians"])(angle);
    var rShape = [];
    for (var i = 0; i < shape.length; i++) {
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
var translateShape = function (shape, matrix) {
    var tShape = [];
    for (var i = 0; i < shape.length; i++) {
        tShape[i] = [shape[i][0] + matrix[0], shape[i][1] + matrix[1]];
    }
    return tShape;
};
var wrapAtEdges = function (entity) {
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
var randomNeg = function () { return (Math.random() < 0.5 ? 1 : -1); };
// --- Generate entities, and other lovely things
// Gen player
var player = new _entities_Player__WEBPACK_IMPORTED_MODULE_6__["Player"]();
// Generate rocks
var genRocks = function (num) {
    if (num === void 0) { num = initNumRocks; }
    // Gen rocks
    for (var i = 0; i < num; i++) {
        var vx = (Math.random() * rockBaseVel + 15) * randomNeg();
        var vy = (Math.random() * rockBaseVel + 15) * randomNeg();
        aRocks.push(new _entities_Rock__WEBPACK_IMPORTED_MODULE_7__["Rock"](calcRockSpawnCoord('x'), calcRockSpawnCoord('y'), vx, vy, Math.random() * 100 * randomNeg(), rockRadius));
    }
};
var clearRocks = function () {
    aRocks = [];
};
// Gen rock's screen boundaries
var genRockInner = function (radius) {
    return [0 + radius, esl.w - radius, esl.h - radius, 0 + radius];
};
// Generate player explosion
var genSplosion = function () {
    var i = 0;
    while (i < 20) {
        aSplodicles.push(new _entities_Splodicle__WEBPACK_IMPORTED_MODULE_8__["Splodicle"](player.x + Math.random() * 10 * randomNeg(), player.y + Math.random() * 10 * randomNeg(), player.vx / 2 + Math.random() * 50 * randomNeg(), player.vy / 2 + Math.random() * 50 * randomNeg(), Math.random() * 2.5 + 0.5));
        i++;
    }
    // Start timer to reset after explosion
    setTimeout(function () {
        aSplodicles = [];
        sploded = false;
        player.reset(esl.w / 2, esl.h / 2);
    }, 3000);
};
// Fire a bullet
var fireBullet = function () {
    var rad = Object(_utils_math__WEBPACK_IMPORTED_MODULE_4__["degreesToRadians"])(player.r);
    aBullets.push(new _entities_Bullet__WEBPACK_IMPORTED_MODULE_5__["Bullet"](player.x + Math.sin(rad) * 14, player.y + -Math.cos(rad) * 14, player.vx + Math.sin(rad) * 350, player.vy + -Math.cos(rad) * 350));
};
// Kill a rock
var killRock = function (i) {
    if (aRocks[i].gen > 1) {
        var j = 0;
        while (j < 2) {
            aRocks.push(new _entities_Rock__WEBPACK_IMPORTED_MODULE_7__["Rock"](aRocks[i].x + ((Math.random() * aRocks[i].radius) / 2) * randomNeg(), aRocks[i].y + ((Math.random() * aRocks[i].radius) / 2) * randomNeg(), aRocks[i].vx + Math.random() * rockBaseVel * randomNeg(), aRocks[i].vy + Math.random() * rockBaseVel * randomNeg(), Math.random() * 100 * randomNeg(), rockRadius, aRocks[i].gen - 1));
            j++;
        }
    }
    delete aRocks[i];
    aRocks = aRocks.filter(function (b) { return typeof b !== 'undefined'; });
};
// --- Draw things ---
// Draw an entity shape at calced location and rotation
var drawEntity = function (index, entity, colliders) {
    var drawable = [];
    // Screen wrap boundaries
    var inner = genRockInner(entity.radius);
    // Don't accrue large spin angles
    if (entity.r > 360) {
        entity.r -= 360;
    }
    else if (entity.r < -360) {
        entity.r += 360;
    }
    // Wrap entity at screen edges
    wrapAtEdges(entity);
    // Add main rock to drawable array
    drawable.push([entity.x, entity.y, entity.radius]);
    // Check for boundary overlap to generate faux-rocks:
    // Top left
    if (entity.x < inner[3] && entity.y < inner[0]) {
        drawable.push([entity.x, entity.y + esl.h, entity.radius], [entity.x + esl.w, entity.y, entity.radius], [entity.x + esl.w, entity.y + esl.h, entity.radius]);
    }
    // Top right
    else if (entity.x > inner[1] && entity.y < inner[0]) {
        drawable.push([entity.x - esl.w, entity.y, entity.radius], [entity.x - esl.w, entity.y + esl.h, entity.radius], [entity.x, entity.y + esl.h, entity.radius]);
    }
    // Bottom right
    else if (entity.x > inner[1] && entity.y > inner[2]) {
        drawable.push([entity.x - esl.w, entity.y - esl.h, entity.radius], [entity.x, entity.y - esl.h, entity.radius], [entity.x - esl.w, entity.y, entity.radius]);
    }
    // Bottom left
    else if (entity.x < inner[3] && entity.y > inner[2]) {
        drawable.push([entity.x, entity.y - esl.h, entity.radius], [entity.x + esl.w, entity.y - esl.h, entity.radius], [entity.x + esl.w, entity.y, entity.radius]);
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
    var j = 0;
    while (j < drawable.length) {
        Object(_easel_js_lib_draw_line__WEBPACK_IMPORTED_MODULE_3__["line"])(esl.cx, translateShape(rotateShape(entity.getShape(), entity.r), drawable[j]), 's', true);
        colliders.push(__spreadArrays(drawable[j], [index]));
        j++;
    }
};
// Calculate and draw new rock positions
var drawRocks = function (dt) {
    if (dt === void 0) { dt = 0; }
    var i = 0;
    while (i < aRocks.length) {
        var r = aRocks[i];
        r.x += r.vx * dt;
        r.y += r.vy * dt;
        r.r += r.va * dt;
        // Don't accrue large spin angles
        if (r.r > 360) {
            r.r -= 360;
        }
        else if (r.r < -360) {
            r.r += 360;
        }
        drawEntity(i, r, collisionRocks);
        i++;
    }
};
// Calculate and draw player ship
var drawPlayer = function (dt) {
    if (dt === void 0) { dt = 0; }
    player.x = player.x !== 0 ? player.x : esl.w / 2;
    player.y = player.y !== 0 ? player.y : esl.h / 2;
    player.r += player.va * dt;
    if (player.thrust || player.reverse) {
        player.tx =
            Math.sin(Object(_utils_math__WEBPACK_IMPORTED_MODULE_4__["degreesToRadians"])(player.reverse ? player.r + 180 : player.r)) *
                400;
        player.ty =
            -Math.cos(Object(_utils_math__WEBPACK_IMPORTED_MODULE_4__["degreesToRadians"])(player.reverse ? player.r + 180 : player.r)) *
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
var drawSplosion = function (dt) {
    var i = 0;
    while (i < aSplodicles.length) {
        var s = aSplodicles[i];
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        wrapAtEdges(s);
        Object(_easel_js_lib_draw_arc__WEBPACK_IMPORTED_MODULE_2__["arc"])(esl.cx, s.x, s.y, s.radius, 0, 2 * Math.PI, 'f');
        if (s.x < 0 || s.x > esl.w || s.y < 0 || s.y > esl.h) {
            delete aSplodicles[i];
            aSplodicles = aSplodicles.filter(function (b) { return typeof b !== 'undefined'; });
        }
        i++;
    }
};
// Draw bullets
var drawBullets = function (dt) {
    var i = 0;
    while (i < aBullets.length) {
        var b = aBullets[i];
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        Object(_easel_js_lib_draw_arc__WEBPACK_IMPORTED_MODULE_2__["arc"])(esl.cx, b.x, b.y, 2, 0, 2 * Math.PI, 'f');
        if (b.x < 0 || b.x > esl.w || b.y < 0 || b.y > esl.h) {
            delete aBullets[i];
            aBullets = aBullets.filter(function (b) { return typeof b !== 'undefined'; });
        }
        i++;
    }
};
// Draw score
var drawScore = function () {
    esl.config({
        font: '25px VT323',
        textAlign: 'left'
    });
    var str = score.toString();
    while (str.length < 8) {
        str = '0' + str;
    }
    esl.cx.fillText("SCORE: " + str, 23, 30);
};
// Draw start menu
var drawStartMenu = function () {
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
var checkBulletCollisions = function () {
    // For each collideable rock...
    var i = 0;
    while (i < collisionRocks.length) {
        // ...check each bullet
        var j = 0;
        while (j < aBullets.length) {
            // Distance from x-y diffs
            var dx = collisionRocks[i][0] - aBullets[j].x;
            var dy = collisionRocks[i][1] - aBullets[j].y;
            // If distance apart is less than combined radii, collision
            if (Math.sqrt(dx * dx + dy * dy) < collisionRocks[i][2]) {
                delete aBullets[j];
                aBullets = aBullets.filter(function (b) { return typeof b !== 'undefined'; });
                killRock(collisionRocks[i][3]);
            }
            j++;
        }
        i++;
    }
};
// Check for player collisions
var checkPlayerCollisions = function () {
    var playerRadius = player.radius * 0.75;
    // For each collideable rock...
    var i = 0;
    while (i < collisionRocks.length) {
        // ...check each collideable player
        var j = 0;
        while (j < collisionPlayers.length) {
            // Distance from x-y diffs
            var dx = collisionRocks[i][0] - collisionPlayers[j][0];
            var dy = collisionRocks[i][1] - collisionPlayers[j][1];
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
var update = function (ts, dt) {
    if (ts === void 0) { ts = 0; }
    if (dt === void 0) { dt = 0; }
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
            }
            else {
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
var start = function () {
    paused = false;
    engine.start();
};
var stop = function () {
    paused = true;
    engine.stop();
};
// 37, 38, 39, left up, right
esl.cv.onkeydown = function (e) {
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
                    clearRocks();
                    genRocks();
                    mode = 'game';
                    break;
                case 67: // C (configure keys)
                    mode = 'config';
                    break;
            }
            break;
        case 'config':
            var key = void 0;
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
esl.cv.onkeyup = function (e) {
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
esl.cv.onblur = function () {
    gameHasFocus = false;
    stop();
};
esl.cv.onfocus = function () {
    gameHasFocus = true;
    start();
};
genRocks(8);
start();


/***/ }),

/***/ "./src/utils/math.ts":
/*!***************************!*\
  !*** ./src/utils/math.ts ***!
  \***************************/
/*! exports provided: degreesToRadians, radiansToDegrees */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "degreesToRadians", function() { return degreesToRadians; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "radiansToDegrees", function() { return radiansToDegrees; });
var degreesToRadians = function (d) {
    return ((2 * Math.PI) / 360) * d;
};
var radiansToDegrees = function (r) {
    return (360 / (2 * Math.PI)) * r;
};


/***/ })

/******/ });
//# sourceMappingURL=index.js.map