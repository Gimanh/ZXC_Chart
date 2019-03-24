(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ZXC"] = factory();
	else
		root["ZXC"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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

/***/ "./src/Classes/Chart/Chart.ts":
/*!************************************!*\
  !*** ./src/Classes/Chart/Chart.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Layer_1 = __webpack_require__(/*! ./Layer */ "./src/Classes/Chart/Layer.ts");
var RangePreview_1 = __webpack_require__(/*! ./RangePreview */ "./src/Classes/Chart/RangePreview.ts");
var Dom_1 = __webpack_require__(/*! ./Dom */ "./src/Classes/Chart/Dom.ts");
var Chart = /** @class */ (function () {
    function Chart(options) {
        this.$textColor = '#95a4ad';
        this.$bgColor = '#ffffff';
        this.$linesColor = '#dee6eb';
        this.$rangeBgColor = 'rgba(244, 249, 251, 0.80)';
        this.$rangeEdgeBg = '#3a566d';
        this.$tooltipBg = '#ffffff';
        this.$layers = [];
        this.$marginTop = 50;
        this.$marginRight = 50;
        this.$marginBottom = 50;
        this.$marginLeft = 50;
        this.$sectionsCountYValues = 7;
        this.$sectionsYValues = [];
        this.$sectionsCountXDates = 25;
        this.$allDatesOfVisibleLayers = [];
        this.$startDatesIndex = 0; //compute with drag chart
        this.$dragged = false;
        this.$currentSessionMouseOffset = 0;
        this.$totalMouseOffset = 0;
        this.$isPreview = false;
        this.$debug = false;
        this.$days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this._$themeDark = false;
        this.$fontSize = 14;
        this.$fontStyle = 'Arial';
        this.$options = options;
        this.$isPreview = this.$options.isPreview;
        this.initializeCanvas();
        this.initializeHeightAndWidth();
        this.initializeLayers();
        this.initializeMinMaxValues();
        this.initializeDates();
        this.initializeYValues();
        if (this.$options.showPreview) {
            this.createPreviewCanvas();
        }
        if (!this.$isPreview) {
            this.createLegend();
            this.createThemeBtn();
        }
        if (this.$startDatesIndex + this.$sectionsCountXDates > this.$allDatesOfVisibleLayers.length) {
            this.$startDatesIndex = this.$allDatesOfVisibleLayers.length - this.$sectionsCountXDates;
        }
        this.draw();
        if (!this.$isPreview) {
            this.initEvents();
        }
    }
    Object.defineProperty(Chart.prototype, "$themeDark", {
        get: function () {
            return this._$themeDark;
        },
        set: function (value) {
            this._$themeDark = value;
            this.$bgColor = this._$themeDark ? '#222f3f' : '#ffffff';
            this.$textColor = this._$themeDark ? '#4c6475' : '#95a4ad';
            this.$linesColor = this._$themeDark ? '#263545' : '#dee6eb';
            this.$rangeBgColor = this._$themeDark ? 'rgba(29, 43, 57, 0.8)' : 'rgba(244, 249, 251, 0.80)';
            this.$rangeEdgeBg = this._$themeDark ? 'rgba(58, 86, 109, 0.92)' : 'rgba(218, 235, 244, 0.91)';
            this.$tooltipBg = this._$themeDark ? '#213242' : '#ffffff';
            this.$canvas.style.background = this.$bgColor;
            this.$container.style.background = this.$bgColor;
            var headerValuesColor = this._$themeDark ? '#ffffff' : '#222222';
            if (this.$divValuesOfDate) {
                this.$divValuesOfDate.style.background = this.$tooltipBg;
                this.$divValuesOfDate.style.color = headerValuesColor;
            }
            if (this.$divDateX) {
                this.$divDateX.style.background = this._$themeDark ? '#374a5b' : '#dee6eb';
            }
            if (this.$rangePreview) {
                this.$rangePreview.$chart.$themeDark = value;
                this.$rangePreview.$elRight.style.background = this.$rangeBgColor;
                this.$rangePreview.$elLeft.style.background = this.$rangeBgColor;
                this.$rangePreview.$elLeftEdge.style.background = this.$rangeEdgeBg;
                this.$rangePreview.$elRightEdge.style.background = this.$rangeEdgeBg;
            }
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Chart.prototype.createThemeBtn = function () {
        var _this = this;
        var label = document.createElement('label');
        label.className = 'zxc-chart-layer-label';
        label.style.background = '#222f3f';
        label.style.color = '#ffffff';
        var span = document.createElement('span');
        span.innerText = 'Dark mode';
        // span.style.background = '#ffffff';
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = this.$themeDark;
        label.appendChild(checkbox);
        label.appendChild(span);
        checkbox.addEventListener('click', function () {
            _this.$themeDark = checkbox.checked;
        });
        return label;
    };
    Chart.prototype.initEvents = function () {
        var _this = this;
        window.onresize = function () {
            var width = _this.$options.width;
            if (_this.$divCanWrapper.offsetWidth < _this.$options.width) {
                width = _this.$divCanWrapper.offsetWidth;
            }
            _this.$canvas.width = width;
            _this.initializeHeightAndWidth(width);
            _this.updateAllStateForRedraw();
            _this.draw();
        };
        this.$canvas.addEventListener("mousedown", function (e) {
            // console.log(e);
            _this.$currentSessionMouseOffset = e.offsetX;
            _this.$dragged = true;
        }, false);
        document.addEventListener("mouseup", function (e) {
            _this.$dragged = false;
        }, false);
        var oldStart = 0;
        this.$canvas.addEventListener("mousemove", function (e) {
            if (_this.$dragged) {
                var curOffsetX = e.offsetX - _this.$currentSessionMouseOffset;
                var $startDatesIndex = Math.floor(Math.abs(_this.$totalMouseOffset) / _this.$deltaXDates);
                if ((($startDatesIndex + _this.$sectionsCountXDates) > _this.$allDatesOfVisibleLayers.length) && curOffsetX <= 0) {
                    _this.draw();
                    return false;
                }
                if ($startDatesIndex === 0 && curOffsetX > 0) {
                    _this.draw();
                    return false;
                }
                _this.$totalMouseOffset += curOffsetX;
                if (_this.$totalMouseOffset > 0) {
                    _this.$totalMouseOffset = 0;
                }
                _this.$startDatesIndex = $startDatesIndex;
                if (_this.$startDatesIndex > _this.$allDatesOfVisibleLayers.length - _this.$sectionsCountXDates) {
                    _this.$startDatesIndex = _this.$allDatesOfVisibleLayers.length - _this.$sectionsCountXDates;
                }
                else {
                    _this.draw();
                }
                _this.$currentSessionMouseOffset = e.offsetX;
                _this.$rangePreview.$middleOffsetLeft = (_this.$startDatesIndex * _this.$rangePreview.$chart.$deltaXDates + _this.$rangePreview.$chart.$marginLeft);
                _this.clearValuesHTML();
            }
            else {
                var parentOffset = _this.$canvas.parentElement.offsetLeft;
                var clientX = e.clientX - _this.$marginLeft - (_this.$deltaXDates / 2);
                var total = _this.$totalMouseOffset - (clientX - parentOffset);
                if (clientX > 0 && clientX < (_this.$canvasViewWidth + parentOffset)) {
                    var $startDatesIndex = Math.floor(Math.abs(total) / _this.$deltaXDates);
                    var x = _this.$totalMouseOffset - total;
                    var left = ($startDatesIndex * _this.$deltaXDates) + _this.$deltaXDates + _this.$marginLeft;
                    left = left + _this.$totalMouseOffset;
                    _this.$divDateX.style.left = (left - (_this.$divDateX.offsetWidth / 2)) + 'px';
                    _this.$divDateX.style.bottom = (_this.$marginBottom + 3) + 'px';
                    _this.$divValuesOfDate.style.left = (left - (_this.$divValuesOfDate.offsetWidth / 2)) + 'px';
                    _this.showValuesForDates($startDatesIndex);
                }
            }
        }, false);
    };
    Chart.prototype.clearValuesHTML = function () {
        this.$divValuesOfDate.innerHTML = '';
    };
    Chart.prototype.showValuesForDates = function (startIndex) {
        this.clearValuesHTML();
        var text;
        var date = this.$allDatesOfVisibleLayers[startIndex];
        if (!date) {
            return false;
        }
        var dateInst = new Date(date);
        text = this.getFormattedDateString(dateInst);
        text = this.$days[dateInst.getDay()] + ', ' + text;
        var header = Dom_1.Dom.crEl('div');
        header.className = 'date-values-div_header';
        header.innerText = text;
        this.$divValuesOfDate.appendChild(header);
        var content = Dom_1.Dom.crEl('div');
        content.className = 'date-values-div_content';
        for (var i = 0; i < this.$layers.length; i++) {
            var values = this.$layers[i].getValuesForDate(date);
            for (var k = 0; k < values.length; k++) {
                var div = Dom_1.Dom.crEl('div');
                div.style.color = values[k].color;
                var divVal = Dom_1.Dom.crEl('div');
                divVal.innerText = String(values[k].value);
                var divName = Dom_1.Dom.crEl('div');
                divName.innerText = values[k].name;
                div.appendChild(divVal);
                div.appendChild(divName);
                content.appendChild(div);
            }
        }
        this.$divValuesOfDate.appendChild(content);
    };
    Chart.prototype.createLegend = function () {
        this.legendContainer = document.createElement('div');
        this.legendContainer.className = 'zxc-chart-container_legend';
        this.$container.appendChild(this.legendContainer);
        for (var k in this.$layers) {
            var div_1 = document.createElement('div');
            div_1.className = 'zxc-chart-container_legend_block';
            for (var j in this.$layers[k].subLayers) {
                div_1.appendChild(this.$layers[k].subLayers[j].getLegendButton());
            }
            this.legendContainer.appendChild(div_1);
        }
        var div = document.createElement('div');
        div.className = 'zxc-chart-container_legend_block';
        div.appendChild(this.createThemeBtn());
        this.legendContainer.appendChild(div);
    };
    Chart.prototype.initializeCanvas = function () {
        var parent;
        if (typeof this.$options.parent === 'object') {
            parent = this.$options.parent;
        }
        else {
            parent = document.querySelector(this.$options.parent);
        }
        if (!parent) {
            throw "Can not get parent element";
        }
        this.$canvas = document.createElement('canvas');
        this.$canvas.width = this.$options.width;
        this.$canvas.height = this.$options.height;
        // this.$canvas.style.background = '#ffffff';
        this.$ctx = this.$canvas.getContext('2d');
        if (this.$isPreview) {
            this.$container = document.createElement('div');
            this.$container.className = 'zxc-chart-container';
            this.$container.appendChild(this.$canvas);
        }
        else {
            this.$divCanWrapper = document.createElement('div');
            this.$divCanWrapper.appendChild(this.$canvas);
            this.$divCanWrapper.className = 'canvas-wrapper';
            this.$container = document.createElement('div');
            this.$container.className = 'zxc-chart-container';
            this.$container.appendChild(this.$divCanWrapper);
            this.$divDateX = document.createElement('div');
            this.$divDateX.className = 'date-div';
            this.$divCanWrapper.appendChild(this.$divDateX);
            this.$divValuesOfDate = document.createElement('div');
            this.$divValuesOfDate.className = 'date-values-div';
            this.$divCanWrapper.appendChild(this.$divValuesOfDate);
        }
        parent.appendChild(this.$container);
    };
    Chart.prototype.initializeHeightAndWidth = function (width, height) {
        this.$canvasHeight = height || this.$options.height;
        this.$canvasWidth = width || this.$options.width;
        this.$canvasViewHeight = this.$canvasHeight - this.$marginTop - this.$marginBottom;
        this.$canvasViewWidth = this.$canvasWidth - this.$marginLeft - this.$marginRight;
    };
    Chart.prototype.initializeDeltas = function () {
        this.$deltaYValues = this.$canvasViewHeight / this.$sectionsCountYValues;
        this.$deltaXDates = this.$canvasViewWidth / this.$sectionsCountXDates;
    };
    Chart.prototype.initializeLayers = function () {
        for (var i = 0; i < this.$options.data.length; i++) {
            this.$layers.push(new Layer_1.Layer(i, this.$options.data[i], this));
        }
    };
    Chart.prototype.initializeMinMaxValues = function () {
        var minimums = [], maximums = [];
        for (var i = 0; i < this.$layers.length; i++) {
            var layer = this.$layers[i];
            minimums.push(layer.min);
            maximums.push(layer.max);
        }
        this.$minYValue = Math.min.apply(null, minimums);
        this.$maxYValue = Math.max.apply(null, maximums);
    };
    Chart.prototype.initializeDates = function () {
        this.$allDatesOfVisibleLayers = [];
        for (var k in this.$layers) {
            var arrDates = this.$layers[k].getDatesForVisibleLayers();
            this.$allDatesOfVisibleLayers = this.$allDatesOfVisibleLayers.concat(arrDates);
        }
        this.cleanDates();
        this.sortDates();
    };
    Chart.prototype.cleanDates = function () {
        this.$allDatesOfVisibleLayers = this.$allDatesOfVisibleLayers.filter(function (value, index, that) {
            return that.indexOf(value) === index;
        });
    };
    Chart.prototype.sortDates = function () {
        this.$allDatesOfVisibleLayers.sort(function (a, b) { return a - b; });
    };
    Chart.prototype.initializeYValues = function () {
        this.$sectionsYValues = [];
        for (var i = 0; i < this.$sectionsCountYValues; i++) {
            var valuePerGrid = this.$maxYValue / this.$sectionsCountYValues;
            this.$sectionsYValues.push(Math.floor(valuePerGrid * i));
        }
        this.$sectionsYValues.sort(function (a, b) { return b - a; });
    };
    Chart.prototype.drawXDateLines = function () {
        var x;
        var y;
        if (this.$debug) {
            this.$ctx.lineWidth = 1;
            this.$ctx.strokeStyle = 'red';
            this.$ctx.setLineDash([3, 7]);
            this.$ctx.beginPath();
        }
        var count = this.$sectionsCountXDates + this.$startDatesIndex;
        var dateTextPixelStep = 15;
        var dateTextStep = Math.floor(this.$sectionsCountXDates / dateTextPixelStep);
        if (dateTextStep <= 1) {
            dateTextStep = 2;
        }
        for (var i = this.$startDatesIndex; i < count; i++) {
            if (i % dateTextStep === 1) {
                if (i === 0) {
                    x = this.$deltaXDates + this.$marginLeft;
                }
                else {
                    x = this.$deltaXDates * (i + 1) + this.$marginLeft;
                }
                y = this.$canvasHeight - this.$marginBottom;
                if (this.$debug) {
                    this.$ctx.moveTo(x, this.$marginTop);
                    this.$ctx.lineTo(x, y);
                    this.$ctx.stroke();
                }
                if (this.$allDatesOfVisibleLayers[i]) {
                    this.drawXDates(new Date(this.$allDatesOfVisibleLayers[i]), x - (this.$fontSize + 5), y + 20);
                }
            }
        }
    };
    Chart.prototype.drawXDateBottomLine = function () {
        this.$ctx.lineWidth = 3;
        this.$ctx.strokeStyle = this.$linesColor;
        this.$ctx.beginPath();
        var x = this.$marginLeft;
        var y = this.$canvasHeight - this.$marginBottom;
        this.$ctx.moveTo(x, y);
        x = this.$canvasWidth - this.$marginRight;
        this.$ctx.lineTo(x, y);
        this.$ctx.stroke();
    };
    Chart.prototype.getFormattedDateString = function (date) {
        var months = {
            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'Aug',
            8: 'Sept',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec'
        };
        return months[date.getMonth()] + ' ' + date.getDate();
    };
    Chart.prototype.drawXDates = function (date, x, y) {
        this.$ctx.fillStyle = this.$textColor;
        this.$ctx.font = this.$fontSize + "px " + this.$fontStyle;
        this.$ctx.fillText(this.getFormattedDateString(date), x, y);
    };
    Chart.prototype.drawYValuesLines = function () {
        // this.drawLeftVerticalLine();
        var x;
        var y;
        this.$ctx.lineWidth = 2;
        this.$ctx.strokeStyle = this.$linesColor;
        this.$ctx.beginPath();
        x = this.$marginLeft;
        y = this.$marginTop;
        this.drawYLine(x, y, this.$maxYValue);
        for (var i = 0; i < this.$sectionsCountYValues; i++) {
            x = this.$marginLeft;
            if (i === 0) {
                y = this.$marginTop + this.$deltaYValues;
            }
            else {
                y = this.$marginTop + this.$deltaYValues * i + this.$deltaYValues;
            }
            this.drawYLine(x, y, this.$sectionsYValues[i]);
        }
    };
    Chart.prototype.drawYLine = function (x, y, date) {
        this.$ctx.moveTo(x, y);
        x = this.$canvasViewWidth + this.$marginLeft;
        this.$ctx.lineTo(x, y);
        this.$ctx.stroke();
        this.drawYValues(date, x, y);
    };
    Chart.prototype.drawLeftVerticalLine = function () {
        this.$ctx.lineWidth = 3;
        this.$ctx.strokeStyle = this.$linesColor;
        this.$ctx.beginPath();
        var x = this.$marginLeft;
        var y = this.$marginTop;
        this.$ctx.moveTo(x, y);
        y = y + this.$canvasViewHeight;
        this.$ctx.lineTo(x, y);
        this.$ctx.stroke();
    };
    Chart.prototype.drawYValues = function (value, x, y) {
        this.$ctx.fillStyle = this.$textColor;
        this.$ctx.font = this.$fontSize + "px " + this.$fontStyle;
        this.$ctx.fillText(String(value), x - x + 55, y - 5);
    };
    Chart.prototype.draw = function () {
        this.initializeDeltas();
        this.$ctx.clearRect(0, 0, this.$canvasWidth, this.$canvasHeight);
        if (!this.$isPreview) {
            // this.drawXDateBottomLine();
            this.drawYValuesLines();
        }
        var offset = this.$startDatesIndex * this.$deltaXDates;
        var quickMouseMoveFix = 50;
        if (Math.abs(this.$totalMouseOffset) + quickMouseMoveFix < (offset) - this.$deltaXDates) {
            this.$totalMouseOffset = -offset;
        }
        this.$ctx.save();
        this.$ctx.translate(this.$totalMouseOffset, 0);
        if (!this.$isPreview) {
            this.drawXDateLines();
        }
        this.drawLayers();
        this.$ctx.restore();
        this.$ctx.clearRect(0, 0, this.$marginLeft, this.$canvasHeight);
        this.$ctx.clearRect(this.$canvasWidth - this.$marginRight, 0, this.$marginRight, this.$canvasHeight);
    };
    Chart.prototype.drawLayers = function () {
        this.$ctx.beginPath();
        for (var i = 0; i < this.$layers.length; i++) {
            var oldDate = null;
            for (var d = (this.$startDatesIndex - 1); d < this.$startDatesIndex + this.$sectionsCountXDates + 1; d++) {
                var date = this.$allDatesOfVisibleLayers[d];
                this.$layers[i].draw(date, oldDate, d);
                oldDate = date;
            }
        }
    };
    Chart.prototype.drawRange = function (startIndex, sectionCount) {
        this.$startDatesIndex = startIndex;
        this.$sectionsCountXDates = sectionCount;
        this.initializeDeltas();
        this.$totalMouseOffset = -this.$startDatesIndex * this.$deltaXDates;
        this.draw();
    };
    Chart.prototype.createPreviewCanvas = function () {
        var options = __assign({}, this.$options);
        options.width = this.$canvas.width;
        if (this.$rangePreview) {
            this.$rangePreview.reInit(options);
        }
        else {
            this.$rangePreview = new RangePreview_1.RangePreview(options, this);
            var html = this.$rangePreview.getHTML();
            this.$container.appendChild(html);
            this.$rangePreview.initializeDivParams();
        }
        this.$rangePreview.$chart.$themeDark = this.$themeDark;
    };
    Chart.prototype.updateAllStateForRedraw = function () {
        this.initializeMinMaxValues();
        this.initializeDates();
        this.initializeYValues();
        if (this.$startDatesIndex + this.$sectionsCountXDates > this.$allDatesOfVisibleLayers.length) {
            this.$startDatesIndex = 0;
            this.$sectionsCountXDates = 30;
            this.$totalMouseOffset = 0;
        }
        this.createPreviewCanvas();
    };
    Chart.prototype.destroy = function () {
        this.$canvas.remove();
    };
    return Chart;
}());
exports.Chart = Chart;


/***/ }),

/***/ "./src/Classes/Chart/Dom.ts":
/*!**********************************!*\
  !*** ./src/Classes/Chart/Dom.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Dom = /** @class */ (function () {
    function Dom() {
    }
    Dom.crEl = function (name) {
        return document.createElement(name);
    };
    Dom.addEv = function (el, evName, func) {
        el.addEventListener(evName, func);
    };
    return Dom;
}());
exports.Dom = Dom;


/***/ }),

