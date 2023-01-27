"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.p5Events = void 0;
var react_1 = require("react");
var p5_1 = require("p5");
// NOTE: assigning p5 to window because someone can need it globally to use in others libraries
if (typeof window !== "undefined") {
    window.p5 = p5_1["default"];
}
exports.p5Events = [
    "draw",
    "windowResized",
    "preload",
    "mouseClicked",
    "doubleClicked",
    "mouseMoved",
    "mousePressed",
    "mouseWheel",
    "mouseDragged",
    "mouseReleased",
    "keyPressed",
    "keyReleased",
    "keyTyped",
    "touchStarted",
    "touchMoved",
    "touchEnded",
    "deviceMoved",
    "deviceTurned",
    "deviceShaken",
];
var Sketch = /** @class */ (function (_super) {
    __extends(Sketch, _super);
    function Sketch(props) {
        var _this = _super.call(this, props) || this;
        _this.canvasParentRef = (0, react_1.createRef)();
        return _this;
    }
    Sketch.prototype.componentDidMount = function () {
        var _this = this;
        this.sketch = new p5_1["default"](function (p) {
            p.setup = function () {
                _this.props.setup(p, _this.canvasParentRef.current);
            };
            exports.p5Events.forEach(function (event) {
                if (_this.props[event]) {
                    p[event] = function () {
                        var _a;
                        var rest = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            rest[_i] = arguments[_i];
                        }
                        (_a = _this.props)[event].apply(_a, __spreadArray([p], rest, false));
                    };
                }
            });
        });
    };
    Sketch.prototype.shouldComponentUpdate = function () {
        return false;
    };
    Sketch.prototype.componentWillUnmount = function () {
        this.sketch.remove();
    };
    Sketch.prototype.render = function () {
        return (<div ref={this.canvasParentRef} className={this.props.className || "react-p5"} data-testid="react-p5"/>);
    };
    return Sketch;
}(react_1.Component));
exports["default"] = Sketch;
