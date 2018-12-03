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
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/light_cycles.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/board.js":
/*!**********************!*\
  !*** ./lib/board.js ***!
  \**********************/
/*! exports provided: initBoard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initBoard", function() { return initBoard; });
const initBoard = (canvas, ctx) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, 600, 600);

    drawGrid(ctx, canvas.height, canvas.width, 25);
}

const drawGrid = (ctx, w, h, step) => {
  ctx.lineWidth = 0.8;
  ctx.strokeStyle = 'rgba(0,255,255, 1)';

  for (let i = step; i < w; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, h);
    ctx.stroke();
  }

  for (let j = step; j < h; j += step) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(w, j);
    ctx.stroke();
  }

  for (let i = step; i < w; i += step) {
    for (let j = step; j < h; j += step) {
      ctx.beginPath();
      ctx.arc(i, j, (step / 7.5), 0, 2*Math.PI);
      ctx.stroke();
    }
  }
}


/***/ }),

/***/ "./lib/computer_bike.js":
/*!******************************!*\
  !*** ./lib/computer_bike.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class ComputerBike {
  constructor(poly, init_vel, prev_points) {
    this.poly = document.getElementById(poly);
    this.x = 300;
    this.y = 300;
    this.vel = init_vel;

    this.prev_points = prev_points;
    this.lost = false;
  }

  play() {
    if (this.lost) {
      this.clearPositions();
    } else {
      this.handleMove();
    }
  }

  pause() {
    clearInterval(this.moveFunction);
  }

  handleMove() {
    const increment = () => {
      this.handleVel();
      this.x += this.vel[0];
      this.y += this.vel[1];

      const point = svg.createSVGPoint();
      point.x = this.x;
      point.y = this.y;


      if (this.prev_points[[this.x, this.y]]) {
        this.lost = true;
        clearInterval(this.moveFunction);
        this.clearPositions();
      } else if ([0, 600].includes(this.x) || [0, 600].includes(this.y)) {
        this.lost = true;
        clearInterval(this.moveFunction);
        this.clearPositions();
      } else {
        this.prev_points[[this.x, this.y]] = true;
        this.poly.points.appendItem(point);
      }
    }

    this.moveFunction = setInterval(increment, 10);
  }

  handleVel() {
    const RIGHT_TURNS = {
      "0,1": [-1, 0],
      "-1,0": [0, -1],
      "0,-1": [1, 0],
      "1,0": [0, 1],};

    const LEFT_TURNS = {
      "0,1": [1, 0],
      "1,0": [0, -1],
      "0,-1": [-1, 0],
      "-1,0": [0, 1],};

    let dist = this.calcDist();
    let prob_thresh = 1 / (dist + 1);
    let prob = Math.random();

    if (prob < prob_thresh / 2) {
      this.vel = LEFT_TURNS[String(this.vel)];
    } else if (prob < prob_thresh) {
      this.vel = RIGHT_TURNS[String(this.vel)];
    }
  }

  calcDist() {
    let dist = 1;

    while (dist < 600) {
      let pos_temp = [(this.x + dist*this.vel[0]), (this.y + dist*this.vel[1])];

      if (this.prev_points[pos_temp]) {
        return dist;
      } else if ([0, 600].includes(pos_temp[0]) || [0, 600].includes(pos_temp[1])) {
        return dist;
      } else {
        dist++;
      }
    }

  }

  clearPositions() {
    let i = this.poly.points.length - 1;

    const rewindPoly = () => {
      if (i > 0) {
        let prev_point = [this.poly.points[i].x, this.poly.points[i].y];
        delete this.prev_points[prev_point];
        this.poly.points.removeItem(i);
        i--;
      } else {
        clearInterval(this.moveFunction);
      }
    }

    // It might seem strange for me to call the rewind interval a 'moveFunction'
    // just like the one above. I'm doing this so that the rewind motion will
    // still respond to the pause method

    this.moveFunction = setInterval(rewindPoly, 3);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ComputerBike);


/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player_bike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player_bike.js */ "./lib/player_bike.js");
/* harmony import */ var _computer_bike_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./computer_bike.js */ "./lib/computer_bike.js");