/***/ "./src/Classes/Chart/Layer.ts":
/*!************************************!*\
  !*** ./src/Classes/Chart/Layer.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SubLayer_1 = __webpack_require__(/*! ./SubLayer */ "./src/Classes/Chart/SubLayer.ts");
var Layer = /** @class */ (function () {
    function Layer(id, options, chart) {
        this.subLayers = [];
        this.chart = chart;
        this.id = id;
        this.options = options;
        if (!this.options.visibility) {
            this.options.visibility = {};
        }
        var dates = this.getDates();
        // let minimums = [], maximums = [];
        for (var i = 0; i < this.options.columns.length; i++) {
            var tmpName = this.options.columns[i][0];
            if (tmpName !== 'x') {
                if (!this.options.colors[tmpName]) {
                    throw 'options.colors ' + tmpName + ' not found';
                }
                if (!this.options.names[tmpName]) {
                    throw 'options.names ' + tmpName + ' not found';
                }
                if (!this.options.types[tmpName]) {
                    throw 'options.types ' + tmpName + ' not found';
                }
                var yValues = this.options.columns[i].slice();
                yValues.splice(0, 1);
                var min = Math.min.apply(null, yValues);
                var max = Math.max.apply(null, yValues);
                var subDates = {};
                for (var j = 0; j < dates.length; j++) {
                    subDates[dates[j]] = yValues[j];
                }
                var visible = true;
                if (this.options.visibility[this.options.names[tmpName]] !== undefined) {
                    visible = this.options.visibility[this.options.names[tmpName]];
                }
                var subLayerOpitions = {
                    color: this.options.colors[tmpName],
                    name: this.options.names[tmpName],
                    type: this.options.types[tmpName],
                    dates: subDates,
                    visible: visible
                };
                var subLayer = new SubLayer_1.SubLayer(subLayerOpitions, this.chart, min, max, this);
                this.subLayers.push(subLayer);
            }
        }
        // this._min = Math.min.apply(null, minimums);
        // this._max = Math.max.apply(null, maximums);
    }
    Object.defineProperty(Layer.prototype, "max", {
        get: function () {
            var max = [];
            for (var i = 0; i < this.subLayers.length; i++) {
                if (this.subLayers[i].visible) {
                    max.push(this.subLayers[i].max);
                }
            }
            this._max = Math.max.apply(null, max);
            max = null;
            return this._max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "min", {
        get: function () {
            var min = [];
            for (var i = 0; i < this.subLayers.length; i++) {
                if (this.subLayers[i].visible) {
                    min.push(this.subLayers[i].min);
                }
            }
            this._min = Math.min.apply(null, min);
            min = null;
            return this._min;
        },
        enumerable: true,
        configurable: true
    });
    Layer.prototype.getDates = function () {
        for (var i = 0; i < this.options.columns.length; i++) {
            if (this.options.columns[i][0] === 'x') {
                this.dateCollumnIndexInColumns = i;
                var arr = this.options.columns[i].slice();
                arr.splice(0, 1);
                return arr;
            }
        }
        return [];
    };
    Layer.prototype.getDatesForVisibleLayers = function () {
        var returnDates = false;
        for (var k = 0; k < this.subLayers.length; k++) {
            if (this.subLayers[k].visible) {
                returnDates = true;
                break;
            }
        }
        if (returnDates) {
            for (var i = 0; i < this.options.columns.length; i++) {
                if (this.options.columns[i][0] === 'x') {
                    this.dateCollumnIndexInColumns = i;
                    var arr = this.options.columns[i].slice();
                    arr.splice(0, 1);
                    return arr;
                }
            }
        }
        return [];
    };
    Layer.prototype.draw = function (date, oldDate, dateIndex) {
        for (var i = 0; i < this.subLayers.length; i++) {
            if (this.subLayers[i].visible === true) {
                this.subLayers[i].draw(date, oldDate, dateIndex);
            }
        }
    };
    Layer.prototype.getValuesForDate = function (date) {
        var result = [];
        for (var i = 0; i < this.subLayers.length; i++) {
            if (this.subLayers[i].visible && this.subLayers[i].dates[date]) {
                result.push({
                    name: this.subLayers[i].name,
                    value: this.subLayers[i].dates[date],
                    color: this.subLayers[i].color
                });
            }
        }
        return result;
    };
    return Layer;
}());
exports.Layer = Layer;


/***/ }),

