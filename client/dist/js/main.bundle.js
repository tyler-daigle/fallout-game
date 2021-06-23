/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _password_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./password_game */ \"./src/password_game.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./server */ \"./src/server.js\");\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui */ \"./src/ui.js\");\n\n\n\n\n\nconst gameSettings = {\n  numRows: 16,\n  numCols: 12,\n  numWords: 18,\n  wordLength: 8,\n  wordList: [],\n  correctPassword: \"\",\n  attempts: 4,\n  gameOver: false\n};\n\nfunction dumpGameSettings() {\n  console.log(gameSettings);\n}\n\nfunction loadUi() {\n  const { numWords, wordList, numRows, numCols } = gameSettings;\n  if (wordList.length === 0) {\n    throw \"Word list is 0, word list must be loaded first.\";\n  }\n\n  // setup memory displays next to memory dumps\n\n  const memoryDisplay1 = document.getElementById(\"mem-display-1\");\n  const memoryDisplay2 = document.getElementById(\"mem-display-2\");\n  console.log(memoryDisplay1.firstChild);\n  console.assert(memoryDisplay1.firstChild === null);\n  console.assert(memoryDisplay2.firstChild === null);\n\n  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.showMemoryAddresses)(memoryDisplay1, 0, numCols, numRows);\n  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.showMemoryAddresses)(memoryDisplay2, numRows * 12, numCols, numRows);\n\n  // cut the words array in half\n  const wordsArea1 = wordList.slice(0, Math.floor(numWords / 2));\n  const wordsArea2 = wordList.slice(Math.floor(numWords / 2));\n\n  // display the \"memory dumps\"\n  const mem1 = (0,_util__WEBPACK_IMPORTED_MODULE_1__.createMemoryDump)(wordsArea1, numRows, numCols);\n  const mem2 = (0,_util__WEBPACK_IMPORTED_MODULE_1__.createMemoryDump)(wordsArea2, numRows, numCols);\n\n  // get the containers and display the dumps\n  const mainContainer = document.getElementById(\"debug-area-1\");\n  const secondContainer = document.getElementById(\"debug-area-2\");\n\n  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.createDebugDataDisplay)(mainContainer, numRows, numCols, mem1);\n  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.createDebugDataDisplay)(secondContainer, numRows, numCols, mem2);\n}\n\nfunction passwordChecker(passwordChar) {\n  const pc = passwordChar;\n  if (gameSettings.gameOver) {\n    return;\n  }\n\n  // when player clicks on a character we get the dataset.characterId value and then\n  // use that to find all the characters that make up the password. \n  const guess = (0,_util__WEBPACK_IMPORTED_MODULE_1__.getPasswordWithId)(pc.dataset.characterId);\n\n  if (guess.toLowerCase() === gameSettings.correctPassword) {\n    (0,_ui__WEBPACK_IMPORTED_MODULE_3__.setStatusMessage)(\"PASSWORD ACCEPTED\");\n    gameSettings.gameOver = true;\n    (0,_ui__WEBPACK_IMPORTED_MODULE_3__.showAccessGranted)();\n    setTimeout(() => {\n      (0,_ui__WEBPACK_IMPORTED_MODULE_3__.hideAccessGranted)();\n      resetGame();\n    }, 4000);\n  } else {\n    const likeness = (0,_util__WEBPACK_IMPORTED_MODULE_1__.computeLikeness)(\n      guess.toLowerCase(),\n      gameSettings.correctPassword\n    );\n    (0,_ui__WEBPACK_IMPORTED_MODULE_3__.setStatusMessage)(`INVALID PASSWORD ${guess}: Likeness=${likeness}`);\n    gameSettings.attempts--;\n    if (gameSettings.attempts === 0) {\n      (0,_ui__WEBPACK_IMPORTED_MODULE_3__.showAccessDenied)();\n      gameSettings.gameOver = true;\n      setTimeout(() => {\n        (0,_ui__WEBPACK_IMPORTED_MODULE_3__.hideAccessDenied)();\n        resetGame();\n      }, 3000);\n    }\n    (0,_ui__WEBPACK_IMPORTED_MODULE_3__.showAttemptsLeft)(gameSettings.attempts);\n  }\n}\n\nasync function startGame() {\n  console.log(\"Start\");\n  const { numWords, wordLength } = gameSettings;\n\n  // load the words from the API\n  try {\n    gameSettings.wordList = await (0,_server__WEBPACK_IMPORTED_MODULE_2__.loadWords)(numWords, wordLength);\n  } catch (e) {\n    (0,_ui__WEBPACK_IMPORTED_MODULE_3__.setSelectedOutput)(e.message);\n    return;\n  }\n\n  // choose a random correct password\n  const { wordList } = gameSettings;\n  gameSettings.correctPassword =\n    wordList[Math.floor(Math.random() * wordList.length)];\n\n  loadUi();\n  dumpGameSettings();\n\n  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.showAttemptsLeft)(gameSettings.attempts);\n\n  // createHandlers() must be called after all the DOM elements\n  // are created by loadUi()\n  (0,_password_game__WEBPACK_IMPORTED_MODULE_0__.createHandlers)(passwordChecker);\n}\n\n// set handler for when reset button is clicked. Have to make sure this is\n// only set once else multiple handlers will be set and reset will be called\n// multiple times.\n\ndocument.querySelector(\"#reset-button\").addEventListener(\"click\", () => {\n  resetGame();\n});\n\nfunction resetGame() {\n  const memDisplay1 = document.querySelector(\"#mem-display-1\");\n  const memDisplay2 = document.querySelector(\"#mem-display-2\");\n  const debugDisplay1 = document.querySelector(\"#debug-area-1\");\n  const debugDisplay2 = document.querySelector(\"#debug-area-2\");\n  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.hideAccessDenied)();\n  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.hideAccessGranted)();\n\n  (0,_util__WEBPACK_IMPORTED_MODULE_1__.removeAllElements)(memDisplay1);\n  (0,_util__WEBPACK_IMPORTED_MODULE_1__.removeAllElements)(memDisplay2);\n  (0,_util__WEBPACK_IMPORTED_MODULE_1__.removeAllElements)(debugDisplay1);\n  (0,_util__WEBPACK_IMPORTED_MODULE_1__.removeAllElements)(debugDisplay2);\n\n  gameSettings.gameOver = false;\n  gameSettings.wordList = [];\n  gameSettings.attempts = 4;\n\n  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.setSelectedOutput)(\"\");\n  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.setStatusMessage)(\"\");\n  (0,_ui__WEBPACK_IMPORTED_MODULE_3__.showAttemptsLeft)(gameSettings.attempts);\n\n  startGame();\n}\nstartGame();\n\n\n//# sourceURL=webpack://client/./src/index.js?");

