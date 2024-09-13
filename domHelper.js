const domHelper = {

$: (selector) => document.querySelector(selector),

$$: (selector) => document.querySelectorAll(selector),

on: (element, event, handler) => element.addEventListener(event, handler),

on$: (selector, event, handler) => document.querySelector(selector).addEventListener(event, handler),

onAll: (selector, event, handler) => document.querySelectorAll(selector).forEach(el => el.addEventListener(event, handler)),

};

export default domHelper;
