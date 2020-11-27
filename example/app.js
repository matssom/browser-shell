/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./example/src/app.js":
/*!****************************!*\
  !*** ./example/src/app.js ***!
  \****************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_cli_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/cli.js */ \"./src/cli.js\");\n/* harmony import */ var _src_adapters_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/adapters.js */ \"./src/adapters.js\");\n\r\n\r\n\r\nconst snakegame = () => {\r\n    console.log('started snake game');\r\n}\r\n\r\nconst cli = (0,_src_cli_js__WEBPACK_IMPORTED_MODULE_0__.createCli)(\r\n    {\r\n        'games' : {\r\n            'snake.exe' : snakegame\r\n        },\r\n        'about.txt' : 'Hi there,\\nMy name is Mats Sommervold'\r\n    },\r\n    document.querySelector('#cli-root')\r\n);\r\n\r\ncli('help')\n\n//# sourceURL=webpack://simple-cli/./example/src/app.js?");

/***/ }),

/***/ "./src/adapters.js":
/*!*************************!*\
  !*** ./src/adapters.js ***!
  \*************************/
/*! namespace exports */
/*! export vanilla [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"vanilla\": () => /* binding */ vanilla\n/* harmony export */ });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ \"./src/core.js\");\n\r\n\r\nconst vanilla = (structure, root) => {\r\n    return (0,_core__WEBPACK_IMPORTED_MODULE_0__.default)(structure);\r\n}\n\n//# sourceURL=webpack://simple-cli/./src/adapters.js?");

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

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createCli\": () => /* binding */ createCli\n/* harmony export */ });\n/* harmony import */ var _commands_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commands.js */ \"./src/commands.js\");\n\r\n\r\nlet state = {\r\n    fs: {},\r\n    path: ['root'],\r\n    root: '',\r\n    commands: _commands_js__WEBPACK_IMPORTED_MODULE_0__.commands,\r\n    output: [\r\n        \r\n    ]\r\n}\r\n\r\nconst interact = (command) => {\r\n    const splitCommand = command.split(' ');\r\n\r\n    let mainCommand = state.commands[splitCommand[0]];\r\n    if (mainCommand === undefined) mainCommand = state.commands.default;\r\n    mainCommand.action(state, splitCommand.shift());\r\n    return state;\r\n}\r\n\r\nconst addKeyHandler = (root) => {\r\n    root.addEventListener('keydown', e => {\r\n        if (e.keyCode === 13) {\r\n            e.preventDefault();\r\n            interact(getCommand());\r\n        }\r\n    });\r\n    root.addEventListener('click', e => {\r\n        getCurrentInput().focus();\r\n    })\r\n}\r\n\r\nconst getCurrentInput = () => {\r\n    return state.output[state.output.length - 1].children[1];\r\n}\r\n\r\nconst getCommand = () => {\r\n    return getCurrentInput().innerText;\r\n}\r\n\r\nconst createCli = (structure, root) => {\r\n    state.fs = typeof structure == 'object' ? structure : state.fs;\r\n    if(root instanceof Element) state.root = root;\r\n    else throw new Error('No root element provided');\r\n    addKeyHandler(root);\r\n    return interact;\r\n}\n\n//# sourceURL=webpack://simple-cli/./src/cli.js?");

/***/ }),

/***/ "./src/commands.js":
/*!*************************!*\
  !*** ./src/commands.js ***!
  \*************************/
/*! namespace exports */
/*! export commands [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"commands\": () => /* binding */ commands\n/* harmony export */ });\n/* harmony import */ var _io_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./io.js */ \"./src/io.js\");\n\r\n\r\nconst commands = {\r\n    help: {\r\n        desc: 'lists all available commands and their use',\r\n        action: (state, command) => {\r\n            Object.keys(state.commands).forEach(key => {\r\n                state = _io_js__WEBPACK_IMPORTED_MODULE_0__.default.createElement(state, `\\`${key}\\` - ${state.commands[key].desc}`);\r\n            })\r\n            state = _io_js__WEBPACK_IMPORTED_MODULE_0__.default.createInput(state);\r\n            return state;\r\n        }\r\n    },\r\n    echo: {\r\n        desc: 'prints something to the terminal',\r\n        action: (state, command) => {\r\n            \r\n        }\r\n    },\r\n    default: {\r\n        desc: 'runs if no matching command is found',\r\n        action: (state, command) => {\r\n            state = _io_js__WEBPACK_IMPORTED_MODULE_0__.default.createElement(state, `\\`${command}\\` is not recognised as a valid command`);\r\n            return _io_js__WEBPACK_IMPORTED_MODULE_0__.default.createInput(state);\r\n        }\r\n    }\r\n};\n\n//# sourceURL=webpack://simple-cli/./src/commands.js?");

/***/ }),

/***/ "./src/core.js":
/*!*********************!*\
  !*** ./src/core.js ***!
  \*********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements:  */
/***/ (() => {

eval("throw new Error(\"Module parse failed: Identifier 'Store' has already been declared (2:7)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n| import Store from './store/store.js';\\n> import Store from './store/store.js';\\n| \\n| export default class cli  {\");\n\n//# sourceURL=webpack://simple-cli/./src/core.js?");

/***/ }),

/***/ "./src/io.js":
/*!*******************!*\
  !*** ./src/io.js ***!
  \*******************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nconst io = {\r\n    render: (state) => {\r\n        state.root.innerHTML = '';\r\n        for (let e of state.output) {\r\n            state.root.appendChild(e);\r\n        }\r\n        return state;\r\n    },\r\n    createElement: (state, string) => {\r\n        const e = document.createElement('p');\r\n        e.innerHTML = string;\r\n        state.output.push(e);\r\n        return io.render(state);\r\n    },\r\n    createInput: state => {\r\n        const div = document.createElement('div');\r\n        div.style.display = 'grid';\r\n        div.style.gridTemplateColumns = 'max-content 1fr';\r\n        const e = document.createElement('p');\r\n        const j = document.createElement('p');\r\n        \r\n        e.innerHTML = `${state.path[state.path.length - 1]} > `;\r\n        j.contentEditable = true;\r\n\r\n        div.appendChild(e);\r\n        div.appendChild(j);\r\n\r\n        state.output.push(div);\r\n        return io.render(state);\r\n    }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (io);\n\n//# sourceURL=webpack://simple-cli/./src/io.js?");

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