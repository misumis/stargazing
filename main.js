"use strict";
var CANVAS_NAME = "starfield";
var STAR_NUMBER = 400;
var Star = /** @class */ (function () {
    function Star(context) {
        var _this = this;
        this.context = context;
        // selectQuarter defines the movement of the star
        //     |
        //   3 | 4
        // ---------
        //   2 | 1
        //     |
        //
        this.selectQuarter = function () {
            if (_this.y > window.innerHeight / 2) {
                if (_this.x > window.innerWidth / 2) {
                    return 1;
                }
                else {
                    return 2;
                }
            }
            else {
                if (_this.x > window.innerWidth / 2) {
                    return 4;
                }
                else {
                    return 3;
                }
            }
        };
        this.animate = function () {
            if (_this.quarterOfScreen === 1 || _this.quarterOfScreen === 4)
                _this.x = _this.x + _this.xMove;
            else
                _this.x = _this.x - _this.xMove;
            if (_this.quarterOfScreen === 1 || _this.quarterOfScreen === 2)
                _this.y = _this.y + _this.yMove;
            else
                _this.y = _this.y - _this.yMove;
            _this.radius = _this.radius + 0.005;
            _this.modifier = Math.abs(_this.x - window.innerWidth / 2) * 0.0002;
            _this.xMove = _this.xMove + _this.modifier;
            _this.modifier = Math.abs(_this.y - window.innerHeight / 2) * 0.0001;
            _this.yMove = _this.yMove + _this.modifier;
        };
        this.isOutside = function () {
            if (_this.x < 0 || _this.y < 0 || _this.x > window.innerWidth || _this.y > window.innerHeight)
                return true;
        };
        this.draw = function () {
            _this.context.beginPath();
            _this.context.arc(_this.x, _this.y, _this.radius + _this.radiusScale, 0, 2 * Math.PI);
            _this.context.fillStyle = _this.color;
            _this.context.fill();
        };
        this.erase = function () {
            _this.context.beginPath();
            _this.context.arc(_this.x, _this.y, _this.radius + _this.radiusScale + 1, 0, 2 * Math.PI);
            _this.context.fillStyle = 'black';
            _this.context.fill();
        };
        this.x = window.innerWidth * 0.2 + Math.random() * (window.innerWidth * 0.6);
        this.y = window.innerHeight * 0.2 + Math.random() * (window.innerHeight * 0.6);
        this.modifier = Math.abs(this.x - window.innerWidth / 2) * 0.01;
        this.xMove = Math.random() * 3;
        this.yMove = Math.random() * 2.5;
        this.radiusScale = Math.random() * 2;
        this.quarterOfScreen = this.selectQuarter();
        this.radius = 0.1;
        this.color = "white";
    }
    return Star;
}());
var Starfield = /** @class */ (function () {
    function Starfield(container, starNumber) {
        var _this = this;
        this.starNumber = starNumber;
        this.starArray = [];
        this.populateStarArray = function () {
            for (var i = 0; i < _this.starNumber; i++) {
                _this.starArray.push(new Star(_this.context));
            }
            for (var i = 0; i < _this.starNumber; i++) {
                _this.starArray[i].draw();
            }
        };
        this.init = function () {
            _this.canvas.width = window.innerWidth;
            _this.canvas.height = window.innerHeight;
            _this.canvas.style.backgroundColor = "black";
            _this.populateStarArray();
        };
        this.starNumber = starNumber;
        this.canvas = document.getElementById(container);
        this.context = this.canvas.getContext("2d");
        this.init();
    }
    Starfield.prototype.draw = function () {
        var _this = this;
        for (var i = 0; i < this.starNumber; i++) {
            this.starArray[i].erase();
            this.starArray[i].animate();
            if (this.starArray[i].isOutside()) {
                this.starArray.splice(i, 1);
                this.starArray.push(new Star(this.context));
            }
            this.starArray[i].draw();
            this.canvas.style.backgroundColor = "black";
        }
        window.requestAnimationFrame(function () { return _this.draw(); });
    };
    return Starfield;
}());
var canvas = new Starfield(CANVAS_NAME, STAR_NUMBER);
canvas.draw();
