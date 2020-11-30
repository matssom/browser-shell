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

/***/ "./dist/core.js":
/*!**********************!*\
  !*** ./dist/core.js ***!
  \**********************/
/*! namespace exports */
/*! export activity [provided] [no usage info] [missing usage info prevents renaming] */
/*! export fs [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"activity\": () => /* binding */ activity,\n/* harmony export */   \"fs\": () => /* binding */ fs\n/* harmony export */ });\nlet activity;\r\nlet fs;\r\n\n\n//# sourceURL=webpack://simple-cli/./dist/core.js?");

/***/ }),

/***/ "./dist/lib/helpers.js":
/*!*****************************!*\
  !*** ./dist/lib/helpers.js ***!
  \*****************************/
/*! namespace exports */
/*! export createId [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createId\": () => /* binding */ createId\n/* harmony export */ });\nconst createId = () => {\r\n    const id = [...Array(20)].map(i => (~~(Math.random() * 36)).toString(36)).join('');\r\n    return id;\r\n};\r\n\n\n//# sourceURL=webpack://simple-cli/./dist/lib/helpers.js?");

/***/ }),

/***/ "./dist/lib/store.js":
/*!***************************!*\
  !*** ./dist/lib/store.js ***!
  \***************************/
/*! namespace exports */
/*! export createActivity [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createFileSystem [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createActivity\": () => /* binding */ createActivity,\n/* harmony export */   \"createFileSystem\": () => /* binding */ createFileSystem\n/* harmony export */ });\n/* harmony import */ var storable_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! storable-state */ \"./node_modules/storable-state/index.js\");\n/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers.js */ \"./dist/lib/helpers.js\");\n/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core.js */ \"./dist/core.js\");\n\r\n\r\n\r\nconst defaultActivity = {\r\n    user: 'system',\r\n    group: 'system'\r\n};\r\nconst createActivity = (activity = defaultActivity, key = 'activity') => {\r\n    const { subscribe, set, update } = (0,storable_state__WEBPACK_IMPORTED_MODULE_0__.storable)(key, activity);\r\n    return {\r\n        subscribe,\r\n        set,\r\n        update,\r\n        get: (key) => {\r\n            let state;\r\n            subscribe(value => state = value[key])();\r\n            return state;\r\n        }\r\n    };\r\n};\r\nconst defaultData = {\r\n    inodes: new Map(),\r\n    files: new Map(),\r\n    data: new Map()\r\n};\r\nconst createFileSystem = (data = defaultData, key = 'fs') => {\r\n    const { subscribe, set, update } = (0,storable_state__WEBPACK_IMPORTED_MODULE_0__.storable)(key, data);\r\n    const updateFile = (fileId, callback) => update((value) => {\r\n        return callback(value);\r\n    });\r\n    const createFile = (name, parrent, type, permission, data) => {\r\n        const address = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.createId)();\r\n        const inodeId = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.createId)();\r\n        const fileId = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.createId)();\r\n        update((value) => {\r\n            const permString = permission.user + permission.group + permission.other;\r\n            const inode = {\r\n                type,\r\n                permission: permString,\r\n                modified: new Date(),\r\n                user: _core_js__WEBPACK_IMPORTED_MODULE_2__.activity.get('user'),\r\n                group: _core_js__WEBPACK_IMPORTED_MODULE_2__.activity.get('group'),\r\n                links: [fileId],\r\n                size: (new Blob([data])).size,\r\n                address: address\r\n            };\r\n            const file = {\r\n                name,\r\n                links: [parrent],\r\n                inode: inodeId\r\n            };\r\n            const newValue = Object.assign({}, value);\r\n            newValue.inodes.set(inodeId, inode);\r\n            newValue.files.set(fileId, file);\r\n            newValue.data.set(address, data);\r\n            updateFile(parrent, (value) => {\r\n                // Update parrent file here\r\n                return value;\r\n            });\r\n            return newValue;\r\n        });\r\n        return fileId;\r\n    };\r\n    return {\r\n        subscribe,\r\n        createFile,\r\n        updateFile\r\n    };\r\n};\r\n\n\n//# sourceURL=webpack://simple-cli/./dist/lib/store.js?");

/***/ }),

/***/ "./node_modules/storable-state/index.js":
/*!**********************************************!*\
  !*** ./node_modules/storable-state/index.js ***!
  \**********************************************/
