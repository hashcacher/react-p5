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
exports.__esModule = true;
var react_1 = require("react");
var server_1 = require("react-dom/server");
var react_2 = require("@testing-library/react");
var index_1 = require("./index");
var reactP5TestId = 'react-p5';
var MockComponent = null;
var canvas = null;
beforeEach(function () {
    MockComponent = function (props) {
        var setup = function (p, canvasParentRef) {
            canvas = p.createCanvas(500, 500).parent(canvasParentRef);
            p.background(0);
        };
        return (react_1["default"].createElement(index_1["default"], __assign({ setup: setup }, props)));
    };
});
describe('react-p5', function () {
    it('Should export globally p5 instance', function () {
        expect(window.p5).toBeDefined();
    });
    it('Should render correct in SSR mode when window is not-defined', function () {
        var clonedWindow = global.window;
        delete global.window;
        var StringComponent = server_1["default"].renderToString(react_1["default"].createElement(MockComponent, null));
        var StaticComponent = server_1["default"].renderToStaticMarkup(react_1["default"].createElement(MockComponent, null));
        global.window = clonedWindow;
        expect(StringComponent).toMatch("<div class=\"".concat(reactP5TestId, "\" data-testid=\"").concat(reactP5TestId, "\" data-reactroot=\"\"></div"));
        expect(StaticComponent).toMatch("<div class=\"".concat(reactP5TestId, "\" data-testid=\"").concat(reactP5TestId, "\"></div"));
        expect(canvas).toBeNull();
    });
    it('Should render correct in SSR mode when window is defined', function () {
        var StringComponent = server_1["default"].renderToString(react_1["default"].createElement(MockComponent, null));
        var StaticComponent = server_1["default"].renderToStaticMarkup(react_1["default"].createElement(MockComponent, null));
        expect(StringComponent).toMatch("<div class=\"".concat(reactP5TestId, "\" data-testid=\"").concat(reactP5TestId, "\" data-reactroot=\"\"></div"));
        expect(StaticComponent).toMatch("<div class=\"".concat(reactP5TestId, "\" data-testid=\"").concat(reactP5TestId, "\"></div"));
        expect(canvas).toBeNull();
    });
    it('Should call setup function on component mount with corresponding arguments', function () {
        var setup = jest.fn();
        (0, react_2.render)(react_1["default"].createElement(MockComponent, { setup: setup }));
        expect(setup).toBeCalledTimes(1);
        expect(setup).toBeCalledWith(expect.any(Object), expect.any(Element));
    });
    it('Should render MockComponent without errors', function () {
        var getByTestId = (0, react_2.render)(react_1["default"].createElement(MockComponent, null)).getByTestId;
        expect(getByTestId(reactP5TestId)).toBeDefined();
        expect(canvas).not.toBeNull();
    });
});