/***/ "./src/Classes/Chart/RangePreview.ts":
/*!*******************************************!*\
  !*** ./src/Classes/Chart/RangePreview.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Chart_1 = __webpack_require__(/*! ./Chart */ "./src/Classes/Chart/Chart.ts");
var Dom_1 = __webpack_require__(/*! ./Dom */ "./src/Classes/Chart/Dom.ts");
var RangePreview = /** @class */ (function () {
    function RangePreview(options, parentChart) {
        this.$draggedMain = false;
        this.$draggedLeftEdge = false;
        this.$draggedRightEdge = false;
        this.$dragPositionStart = 0;
        this.$minWidth = 30;
        this.$parentChart = parentChart;
        this.$options = options;
        this.$options.showPreview = false;
        this.$options.isPreview = true;
        this.$options.height = 150;
        this.createHTML();
        this.$options.parent = this.$elPreview;
        this.$chart = new Chart_1.Chart(this.$options);
        this.$chart.$startDatesIndex = 0;
        this.$chart.$sectionsCountXDates = parentChart.$allDatesOfVisibleLayers.length;
        this.$chart.$sectionsCountYValues = 2;
        this.$chart.$totalMouseOffset = 0;
        this.$chart.draw();
    }
    Object.defineProperty(RangePreview.prototype, "$middleWidth", {
        get: function () {
            return this._$middleWidth;
        },
        set: function (value) {
            this._$middleWidth = value;
            this.$elMiddle.style.width = this._$middleWidth + 'px';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangePreview.prototype, "$middleOffsetLeft", {
        get: function () {
            return this._$middleOffsetLeft;
        },
        set: function (value) {
            this._$middleOffsetLeft = value;
            this.$elMiddle.style.left = this._$middleOffsetLeft + 'px';
            this.$elLeft.style.left = this.$chart.$marginLeft + 'px';
            this.$elLeft.style.width = this._$middleOffsetLeft - this.$chart.$marginLeft + 'px';
            this.$elRight.style.right = this.$chart.$marginRight + 'px';
            var width = this.$elWrapper.offsetWidth
                - this.$chart.$marginRight
                - this._$middleOffsetLeft
                - this.$elMiddle.offsetWidth;
            this.$elRight.style.width = width + 'px';
        },
        enumerable: true,
        configurable: true
    });
    RangePreview.prototype.createHTML = function () {
        this.$elPreview = Dom_1.Dom.crEl('div');
        this.$elPreview.style.height = this.$options.height + 'px';
        this.$elPreview.className = 'zxc-chart-container_preview';
        this.$elPreview.style.width = this.$options.width + 'px';
        this.$elWrapper = Dom_1.Dom.crEl('div');
        this.$elWrapper.className = 'wrapper';
        this.$elLeft = Dom_1.Dom.crEl('div');
        this.$elLeft.className = 'box';
        this.$elMiddle = Dom_1.Dom.crEl('div');
        this.$elMiddle.className = 'box middle';
        this.$elRight = Dom_1.Dom.crEl('div');
        this.$elRight.className = 'box right-box';
        this.$elLeftEdge = Dom_1.Dom.crEl('div');
        this.$elLeftEdge.className = 'edges edges-left';
        this.$elRightEdge = Dom_1.Dom.crEl('div');
        this.$elRightEdge.className = 'edges edges-right';
        this.$elWrapper.appendChild(this.$elLeft);
        this.$elWrapper.appendChild(this.$elMiddle);
        this.$elWrapper.appendChild(this.$elRight);
        this.$elMiddle.appendChild(this.$elLeftEdge);
        this.$elMiddle.appendChild(this.$elRightEdge);
        this.$elPreview.appendChild(this.$elWrapper);
    };
    RangePreview.prototype.getHTML = function () {
        return this.$elPreview;
    };
    RangePreview.prototype.initializeDivParams = function () {
        this.$middleWidth = this.$parentChart.$sectionsCountXDates * this.$chart.$deltaXDates;
        this.$middleOffsetLeft = (this.$parentChart.$startDatesIndex * this.$chart.$deltaXDates) + this.$chart.$marginLeft;
        this.initializeEvents(); //rm before init ev
    };
    RangePreview.prototype.initializeEvents = function () {
        var _this = this;
        this.$elMiddle.addEventListener('mousedown', function (e) {
            e.stopPropagation();
            _this.$draggedMain = true;
            _this.$dragPositionStart = e.clientX;
        });
        this.$elLeftEdge.addEventListener('mousedown', function (e) {
            e.stopPropagation();
            _this.$draggedLeftEdge = true;
            _this.$dragPositionStart = e.clientX;
        });
        this.$elRightEdge.addEventListener('mousedown', function (e) {
            e.stopPropagation();
            _this.$draggedRightEdge = true;
            _this.$dragPositionStart = e.clientX;
        });
        var moveHandlers = function (e) {
            if (_this.$draggedMain) {
                var pos1 = e.clientX - _this.$dragPositionStart;
                var pos3 = _this.$elMiddle.offsetLeft + pos1;
                if (pos3 + _this.$elMiddle.offsetWidth > _this.$elWrapper.offsetWidth - _this.$chart.$marginRight) {
                    _this.$middleOffsetLeft = _this.$elWrapper.offsetWidth - _this.$elMiddle.offsetWidth - _this.$chart.$marginRight;
                    return false;
                }
                if (pos3 < _this.$chart.$marginLeft) {
                    _this.$middleOffsetLeft = _this.$chart.$marginLeft;
                    return false;
                }
                _this.$middleOffsetLeft = pos3;
                _this.$dragPositionStart = e.clientX;
            }
            if (_this.$draggedLeftEdge) {
                var pos1 = e.clientX - _this.$dragPositionStart;
                var width = (_this.$elMiddle.offsetWidth - pos1);
                var pos3 = _this.$elMiddle.offsetLeft + pos1;
                if (width < _this.$minWidth) {
                    _this.$middleWidth = _this.$minWidth;
                    return false;
                }
                if (pos3 < _this.$chart.$marginLeft) {
                    _this.$middleOffsetLeft = _this.$chart.$marginLeft;
                    return false;
                }
                _this.$middleWidth = width;
                _this.$middleOffsetLeft = pos3;
                _this.$dragPositionStart = e.clientX;
            }
            if (_this.$draggedRightEdge) {
                var pos1 = e.clientX - _this.$dragPositionStart;
                var pos3 = _this.$elMiddle.offsetWidth + pos1;
                if (pos3 + _this.$elMiddle.offsetLeft + _this.$chart.$marginRight > _this.$elWrapper.offsetWidth) {
                    _this.$middleWidth = _this.$elWrapper.offsetWidth - _this.$elMiddle.offsetLeft - _this.$chart.$marginRight;
                    return false;
                }
                if (pos3 < _this.$minWidth) {
                    _this.$middleWidth = _this.$minWidth;
                    return false;
                }
                _this.$middleWidth = pos3;
                _this.$elRight.style.width = (_this.$elWrapper.offsetWidth - parseInt(_this.$elMiddle.style.left)) - (_this.$elMiddle.offsetWidth + _this.$chart.$marginRight) + 'px';
                _this.$dragPositionStart = e.clientX;
            }
            if (_this.$draggedMain || _this.$draggedLeftEdge || _this.$draggedRightEdge) {
                _this.drawRange();
            }
        };
        this.$elWrapper.addEventListener('mousemove', moveHandlers);
        document.addEventListener('mouseup', function () {
            _this.$draggedMain = false;
            _this.$draggedLeftEdge = false;
            _this.$draggedRightEdge = false;
            _this.$dragPositionStart = 0;
        });
    };
    RangePreview.prototype.drawRange = function () {
        if (this.$middleOffsetLeft) {
            var startIndex = Math.floor((this.$middleOffsetLeft - this.$chart.$marginLeft) / this.$chart.$deltaXDates);
            var sectionCount = Math.floor(this.$elMiddle.offsetWidth / this.$chart.$deltaXDates);
            this.$parentChart.drawRange(startIndex, sectionCount);
        }
    };
    RangePreview.prototype.reInit = function (options, parentChart) {
        this.$chart.destroy();
        this.$chart = null;
        this.$elPreview.style.width = options.width + 'px';
        this.$parentChart = parentChart || this.$parentChart;
        this.$options = options;
        this.$options.showPreview = false;
        this.$options.isPreview = true;
        this.$options.height = 150;
        this.$options.parent = this.$elPreview;
        this.$chart = new Chart_1.Chart(this.$options);
        this.$chart.$startDatesIndex = 0;
        this.$chart.$sectionsCountXDates = this.$parentChart.$allDatesOfVisibleLayers.length;
        this.$chart.$sectionsCountYValues = 2;
        this.$chart.$totalMouseOffset = 0;
        this.$chart.draw();
        this.initializeDivParams();
    };
    return RangePreview;
}());
exports.RangePreview = RangePreview;


/***/ }),