/*! namespace exports */
/*! export derived [provided] [no usage info] [missing usage info prevents renaming] */
/*! export readable [provided] [no usage info] [missing usage info prevents renaming] */
/*! export storable [provided] [no usage info] [missing usage info prevents renaming] */
/*! export writable [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"writable\": () => /* binding */ writable,\n/* harmony export */   \"readable\": () => /* binding */ readable,\n/* harmony export */   \"storable\": () => /* binding */ storable,\n/* harmony export */   \"derived\": () => /* binding */ derived\n/* harmony export */ });\n/* harmony import */ var _store_writable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store/writable.js */ \"./node_modules/storable-state/store/writable.js\");\n/* harmony import */ var _store_readable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store/readable.js */ \"./node_modules/storable-state/store/readable.js\");\n/* harmony import */ var _store_storable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store/storable.js */ \"./node_modules/storable-state/store/storable.js\");\n/* harmony import */ var _store_derived_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store/derived.js */ \"./node_modules/storable-state/store/derived.js\");\n// Author: Mats Sommervold - https://github.com/matssom/svelte-storable.git - MIT license\r\n\r\n\r\n\r\n\r\nconst writable = (value, start) => (0,_store_writable_js__WEBPACK_IMPORTED_MODULE_0__.default)(value, start);\r\nconst readable = (value, start) => (0,_store_readable_js__WEBPACK_IMPORTED_MODULE_1__.default)(value, start);\r\nconst storable = (key, value, start) => (0,_store_storable_js__WEBPACK_IMPORTED_MODULE_2__.default)(key, value, start);\r\nconst derived = (dependencies, update) => (0,_store_derived_js__WEBPACK_IMPORTED_MODULE_3__.default)(dependencies, update);\r\n\n\n//# sourceURL=webpack://simple-cli/./node_modules/storable-state/index.js?");

/***/ }),

/***/ "./node_modules/storable-state/lib/pubsub.js":
/*!***************************************************!*\
  !*** ./node_modules/storable-state/lib/pubsub.js ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ PubSub\n/* harmony export */ });\nclass PubSub {\r\n    constructor() {\r\n        this.events = {};\r\n    }\r\n    subscribe(event, callback) {\r\n        let self = this;\r\n        if (!self.events.hasOwnProperty(event)) {\r\n            self.events[event] = [];\r\n        }\r\n        self.events[event].push(callback);\r\n        return () => self.events[event].push(callback);\r\n    }\r\n    unsubscribe(event, subscriber) {\r\n        let self = this;\r\n        return self.events[event].splice(subscriber, 1).length >= 1 ? true : false;\r\n    }\r\n    publish(event, data = {}) {\r\n        let self = this;\r\n        if (!self.events.hasOwnProperty(event)) {\r\n            return [];\r\n        }\r\n        return self.events[event].map(callback => callback(data));\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://simple-cli/./node_modules/storable-state/lib/pubsub.js?");

/***/ }),

/***/ "./node_modules/storable-state/store/derived.js":
/*!******************************************************!*\
  !*** ./node_modules/storable-state/store/derived.js ***!
  \******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store.js */ \"./node_modules/storable-state/store/store.js\");\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((dependencies, update) => {\r\n    const store = new _store_js__WEBPACK_IMPORTED_MODULE_0__.default();\r\n    const values = [];\r\n    const subMap = new Map();\r\n    if (dependencies instanceof Array) {\r\n        dependencies.forEach((dependency, i) => {\r\n            subMap.set(i, value => {\r\n                values[i] = value;\r\n                if (values.length === dependencies.length)\r\n                    store.set(update(...values));\r\n            });\r\n            dependency.subscribe(subMap.get(i));\r\n        });\r\n    }\r\n    else {\r\n        dependencies.subscribe(value => store.set(update(value)));\r\n    }\r\n    return { subscribe: store.subscribe };\r\n});\r\n\n\n//# sourceURL=webpack://simple-cli/./node_modules/storable-state/store/derived.js?");

/***/ }),

/***/ "./node_modules/storable-state/store/readable.js":
/*!*******************************************************!*\
  !*** ./node_modules/storable-state/store/readable.js ***!
  \*******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store.js */ \"./node_modules/storable-state/store/store.js\");\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((value, start) => {\r\n    return { subscribe: new _store_js__WEBPACK_IMPORTED_MODULE_0__.default(value, start).subscribe };\r\n});\r\n\n\n//# sourceURL=webpack://simple-cli/./node_modules/storable-state/store/readable.js?");

/***/ }),

/***/ "./node_modules/storable-state/store/storable.js":
/*!*******************************************************!*\
  !*** ./node_modules/storable-state/store/storable.js ***!
  \*******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store.js */ \"./node_modules/storable-state/store/store.js\");\n\r\nclass Storable extends _store_js__WEBPACK_IMPORTED_MODULE_0__.default {\r\n    constructor(key, value, start) {\r\n        super(value, start);\r\n        this.detached = false;\r\n        this.key = key;\r\n        this.retrieve();\r\n        this.detach = this.detach.bind(this);\r\n        this.attach = this.attach.bind(this);\r\n    }\r\n    save(value) {\r\n        if (!this.detached)\r\n            localStorage.setItem(this.key, JSON.stringify(value));\r\n    }\r\n    retrieve() {\r\n        const value = localStorage.getItem(this.key);\r\n        if (!!value)\r\n            this.set(JSON.parse(value));\r\n    }\r\n    set(newValue) {\r\n        super.set(newValue);\r\n        this.save(newValue);\r\n    }\r\n    update(mutator) {\r\n        super.update(mutator);\r\n    }\r\n    detach() {\r\n        this.detached = true;\r\n        localStorage.removeItem(this.key);\r\n    }\r\n    attach() {\r\n        this.detached = false;\r\n        const unsubscribe = this.subscribe(value => this.save(value));\r\n        unsubscribe();\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((key, value, start) => {\r\n    return new Storable(key, value, start);\r\n});\r\n\n\n//# sourceURL=webpack://simple-cli/./node_modules/storable-state/store/storable.js?");

