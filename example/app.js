/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./example/src/app.js":
/*!****************************!*\
  !*** ./example/src/app.js ***!
  \****************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_cli__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/cli */ \"./src/cli.js\");\n\r\n\r\nconst snakegame = () => {\r\n    console.log('started snake game');\r\n}\r\n\r\nconst cli = (0,_src_cli__WEBPACK_IMPORTED_MODULE_0__.createCli)(\r\n    {\r\n        'games' : {\r\n            'snake.exe' : snakegame\r\n        },\r\n        'about.txt' : 'Hi there,\\nMy name is Mats Sommervold'\r\n    },\r\n    document.querySelector('#cli-root')\r\n);\n\n//# sourceURL=webpack://simple-cli/./example/src/app.js?");

/***/ }),

/***/ "./src/cli.js":
/*!********************!*\
  !*** ./src/cli.js ***!
  \********************/
/*! namespace exports */
/*! export createCli [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createCli\": () => /* binding */ createCli\n/* harmony export */ });\n/* harmony import */ var _commands__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commands */ \"./src/commands.js\");\n\r\n\r\nconst state = {\r\n    fs: {},\r\n    path: ['root'],\r\n    root: '',\r\n    output: [\r\n        {}\r\n    ]\r\n}\r\n\r\nconst interact = (command) => {\r\n    state = _commands__WEBPACK_IMPORTED_MODULE_0__.commands[command](state);\r\n    return state;\r\n}\r\n\r\nconst createCli = (structure, root) => {\r\n    state.fs = typeof structure == 'object' ? structure : state.fs;\r\n    if(root instanceof Element) state.root = root;\r\n    else throw new Error('No root element provided');\r\n    return interact;\r\n}\n\n//# sourceURL=webpack://simple-cli/./src/cli.js?");

/***/ }),

/***/ "./src/commands.js":
/*!*************************!*\
  !*** ./src/commands.js ***!
  \*************************/
/*! namespace exports */
/*! export commands [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"commands\": () => /* binding */ commands\n/* harmony export */ });\nconst commands = {\r\n    help: {\r\n        desc: 'Lists all available commands and their use',\r\n        action: (state) => {\r\n            return state;\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://simple-cli/./src/commands.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./example/src/app.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;