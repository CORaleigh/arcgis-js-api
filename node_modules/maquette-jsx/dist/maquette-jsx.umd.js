(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.maquetteCssTransitions = {})));
}(this, (function (exports) { 'use strict';

var toTextVNode = function (data) {
    return {
        vnodeSelector: '',
        properties: undefined,
        children: undefined,
        text: data.toString(),
        domNode: null
    };
};
var appendChildren = function (insertions, main) {
    for (var i = 0, length_1 = insertions.length; i < length_1; i++) {
        var item = insertions[i];
        if (Array.isArray(item)) {
            appendChildren(item, main);
        }
        else {
            if (item !== null && item !== undefined && item !== false) {
                if (!item.hasOwnProperty('vnodeSelector')) {
                    item = toTextVNode(item);
                }
                main.push(item);
            }
        }
    }
};
var jsx = function (tagName, properties) {
    var childNodes = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        childNodes[_i - 2] = arguments[_i];
    }
    if (childNodes.length === 1 && typeof childNodes[0] === 'string') {
        return {
            vnodeSelector: tagName,
            properties: properties || undefined,
            children: undefined,
            text: childNodes[0],
            domNode: null
        };
    }
    var children = [];
    appendChildren(childNodes, children);
    return {
        vnodeSelector: tagName,
        properties: properties || undefined,
        children: children,
        text: undefined,
        domNode: null
    };
};
/**
 * Call this function before executing any JSX formatted code. This function makes the window.jsx function available.
 */
var enableGlobalJsx = function () {
    window.jsx = jsx;
};

exports.jsx = jsx;
exports.enableGlobalJsx = enableGlobalJsx;

Object.defineProperty(exports, '__esModule', { value: true });

})));