class Game {
  constructor() {
    this.prev_points = {};
    this.canvas = document.getElementById('tronGame');
    this.svg = document.getElementById('svg');
    this.start_button = document.getElementById('start');
    this.pause_button = document.getElementById('paused');

    this.player = new _player_bike_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.prev_points);
    this.enemy_bikes = [
      new _computer_bike_js__WEBPACK_IMPORTED_MODULE_1__["default"]("enemy_1", [-1, 0], this.prev_points),
      new _computer_bike_js__WEBPACK_IMPORTED_MODULE_1__["default"]("enemy_2", [0, 1], this.prev_points),
      new _computer_bike_js__WEBPACK_IMPORTED_MODULE_1__["default"]("enemy_3", [0, -1], this.prev_points)
    ];

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);

    this.svg.classList.add('shroud');
    this.canvas.classList.add('shroud');
    this.pause_button.classList.add('hidden');

    window.addEventListener('keyup', this.play)
  }

  play(e) {
    if (e.keyCode !== 32) {return}

    this.svg.classList.remove('shroud');
    this.canvas.classList.remove('shroud');
    this.start_button.classList.add('hidden');
    this.pause_button.classList.add('hidden');

    this.player.play();
    this.enemy_bikes.forEach((enemy) => enemy.play());

    window.removeEventListener('keyup', this.play);
    window.addEventListener('keyup', this.pause);
  }

  pause(e) {
    if (e.keyCode !== 32) {return}

    this.svg.classList.add('shroud');
    this.canvas.classList.add('shroud');
    this.pause_button.classList.remove('hidden');

    this.player.pause();
    this.enemy_bikes.forEach((enemy) => enemy.pause());


    window.removeEventListener('keyup', this.pause);
    window.addEventListener('keyup', this.play);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Game);


/***/ }),

/***/ "./lib/light_cycles.js":
/*!*****************************!*\
  !*** ./lib/light_cycles.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _board_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board.js */ "./lib/board.js");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game.js */ "./lib/game.js");



window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('tronGame');

  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');
    Object(_board_js__WEBPACK_IMPORTED_MODULE_0__["initBoard"])(canvas, ctx);
  }

  const game = new _game_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
})


/***/ }),

/***/ "./lib/player_bike.js":
/*!****************************!*\
  !*** ./lib/player_bike.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class PlayerBike {
  constructor(prev_points) {
    this.player_poly = document.getElementById('player');
    this.x = 300;
    this.y = 300;
    this.vel = [1, 0];

    this.prev_points = prev_points;

    this.lost = false;
  }

  play() {
    this.handleVel();
    this.handleMove();
  }

  pause() {
    window.removeEventListener('keyup', (e) => updateVel(e));
    clearInterval(this.moveFunction);
  }

  handleMove() {
    const increment = () => {
      this.x += this.vel[0];
      this.y += this.vel[1];

      const point = svg.createSVGPoint();
      point.x = this.x;
      point.y = this.y;

      if (this.prev_points[[this.x, this.y]]) {
        clearInterval(this.moveFunction);
        this.clearPositions();
      } else if ([0, 600].includes(this.x) || [0, 600].includes(this.y)) {
        clearInterval(this.moveFunction);
        this.clearPositions();
      } else {
        this.prev_points[[this.x, this.y]] = true;
        this.player_poly.points.appendItem(point);
      }
    };

    this.moveFunction = setInterval(increment, 10);
  }

  handleVel() {
    const updateVel = (e) => {
      switch(e.keyCode) {
        // left or a
        case 37: case 65:
          if (this.vel[0] !== 1 && this.vel[1] !== 0) {
            this.vel = [-1, 0];
          };
          break;

        // up or w
        case 38: case 87:
          if (this.vel[0] !== 0 && this.vel[1] !== 1) {
            this.vel = [0, -1];
          };
          break;

        // right or d
        case 39: case 68:
          if (this.vel[0] !== -1 && this.vel[1] !== 0) {
            this.vel = [1, 0];
          };
          break;

        // down or s
        case 40: case 83:
          if (this.vel[0] !== 0 && this.vel[1] !== -1) {
            this.vel = [0, 1];
          };
          break;

        default:
          break;
      }
    }

    window.addEventListener('keyup', (e) => updateVel(e));
  }

  clearPositions() {
    let i = this.player_poly.points.length - 1;

    while (i > 0) {
      let prev_point = [
        this.player_poly.points[i].x,
        this.player_poly.points[i].y
      ];

      delete this.prev_points[prev_point];
      this.player_poly.points.removeItem(i);
      i--;
    }
  }

};

/* harmony default export */ __webpack_exports__["default"] = (PlayerBike);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map