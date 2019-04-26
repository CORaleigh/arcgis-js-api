'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var browserSpecificTransitionEndEventName;
var browserSpecificAnimationEndEventName;
var determineBrowserSpecificStyleNames = function (element) {
    if ('WebkitTransition' in element.style) {
        browserSpecificTransitionEndEventName = 'webkitTransitionEnd';
        browserSpecificAnimationEndEventName = 'webkitAnimationEnd';
    }
    else if ('transition' in element.style) {
        browserSpecificTransitionEndEventName = 'transitionend';
        browserSpecificAnimationEndEventName = 'animationend';
    }
    else {
        throw new Error('Your browser is not supported!');
    }
};
var init = function (testElement) {
    if (!browserSpecificTransitionEndEventName) {
        determineBrowserSpecificStyleNames(testElement);
    }
};
var createEnterCssTransition = function (cssClassBase, activeClass) {
    if (activeClass === void 0) { activeClass = cssClassBase + "-active"; }
    return function (element) {
        init(element);
        var finished = false;
        var transitionEnd = function (evt) {
            if (!finished) {
                finished = true;
                element.removeEventListener(browserSpecificTransitionEndEventName, transitionEnd);
                element.removeEventListener(browserSpecificAnimationEndEventName, transitionEnd);
                element.classList.remove(cssClassBase);
                element.classList.remove(activeClass);
            }
        };
        element.classList.add(cssClassBase);
        element.addEventListener(browserSpecificTransitionEndEventName, transitionEnd);
        element.addEventListener(browserSpecificAnimationEndEventName, transitionEnd);
        requestAnimationFrame(function () {
            element.classList.add(activeClass);
        });
    };
};
var createExitCssTransition = function (cssClassBase, activeClass) {
    if (activeClass === void 0) { activeClass = cssClassBase + "-active"; }
    return function (element, removeElement) {
        init(element);
        var finished = false;
        var transitionEnd = function (evt) {
            if (!finished) {
                finished = true;
                element.removeEventListener(browserSpecificTransitionEndEventName, transitionEnd);
                element.removeEventListener(browserSpecificAnimationEndEventName, transitionEnd);
                removeElement();
            }
        };
        element.classList.add(cssClassBase);
        element.addEventListener(browserSpecificTransitionEndEventName, transitionEnd);
        element.addEventListener(browserSpecificAnimationEndEventName, transitionEnd);
        requestAnimationFrame(function () {
            element.classList.add(activeClass);
        });
    };
};

exports.createEnterCssTransition = createEnterCssTransition;
exports.createExitCssTransition = createExitCssTransition;