/***/ }),

/***/ "./src/password_game.js":
/*!******************************!*\
  !*** ./src/password_game.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"specialChars\": () => (/* binding */ specialChars),\n/* harmony export */   \"createHandlers\": () => (/* binding */ createHandlers)\n/* harmony export */ });\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ \"./src/ui.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\n\nconst specialChars = \"~!@#$%^&*()[]{}:;'\\\".<>|\\\\/-+=\";\n\n// each character that makes up a possible password will have the class\n// \"password-character\". The possible password will also have a data\n// attribute called \"data-character-id\" set. Each character that makes\n// up a single password will all have the same id set.\n\n// All other characters (the random garbage characters) will have the\n// class \"debug-character\".\n\n// when a password character is moused over, highlight all the other\n// password characters that have the same data-character-id attribute\n// value.\n\nfunction passwordCharMouseOverHandler(e) {\n  const id = this.dataset.characterId;\n\n  if (!this.classList.contains(\"password-character-highlight\")) {\n    this.classList.add(\"password-character-highlight\");\n\n    // find all the other items with the same dataset.characterId and\n    // set them to be highlighted\n    const otherChars = document.querySelectorAll(\n      `[data-character-id = \"${id}\"]`\n    );\n    otherChars.forEach(otherPc => {\n      if (!otherPc.classList.contains(\"password-character-highlight\")) {\n        otherPc.classList.add(\"password-character-highlight\");\n      }\n    });\n  }\n\n  // also set the output to display the password\n  (0,_ui__WEBPACK_IMPORTED_MODULE_0__.setSelectedOutput)((0,_util__WEBPACK_IMPORTED_MODULE_1__.getPasswordWithId)(id));\n}\n\n// remove the password-character-highlight class from the elements\n// that have the same data-character-id value when the mouse moves\n// off of them.\nfunction passwordCharMouseOutHandler() {\n  if (this.classList.contains(\"password-character-highlight\")) {\n    // remove highlight from this element\n    this.classList.remove(\"password-character-highlight\");\n\n    // find all the other elements with the same character-id and\n    // remove the highlights.\n    const id = this.dataset.characterId;\n    const otherChars = document.querySelectorAll(\n      `[data-character-id = \"${id}\"]`\n    );\n    otherChars.forEach(otherPc => {\n      if (otherPc.classList.contains(\"password-character-highlight\")) {\n        otherPc.classList.remove(\"password-character-highlight\");\n      }\n    });\n  }\n}\n\nfunction createHandlers(passwordChecker) {\n  const passwordCharacters = document.querySelectorAll(\".password-character\");\n\n  // set the mouseover and mouseout handlers for each element with the class of\n  // \"password-character\"\n  passwordCharacters.forEach(pc => {\n    pc.addEventListener(\"mouseover\", passwordCharMouseOverHandler);\n    pc.addEventListener(\"mouseout\", passwordCharMouseOutHandler);\n  });\n\n  // set the output to show the highlighted regular characters when\n  // they are moused over.\n  document.querySelectorAll(\".debug-character\").forEach(ch => {\n    ch.addEventListener(\"mouseover\", () => (0,_ui__WEBPACK_IMPORTED_MODULE_0__.setSelectedOutput)(ch.innerText));\n  });\n\n  //Click handler for when a password is clicked.\n  document\n    .querySelectorAll(\".password-character\")\n    .forEach(pc => pc.addEventListener(\"click\", () => passwordChecker(pc)));\n\n  // set the output to blank when the mouse is moved out of the debug area\n  document.querySelectorAll(\".debug-data\").forEach(dd => {\n    dd.addEventListener(\"mouseout\", () => (0,_ui__WEBPACK_IMPORTED_MODULE_0__.setSelectedOutput)(\"\"));\n  });\n}\n\n\n//# sourceURL=webpack://client/./src/password_game.js?");

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loadWords\": () => (/* binding */ loadWords)\n/* harmony export */ });\n// loadWords() connects to the server and requests the\n// words to use. It returns an array of numWords words all\n// with the length of wordLength.\n\nasync function loadWords(numWords = 5, wordLength = 5) {\n  // use fetch to load the acual words from the api here\n  // return Promise.resolve([\"dog\", \"cat\", \"bat\", \"rat\", \"hat\"]);\n  try {\n    const apiUrl = `http://localhost:8000/words?count=${numWords}&length=${wordLength}`;\n\n    const response = await fetch(apiUrl);\n    const jsonWords = await response.json();\n    return jsonWords.words;\n  } catch (e) {\n    throw e;\n  }\n}\n\n\n//# sourceURL=webpack://client/./src/server.js?");

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setSelectedOutput\": () => (/* binding */ setSelectedOutput),\n/* harmony export */   \"setStatusMessage\": () => (/* binding */ setStatusMessage),\n/* harmony export */   \"showAccessGranted\": () => (/* binding */ showAccessGranted),\n/* harmony export */   \"hideAccessGranted\": () => (/* binding */ hideAccessGranted),\n/* harmony export */   \"showAccessDenied\": () => (/* binding */ showAccessDenied),\n/* harmony export */   \"hideAccessDenied\": () => (/* binding */ hideAccessDenied),\n/* harmony export */   \"showAttemptsLeft\": () => (/* binding */ showAttemptsLeft),\n/* harmony export */   \"showMemoryAddresses\": () => (/* binding */ showMemoryAddresses),\n/* harmony export */   \"createDebugDataDisplay\": () => (/* binding */ createDebugDataDisplay)\n/* harmony export */ });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\n\nfunction setSelectedOutput(word) {\n  document.querySelector(\"#current-output\").innerText = word;\n}\n\nfunction setStatusMessage(word) {\n  document.querySelector(\"#status-message\").innerText = word;\n}\n\nfunction showAccessGranted() {\n  document.getElementById(\"access-granted\").style.display = \"block\";\n}\nfunction hideAccessGranted() {\n  document.getElementById(\"access-granted\").style.display = \"none\";\n}\n\nfunction showAccessDenied() {\n  document.getElementById(\"access-denied\").style.display = \"block\";\n}\nfunction hideAccessDenied() {\n  document.getElementById(\"access-denied\").style.display = \"none\";\n}\n\nfunction showAttemptsLeft(num) {\n  const attemptChar = \"*\";\n  const ac = document.getElementById(\"attempt-container\");\n  ac.innerText = \"\";\n\n  for (let i = 0; i < num; i++) {\n    ac.innerText = ac.innerText + attemptChar;\n  }\n}\n\n// showMemoryAddresses() creates a list of hexadecimal numbers that is supposed\n// to look like memory addresses. It attaches the created ul element to the\n// provided parentElement.\n\nfunction showMemoryAddresses(\n  parentElement,\n  startingNum,\n  stepAmt,\n  numRows\n) {\n  const ul = document.createElement(\"ul\");\n  let currNum = startingNum;\n  for (let i = 0; i < numRows; i++) {\n    const li = document.createElement(\"li\");\n    li.innerText = (0,_util__WEBPACK_IMPORTED_MODULE_0__.toHex)(currNum);\n    currNum += stepAmt;\n    ul.appendChild(li);\n  }\n  parentElement.appendChild(ul);\n}\n\nfunction addPasswordCharacter(\n  parent,\n  ch,\n  id,\n  className = \"password-character\"\n) {\n  const el = document.createElement(\"span\");\n  el.classList.add(className);\n  el.innerText = ch;\n  el.dataset.characterId = id;\n  parent.appendChild(el);\n}\n\nfunction addGarbageCharacter(parent, ch, className = \"debug-character\") {\n  const el = document.createElement(\"span\");\n  el.classList.add(className);\n  el.innerText = ch;\n  parent.appendChild(el);\n}\n\nfunction createRow() {\n  const row = document.createElement(\"div\");\n  row.classList.add(\"debug-data-row\");\n  return row;\n}\n\n// passwordId is global because it is possible to call createDebugDataDisplay()\n// multiple times and passwordId needs to retain its value after each call so\n// that the dataset.chararacterId is set correctly for matching passwords.\nlet passwordId = 0;\n\n// createDebugDataDisplay() creates the actual html elements that display\n// the memory dumps. It creates the dump based on the memoryData array\n// that is passed in (the array returned from createMemoryDump()).\nfunction createDebugDataDisplay(\n  rootContainer,\n  numRows,\n  numCols,\n  memoryData\n) {\n  if (numRows * numCols > memoryData.length) {\n    throw `Memory size too small: ${numRows * numCols} > ${memoryData.length}`;\n  }\n\n  let currChar = 0;\n  let inPassword = false; // keep track of when we are inserting password characters\n\n  for (let row = 0; row < numRows; row++) {\n    const rowElement = createRow();\n\n    for (let i = 0; i < numCols; i++) {\n      const ch = memoryData[currChar];\n      if (_util__WEBPACK_IMPORTED_MODULE_0__.specialChars.includes(ch)) {\n        if (inPassword) {\n          inPassword = false;\n          passwordId++;\n        }\n        addGarbageCharacter(rowElement, ch);\n      } else {\n        if (!inPassword) {\n          inPassword = true;\n        }\n        addPasswordCharacter(rowElement, ch, passwordId);\n      }\n      currChar++;\n    }\n    rootContainer.appendChild(rowElement);\n  }\n}\n\n\n//# sourceURL=webpack://client/./src/ui.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"specialChars\": () => (/* binding */ specialChars),\n/* harmony export */   \"removeAllElements\": () => (/* binding */ removeAllElements),\n/* harmony export */   \"toHex\": () => (/* binding */ toHex),\n/* harmony export */   \"computeLikeness\": () => (/* binding */ computeLikeness),\n/* harmony export */   \"getPasswordWithId\": () => (/* binding */ getPasswordWithId),\n/* harmony export */   \"createMemoryDump\": () => (/* binding */ createMemoryDump)\n/* harmony export */ });\nconst specialChars = \"~!@#$%^&*()[]{}:;'\\\".<>|\\\\/-+=\";\n\nfunction removeAllElements(element) {\n  while (element.firstChild) {\n    element.removeChild(element.firstChild);\n  }\n}\n\nfunction toHex(num) {\n  let hex = num.toString(16);\n  const minLength = 4;\n\n  while (hex.length < minLength) {\n    hex = \"0\" + hex;\n  }\n  return \"0x\" + hex;\n}\n\nfunction computeLikeness(word1, word2) {\n  let likeness = 0;\n  if (word1.length !== word2.length) {\n    return 0;\n  }\n\n  for (let i = 0; i < word1.length; i++) {\n    if (word1[i] === word2[i]) {\n      likeness++;\n    }\n  }\n  return likeness;\n}\n\n// getPasswordWithId() returns the string that is made up of the characters\n// with the data-character-id attribute set to id. It then just maps through\n// all the elements and gets the innerText value which are the characters\n// that make up the password.\nfunction getPasswordWithId(id) {\n  const pwChars = document.querySelectorAll(`[data-character-id = \"${id}\"]`);\n  const pw = Array.from(pwChars).map(char => char.innerText);\n  return pw.join(\"\");\n}\n\n// createMemoryDump() creates an array and adds all the garbage characters\n// and the words to the array. This array is then used to display the\n// \"memory dump\" for the game containing the garbage characters and\n// the possible passwords.\nfunction createMemoryDump(wordList, numRows, numCols) {\n  const wordLength = wordList.reduce((total, word) => total + word.length, 0);\n  if (wordLength > numRows * numCols) {\n    throw \"There are more words than would fit into the number of rows x cols\";\n  }\n\n  const mem = [];\n\n  // fill all the elements with garbage characters\n  for (let i = 0; i < numRows * numCols; i++) {\n    mem.push(specialChars[Math.floor(Math.random() * specialChars.length)]);\n  }\n\n  const gap = 2; // at least this many garbage characters before each password\n\n  // randomly place the words\n  wordList.forEach(word => {\n    let placed = false;\n\n    while (!placed) {\n      let start = Math.floor(Math.random() * numRows * numCols);\n\n      // check before this position so password doesn't start right after another\n      if (start !== gap) {\n        if (!specialChars.includes(mem[start - 1])) {\n          continue; // there is a password right before this spot\n        }\n      }\n\n      let freeSpots = 0;\n      for (let i = 0; i < word.length + gap && start + i < mem.length; i++) {\n        if (!specialChars.includes(mem[start + i])) {\n          break; // password is already here\n        } else {\n          freeSpots++;\n        }\n      }\n      if (freeSpots === word.length + gap) {\n        mem.splice(start, word.length, ...word.toUpperCase().split(\"\"));\n        placed = true;\n      }\n    }\n  });\n  return mem;\n}\n\n\n//# sourceURL=webpack://client/./src/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;