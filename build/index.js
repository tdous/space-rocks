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

/***/ "../anim-loop-engine/lib/index.js":
/*!****************************************!*\
  !*** ../anim-loop-engine/lib/index.js ***!
  \****************************************/
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
    // console.log(points);
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
class Easel {
    constructor(id, opts) {
        return this.bindTo(id, opts);
    }
    bindTo(id, opts) {
        this.cv = document.getElementById(id);
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
        this.gen = 1; // Generation - 1 = 1st, 2 = 2nd, 3 = 3rd and last
        if (gen) {
            this.gen = gen;
        }
    }
    Rock.prototype.getShape = function () {
        if (this.s.length > 0) {
            return this.s;
        }
        var div = 7;
        var angle = (2 * Math.PI) / div;
        for (var i = 0; i < div; i++) {
            this.s.push([
                Math.sin(i * angle) * (Math.random() * 10 + this.radius - 5),
                Math.cos(i * angle) * (Math.random() * 10 + this.radius - 5)
            ]);
        }
        return this.s;
    };
    return Rock;
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
/* harmony import */ var _anim_loop_engine_lib_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../anim-loop-engine/lib/index */ "../anim-loop-engine/lib/index.js");
/* harmony import */ var _easel_js_lib_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../easel-js/lib/index */ "../easel-js/lib/index.js");
/* harmony import */ var _easel_js_lib_draw_line__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../easel-js/lib/draw/line */ "../easel-js/lib/draw/line.js");
/* harmony import */ var _utils_math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/math */ "./src/utils/math.ts");
/* harmony import */ var _entities_Player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./entities/Player */ "./src/entities/Player.ts");
/* harmony import */ var _entities_Rock__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./entities/Rock */ "./src/entities/Rock.ts");
// import { AnimLoopEngine } from 'anim-loop-engine';



// import { Easel } from 'easel-js';