/***/ "./src/Classes/Chart/SubLayer.ts":
/*!***************************************!*\
  !*** ./src/Classes/Chart/SubLayer.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SubLayer = /** @class */ (function () {
    function SubLayer(options, chart, min, max, parentLayer) {
        this.visible = true;
        this.color = options.color;
        this.dates = options.dates;
        this.type = options.type;
        this.name = options.name;
        if (options.visible !== undefined) {
            this.visible = options.visible;
        }
        this.chart = chart;
        this._min = min;
        this._max = max;
        this.parentLayer = parentLayer;
    }
    Object.defineProperty(SubLayer.prototype, "min", {
        get: function () {
            return this._min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubLayer.prototype, "max", {
        get: function () {
            return this._max;
        },
        enumerable: true,
        configurable: true
    });
    SubLayer.prototype.draw = function (date, oldDate, dateIndex) {
        if (this.dates[date]) {
            this.chart.$ctx.beginPath();
            var coords = this.getCoordsForDate(date, dateIndex);
            // if(!this.chart.$isPreview){
            //     this.chart.$ctx.arc(coords.x, coords.y, 5, 0, 2 * Math.PI, false);
            //     coords = null;
            //     this.chart.$ctx.fillStyle = this.color;
            //     this.chart.$ctx.fill();
            //     this.chart.$ctx.closePath();
            // }else{
            this.chart.$ctx.moveTo(coords.x, coords.y);
            // }
            if (oldDate) {
                if (this.dates[oldDate]) {
                    var dI = dateIndex - 1;
                    var coords_1 = this.getCoordsForDate(oldDate, dI);
                    this.chart.$ctx.lineWidth = 1;
                    this.chart.$ctx.strokeStyle = this.color;
                    this.chart.$ctx.lineTo(coords_1.x, coords_1.y);
                    coords_1 = null;
                    this.chart.$ctx.stroke();
                }
            }
            this.chart.$ctx.closePath();
        }
    };
    SubLayer.prototype.getCoordsForDate = function (date, dateIndex) {
        var value = this.dates[date];
        var percent = value / this.chart.$maxYValue * 100;
        var height = this.chart.$canvasViewHeight;
        var y = height / 100 * percent;
        y = Math.round(height - y + this.chart.$marginTop);
        var x = dateIndex * this.chart.$deltaXDates + this.chart.$marginLeft + this.chart.$deltaXDates;
        x = Math.round(x);
        return { x: x, y: y };
    };
    /*public getLegendButton(): Element {
        let label = document.createElement('label');
        label.className = 'zxc-chart-container_label_container zxc-chart-container_label_container_label_element';
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = this.visible;
        label.innerText = this.name;
        label.appendChild(checkbox);
        let span = document.createElement('span');
        span.className = 'zxc-chart-container_label_container_checkmark zxc-chart-container_label_container_checkmark_span';
        span.style.background = this.color;
        label.appendChild(span);
        span.addEventListener('click', () => {
            this.visible = !this.visible;
            this.parentLayer.options.visibility[this.name] = this.visible;
            this.chart.updateAllStateForRedraw();
            this.chart.draw();
        });
        return label;
    }*/
    SubLayer.prototype.getLegendButton = function () {
        var _this = this;
        var label = document.createElement('label');
        label.className = 'zxc-chart-layer-label';
        label.style.background = this.color;
        var span = document.createElement('span');
        span.innerText = this.name;
        span.style.background = this.color;
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = this.visible;
        label.appendChild(checkbox);
        label.appendChild(span);
        checkbox.addEventListener('click', function () {
            _this.visible = !_this.visible;
            _this.parentLayer.options.visibility[_this.name] = _this.visible;
            _this.chart.updateAllStateForRedraw();
            _this.chart.draw();
        });
        return label;
    };
    return SubLayer;
}());
exports.SubLayer = SubLayer;


/***/ }),

/***/ "./src/Classes/index.ts":
/*!******************************!*\
  !*** ./src/Classes/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./Chart/Chart */ "./src/Classes/Chart/Chart.ts"));


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// import { data } from '../test_data/chart_data'
//
// declare global {
//     interface Window { chart: any; }
// }
//
//
// let options = {width: 1400, height: 400, data: data, parent: 'body', showPreview:true/*, isPreview: false*/};
// // let options = {width: 500, height: 400, data: data, parentId: 'body'};
// let chart = new ZXC.Chart(options);
//
// window.chart = window.chart || chart;
__export(__webpack_require__(/*! ./Classes/index */ "./src/Classes/index.ts"));


/***/ })

/******/ });
});
//# sourceMappingURL=bundle.js.map