/***/ }),

/***/ "./node_modules/storable-state/store/store.js":
/*!****************************************************!*\
  !*** ./node_modules/storable-state/store/store.js ***!
  \****************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Store\n/* harmony export */ });\n/* harmony import */ var _lib_pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/pubsub.js */ \"./node_modules/storable-state/lib/pubsub.js\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\nclass Store {\r\n    /**\r\n     * Creates a store that allows reading by subscription.\r\n     * @param value initial value\r\n     * @param start start and stop notifications for subscriptions\r\n     */\r\n    constructor(value, start) {\r\n        this.state = value;\r\n        this.event = new _lib_pubsub_js__WEBPACK_IMPORTED_MODULE_0__.default();\r\n        this.start = start;\r\n        this.set = this.set.bind(this);\r\n        this.update = this.update.bind(this);\r\n        this.subscribe = this.subscribe.bind(this);\r\n    }\r\n    set(newValue) {\r\n        this.state = newValue;\r\n        this.event.publish('STATE_CHANGE', newValue);\r\n    }\r\n    update(mutator) {\r\n        this.set(mutator(this.state));\r\n    }\r\n    subscribe(subscriber) {\r\n        this.event.subscribe('STATE_CHANGE', subscriber);\r\n        if (this.event.events['STATE_CHANGE'].length === 1 && this.start)\r\n            this.cleanup = this.start(this.set);\r\n        subscriber(this.state);\r\n        return () => __awaiter(this, void 0, void 0, function* () {\r\n            if (this.event.unsubscribe('STATE_CHANGE', subscriber) &&\r\n                this.event.events['STATE_CHANGE'].length === 0 &&\r\n                this.cleanup) {\r\n                try {\r\n                    const cleanup = yield this.cleanup;\r\n                    cleanup();\r\n                }\r\n                catch (err) {\r\n                    throw new Error(\"Could not run cleanup function, promise rejected. Please make sure your async setter can resolve.\");\r\n                }\r\n            }\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://simple-cli/./node_modules/storable-state/store/store.js?");

/***/ }),

/***/ "./node_modules/storable-state/store/writable.js":
/*!*******************************************************!*\
  !*** ./node_modules/storable-state/store/writable.js ***!
  \*******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store.js */ \"./node_modules/storable-state/store/store.js\");\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((value, start) => {\r\n    return new _store_js__WEBPACK_IMPORTED_MODULE_0__.default(value, start);\r\n});\r\n\n\n//# sourceURL=webpack://simple-cli/./node_modules/storable-state/store/writable.js?");

/***/ }),

/***/ "./test/browser/src/browser.test.js":
/*!******************************************!*\
  !*** ./test/browser/src/browser.test.js ***!
  \******************************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fileSystem_test_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fileSystem.test.js */ \"./test/browser/src/fileSystem.test.js\");\n\r\n\r\n(0,_fileSystem_test_js__WEBPACK_IMPORTED_MODULE_0__.default)();\n\n//# sourceURL=webpack://simple-cli/./test/browser/src/browser.test.js?");

/***/ }),

/***/ "./test/browser/src/fileSystem.test.js":
/*!*********************************************!*\
  !*** ./test/browser/src/fileSystem.test.js ***!
  \*********************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _dist_lib_store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../dist/lib/store.js */ \"./dist/lib/store.js\");\n\r\n\r\nlet expect = chai.expect;\r\n\r\nconst test = () => {\r\n    describe('File System', () => {\r\n        describe('createFileSystem()', () => {\r\n\r\n            const fs = (0,_dist_lib_store_js__WEBPACK_IMPORTED_MODULE_0__.createFileSystem)()\r\n\r\n            it('returns a file system', () => {\r\n                expect(fs).to.be.an('object')\r\n            })\r\n\r\n            let store;\r\n            fs.subscribe(value => store = value)()\r\n\r\n            it('is an empty store', () => {\r\n                expect(store).to.eql({\r\n                    inodes: new Map(),\r\n                    files: new Map(),\r\n                    data: new Map()\r\n                })\r\n            })\r\n        })\r\n    })\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => test());\n\n//# sourceURL=webpack://simple-cli/./test/browser/src/fileSystem.test.js?");

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
/******/ 	__webpack_require__("./test/browser/src/browser.test.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;