var gameHasFocus = true;
var paused = false;
var engine = new _anim_loop_engine_lib_index__WEBPACK_IMPORTED_MODULE_0__["AnimLoopEngine"]();
var easel = new _easel_js_lib_index__WEBPACK_IMPORTED_MODULE_1__["Easel"]('sr', { tabIndex: 0, focus: true });
easel.config({
    fillStyle: '#FFF',
    font: '50px VT323',
    lineWidth: 2,
    strokeStyle: '#FFF',
    textAlign: 'center',
    textBaseline: 'middle'
});
var scalingBase = easel.w > easel.h ? easel.w : easel.h;
var rockRadius = scalingBase / 15;
var rockBaseVel = scalingBase / 40;
var calcRockSpawnCoord = function (axis) {
    if (axis === 'x') {
        return Math.random() < 0.5
            ? (easel.w / 4) * Math.random()
            : (easel.w / 4) * Math.random() + (easel.w / 3) * 2;
    }
    else {
        return Math.random() < 0.5
            ? (easel.h / 4) * Math.random()
            : (easel.h / 4) * Math.random() + (easel.h / 3) * 2;
    }
};
var rotateShape = function (shape, angle) {
    var rad = Object(_utils_math__WEBPACK_IMPORTED_MODULE_3__["degreesToRadians"])(angle);
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
var randomNeg = function () { return (Math.random() < 0.5 ? 1 : -1); };
// GENERATE SHIT
// Gen player
var plyr = new _entities_Player__WEBPACK_IMPORTED_MODULE_4__["Player"]();
// Gen rocks
var aRocks = [];
for (var i = 0; i < 5; i++) {
    aRocks.push(new _entities_Rock__WEBPACK_IMPORTED_MODULE_5__["Rock"](calcRockSpawnCoord('x'), calcRockSpawnCoord('y'), 
    // -10,
    // -10,
    (Math.random() * rockBaseVel + 50) * randomNeg(), (Math.random() * rockBaseVel + 50) * randomNeg(), Math.random() * 100 * randomNeg(), rockRadius));
    // console.log(...aRocks);
}
// Gen rock's screen boundaries
var genRockInner = function (radius) {
    return [0 + radius, easel.w - radius, easel.h - radius, 0 + radius];
};
// Draw an entity shape at calced location and rotation
var drawEntity = function (entity, dt) {
    if (dt === void 0) { dt = 0; }
    var drawable = [];
    // Screen wrap boundaries
    var inner = genRockInner(entity.radius);
    entity.x += parseInt((entity.vx * dt).toFixed(4));
    entity.y += parseInt((entity.vy * dt).toFixed(4));
    entity.r += entity.va * dt;
    // Don't accrue large spin angles
    if (entity.r > 360) {
        entity.r -= 360;
    }
    else if (entity.r < -360) {
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
        drawable.push([entity.x, entity.y + easel.h], [entity.x + easel.w, entity.y], [entity.x + easel.w, entity.y + easel.h]);
    }
    // Top right
    else if (entity.x > inner[1] && entity.y < inner[0]) {
        drawable.push([entity.x - easel.w, entity.y], [entity.x - easel.w, entity.y + easel.h], [entity.x, entity.y + easel.h]);
    }
    // Bottom right
    else if (entity.x > inner[1] && entity.y < inner[2]) {
        drawable.push([entity.x - easel.w, entity.y - easel.h], [entity.x, entity.y - easel.h], [entity.x - easel.w, entity.y]);
    }
    // Bottom left
    else if (entity.x < inner[3] && entity.y > inner[2]) {
        drawable.push([entity.x, entity.y - easel.h], [entity.x + easel.w, entity.y - easel.h], [entity.x + easel.w, entity.y]);
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
    var j = 0;
    while (j < drawable.length) {
        Object(_easel_js_lib_draw_line__WEBPACK_IMPORTED_MODULE_2__["line"])(easel.cx, translateShape(rotateShape(entity.getShape(), entity.r), drawable[j]), 's', true);
        j++;
    }
};
// Calculate and draw new rock positions
var drawRocks = function (dt) {
    if (dt === void 0) { dt = 0; }
    var i = 0;
    while (i < aRocks.length) {
        var r = aRocks[i];
        r.x += parseInt((r.vx * dt).toFixed(4));
        r.y += parseInt((r.vy * dt).toFixed(4));
        r.r += r.va * dt;
        // Don't accrue large spin angles
        if (r.r > 360) {
            r.r -= 360;
        }
        else if (r.r < -360) {
            r.r += 360;
        }
        drawEntity(r, dt);
        i++;
    }
};
// Calculate and draw player ship
var drawPlayer = function (dt) {
    if (dt === void 0) { dt = 0; }
    plyr.x = plyr.x !== 0 ? plyr.x : easel.w / 2;
    plyr.y = plyr.y !== 0 ? plyr.y : easel.h / 2;
    plyr.r += plyr.va * dt;
    if (plyr.thrust || plyr.reverse) {
        plyr.tx =
            Math.sin(Object(_utils_math__WEBPACK_IMPORTED_MODULE_3__["degreesToRadians"])(plyr.reverse ? plyr.r + 180 : plyr.r)) * 400;
        plyr.ty =
            -Math.cos(Object(_utils_math__WEBPACK_IMPORTED_MODULE_3__["degreesToRadians"])(plyr.reverse ? plyr.r + 180 : plyr.r)) * 400;
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
var update = function (ts, dt) {
    if (ts === void 0) { ts = 0; }
    if (dt === void 0) { dt = 0; }
    if (paused || !gameHasFocus) {
        return;
    }
    easel.wipe();
    drawRocks(dt);
    drawPlayer(dt);
    easel.cx.fillText('Space Rocks: Space Rocks!', easel.w / 2, easel.h / 2 - 100);
};
engine.addTask(update);
var start = function () {
    paused = false;
    console.log('START');
    engine.start();
};
var stop = function () {
    paused = true;
    console.log('STOP');
    engine.stop();
};
// 37, 38, 39, left up, right
easel.cv.onkeydown = function (e) {
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
easel.cv.onkeyup = function (e) {
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
easel.cv.onblur = function () {
    gameHasFocus = false;
    console.log('BLUR');
    stop();
};
easel.cv.onfocus = function () {
    gameHasFocus = true;
    console.log('FOCUS');
    start();
};
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