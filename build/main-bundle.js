/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Logger.ts":
/*!***********************!*\
  !*** ./src/Logger.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Logger: () => (/* binding */ Logger)
/* harmony export */ });
class Logger {
    constructor(selector) {
        this.domElement = document.querySelector(selector);
    }
    print(message) {
        console.log(message);
        if (!this.domElement)
            return;
        this.domElement.innerText += message;
        this.domElement.insertAdjacentElement("beforeend", document.createElement('br'));
    }
}


/***/ }),

/***/ "./src/MyPromise.ts":
/*!**************************!*\
  !*** ./src/MyPromise.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MyPromise: () => (/* binding */ MyPromise)
/* harmony export */ });
var PromiseState;
(function (PromiseState) {
    PromiseState[PromiseState["PENDING"] = 0] = "PENDING";
    PromiseState[PromiseState["FULFILLED"] = 1] = "FULFILLED";
    PromiseState[PromiseState["REJECTED"] = 2] = "REJECTED";
})(PromiseState || (PromiseState = {}));
var CallbackType;
(function (CallbackType) {
    CallbackType[CallbackType["THEN"] = 0] = "THEN";
    CallbackType[CallbackType["CATCH"] = 1] = "CATCH";
    CallbackType[CallbackType["FINALLY"] = 2] = "FINALLY";
})(CallbackType || (CallbackType = {}));
// RES - Promise Resolve type,REJ - Promise Reject type
class MyPromise {
    constructor(body) {
        this.callbackList = [];
        this.state = PromiseState.PENDING;
        this.promiseBodyResult = undefined;
        body(this.resolve.bind(this), this.reject.bind(this));
    }
    resolve(result) {
        if (this.state !== PromiseState.PENDING)
            return;
        this.promiseBodyResult = result;
        this.state = PromiseState.FULFILLED;
        this.callbackList.forEach(callback => this.runCallback(callback));
    }
    reject(reason) {
        if (this.state !== PromiseState.PENDING)
            return;
        this.promiseBodyResult = reason;
        this.state = PromiseState.REJECTED;
        this.callbackList.forEach(callback => this.runCallback(callback));
    }
    // CR - Callback Result, CRP_RES - Callback Return Promise Resolve type, CP_REJ - Callback Return Promise Reject type
    addCallback(fnCallback, type) {
        let callbackResolve;
        let callbackReject;
        const callbackPromise = new MyPromise((resolve, reject) => {
            callbackResolve = resolve;
            callbackReject = reject;
        });
        const callbackWrapper = (promiseResult) => {
            if (type + 1 !== this.state && type !== CallbackType.FINALLY) {
                this.state === PromiseState.FULFILLED
                    ? callbackResolve(promiseResult)
                    : callbackReject(promiseResult);
                return;
            }
            const callbackResult = fnCallback(promiseResult);
            if (callbackResult instanceof MyPromise)
                (callbackResult)
                    .then((r) => { callbackResolve(r); })
                    .catch((r) => { callbackReject(r); });
            else
                callbackResolve(callbackResult);
        };
        if (this.state !== PromiseState.PENDING)
            this.runCallback(callbackWrapper);
        else
            this.callbackList.push(callbackWrapper);
        return callbackPromise;
    }
    runCallback(fnCallbackWrapper) {
        queueMicrotask(() => fnCallbackWrapper(this.promiseBodyResult));
        // If you want to see synchronous callback work
        // fnCallbackWrapper(this.promiseBodyResult)
    }
    then(onFulfilled) {
        return this.addCallback(onFulfilled, CallbackType.THEN);
    }
    catch(onRejected) {
        return this.addCallback(onRejected, CallbackType.CATCH);
    }
    finally(onFinished) {
        return this.addCallback(onFinished, CallbackType.FINALLY);
    }
}


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyPromise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyPromise */ "./src/MyPromise.ts");
/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Logger */ "./src/Logger.ts");


addEventListener('DOMContentLoaded', () => {
    const logger = new _Logger__WEBPACK_IMPORTED_MODULE_1__.Logger('.output-wrapper');
    logger.print("START");
    new _MyPromise__WEBPACK_IMPORTED_MODULE_0__.MyPromise((resolve, reject) => {
        logger.print("PROMISE BODY");
        reject('3');
    })
        .then((result) => {
        logger.print("THEN1: " + result);
    })
        .finally((value) => {
        logger.print("FINALLY: " + value);
        return new _MyPromise__WEBPACK_IMPORTED_MODULE_0__.MyPromise((resolve, reject) => {
            reject(120);
        });
    })
        .then((result) => {
        logger.print("THEN2: " + result);
        return 30;
    })
        .catch((reason) => {
        logger.print("CATCH1: " + reason);
        return 15;
    })
        .then((result) => {
        logger.print("THEN3: " + result);
        return new _MyPromise__WEBPACK_IMPORTED_MODULE_0__.MyPromise((resolve) => {
            setTimeout(() => resolve('100'), 1000);
        });
    })
        .then((result) => logger.print("THEN TIMER: " + result));
    logger.print("END");
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9DQUFvQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxvQ0FBb0M7QUFDckM7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxxQkFBcUI7QUFDeEQsb0NBQW9DLG9CQUFvQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUM3RUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOd0M7QUFDTjtBQUNsQztBQUNBLHVCQUF1QiwyQ0FBTTtBQUM3QjtBQUNBLFFBQVEsaURBQVM7QUFDakI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxtQkFBbUIsaURBQVM7QUFDNUI7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLG1CQUFtQixpREFBUztBQUM1QjtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvTG9nZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9NeVByb21pc2UudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBMb2dnZXIge1xuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XG4gICAgICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIH1cbiAgICBwcmludChtZXNzYWdlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICBpZiAoIXRoaXMuZG9tRWxlbWVudClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5kb21FbGVtZW50LmlubmVyVGV4dCArPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLmRvbUVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJykpO1xuICAgIH1cbn1cbiIsInZhciBQcm9taXNlU3RhdGU7XG4oZnVuY3Rpb24gKFByb21pc2VTdGF0ZSkge1xuICAgIFByb21pc2VTdGF0ZVtQcm9taXNlU3RhdGVbXCJQRU5ESU5HXCJdID0gMF0gPSBcIlBFTkRJTkdcIjtcbiAgICBQcm9taXNlU3RhdGVbUHJvbWlzZVN0YXRlW1wiRlVMRklMTEVEXCJdID0gMV0gPSBcIkZVTEZJTExFRFwiO1xuICAgIFByb21pc2VTdGF0ZVtQcm9taXNlU3RhdGVbXCJSRUpFQ1RFRFwiXSA9IDJdID0gXCJSRUpFQ1RFRFwiO1xufSkoUHJvbWlzZVN0YXRlIHx8IChQcm9taXNlU3RhdGUgPSB7fSkpO1xudmFyIENhbGxiYWNrVHlwZTtcbihmdW5jdGlvbiAoQ2FsbGJhY2tUeXBlKSB7XG4gICAgQ2FsbGJhY2tUeXBlW0NhbGxiYWNrVHlwZVtcIlRIRU5cIl0gPSAwXSA9IFwiVEhFTlwiO1xuICAgIENhbGxiYWNrVHlwZVtDYWxsYmFja1R5cGVbXCJDQVRDSFwiXSA9IDFdID0gXCJDQVRDSFwiO1xuICAgIENhbGxiYWNrVHlwZVtDYWxsYmFja1R5cGVbXCJGSU5BTExZXCJdID0gMl0gPSBcIkZJTkFMTFlcIjtcbn0pKENhbGxiYWNrVHlwZSB8fCAoQ2FsbGJhY2tUeXBlID0ge30pKTtcbi8vIFJFUyAtIFByb21pc2UgUmVzb2x2ZSB0eXBlLFJFSiAtIFByb21pc2UgUmVqZWN0IHR5cGVcbmV4cG9ydCBjbGFzcyBNeVByb21pc2Uge1xuICAgIGNvbnN0cnVjdG9yKGJvZHkpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFja0xpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFByb21pc2VTdGF0ZS5QRU5ESU5HO1xuICAgICAgICB0aGlzLnByb21pc2VCb2R5UmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgICAgICBib2R5KHRoaXMucmVzb2x2ZS5iaW5kKHRoaXMpLCB0aGlzLnJlamVjdC5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgcmVzb2x2ZShyZXN1bHQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09IFByb21pc2VTdGF0ZS5QRU5ESU5HKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLnByb21pc2VCb2R5UmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICB0aGlzLnN0YXRlID0gUHJvbWlzZVN0YXRlLkZVTEZJTExFRDtcbiAgICAgICAgdGhpcy5jYWxsYmFja0xpc3QuZm9yRWFjaChjYWxsYmFjayA9PiB0aGlzLnJ1bkNhbGxiYWNrKGNhbGxiYWNrKSk7XG4gICAgfVxuICAgIHJlamVjdChyZWFzb24pIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09IFByb21pc2VTdGF0ZS5QRU5ESU5HKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLnByb21pc2VCb2R5UmVzdWx0ID0gcmVhc29uO1xuICAgICAgICB0aGlzLnN0YXRlID0gUHJvbWlzZVN0YXRlLlJFSkVDVEVEO1xuICAgICAgICB0aGlzLmNhbGxiYWNrTGlzdC5mb3JFYWNoKGNhbGxiYWNrID0+IHRoaXMucnVuQ2FsbGJhY2soY2FsbGJhY2spKTtcbiAgICB9XG4gICAgLy8gQ1IgLSBDYWxsYmFjayBSZXN1bHQsIENSUF9SRVMgLSBDYWxsYmFjayBSZXR1cm4gUHJvbWlzZSBSZXNvbHZlIHR5cGUsIENQX1JFSiAtIENhbGxiYWNrIFJldHVybiBQcm9taXNlIFJlamVjdCB0eXBlXG4gICAgYWRkQ2FsbGJhY2soZm5DYWxsYmFjaywgdHlwZSkge1xuICAgICAgICBsZXQgY2FsbGJhY2tSZXNvbHZlO1xuICAgICAgICBsZXQgY2FsbGJhY2tSZWplY3Q7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrUHJvbWlzZSA9IG5ldyBNeVByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgIGNhbGxiYWNrUmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tXcmFwcGVyID0gKHByb21pc2VSZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlICsgMSAhPT0gdGhpcy5zdGF0ZSAmJiB0eXBlICE9PSBDYWxsYmFja1R5cGUuRklOQUxMWSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPT09IFByb21pc2VTdGF0ZS5GVUxGSUxMRURcbiAgICAgICAgICAgICAgICAgICAgPyBjYWxsYmFja1Jlc29sdmUocHJvbWlzZVJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgOiBjYWxsYmFja1JlamVjdChwcm9taXNlUmVzdWx0KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFja1Jlc3VsdCA9IGZuQ2FsbGJhY2socHJvbWlzZVJlc3VsdCk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2tSZXN1bHQgaW5zdGFuY2VvZiBNeVByb21pc2UpXG4gICAgICAgICAgICAgICAgKGNhbGxiYWNrUmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocikgPT4geyBjYWxsYmFja1Jlc29sdmUocik7IH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgocikgPT4geyBjYWxsYmFja1JlamVjdChyKTsgfSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tSZXNvbHZlKGNhbGxiYWNrUmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09IFByb21pc2VTdGF0ZS5QRU5ESU5HKVxuICAgICAgICAgICAgdGhpcy5ydW5DYWxsYmFjayhjYWxsYmFja1dyYXBwZXIpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrTGlzdC5wdXNoKGNhbGxiYWNrV3JhcHBlcik7XG4gICAgICAgIHJldHVybiBjYWxsYmFja1Byb21pc2U7XG4gICAgfVxuICAgIHJ1bkNhbGxiYWNrKGZuQ2FsbGJhY2tXcmFwcGVyKSB7XG4gICAgICAgIHF1ZXVlTWljcm90YXNrKCgpID0+IGZuQ2FsbGJhY2tXcmFwcGVyKHRoaXMucHJvbWlzZUJvZHlSZXN1bHQpKTtcbiAgICAgICAgLy8gSWYgeW91IHdhbnQgdG8gc2VlIHN5bmNocm9ub3VzIGNhbGxiYWNrIHdvcmtcbiAgICAgICAgLy8gZm5DYWxsYmFja1dyYXBwZXIodGhpcy5wcm9taXNlQm9keVJlc3VsdClcbiAgICB9XG4gICAgdGhlbihvbkZ1bGZpbGxlZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRDYWxsYmFjayhvbkZ1bGZpbGxlZCwgQ2FsbGJhY2tUeXBlLlRIRU4pO1xuICAgIH1cbiAgICBjYXRjaChvblJlamVjdGVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZENhbGxiYWNrKG9uUmVqZWN0ZWQsIENhbGxiYWNrVHlwZS5DQVRDSCk7XG4gICAgfVxuICAgIGZpbmFsbHkob25GaW5pc2hlZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRDYWxsYmFjayhvbkZpbmlzaGVkLCBDYWxsYmFja1R5cGUuRklOQUxMWSk7XG4gICAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBNeVByb21pc2UgfSBmcm9tIFwiLi9NeVByb21pc2VcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuL0xvZ2dlclwiO1xuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCcub3V0cHV0LXdyYXBwZXInKTtcbiAgICBsb2dnZXIucHJpbnQoXCJTVEFSVFwiKTtcbiAgICBuZXcgTXlQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbG9nZ2VyLnByaW50KFwiUFJPTUlTRSBCT0RZXCIpO1xuICAgICAgICByZWplY3QoJzMnKTtcbiAgICB9KVxuICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIGxvZ2dlci5wcmludChcIlRIRU4xOiBcIiArIHJlc3VsdCk7XG4gICAgfSlcbiAgICAgICAgLmZpbmFsbHkoKHZhbHVlKSA9PiB7XG4gICAgICAgIGxvZ2dlci5wcmludChcIkZJTkFMTFk6IFwiICsgdmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IE15UHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZWplY3QoMTIwKTtcbiAgICAgICAgfSk7XG4gICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICBsb2dnZXIucHJpbnQoXCJUSEVOMjogXCIgKyByZXN1bHQpO1xuICAgICAgICByZXR1cm4gMzA7XG4gICAgfSlcbiAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcbiAgICAgICAgbG9nZ2VyLnByaW50KFwiQ0FUQ0gxOiBcIiArIHJlYXNvbik7XG4gICAgICAgIHJldHVybiAxNTtcbiAgICB9KVxuICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIGxvZ2dlci5wcmludChcIlRIRU4zOiBcIiArIHJlc3VsdCk7XG4gICAgICAgIHJldHVybiBuZXcgTXlQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUoJzEwMCcpLCAxMDAwKTtcbiAgICAgICAgfSk7XG4gICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4gbG9nZ2VyLnByaW50KFwiVEhFTiBUSU1FUjogXCIgKyByZXN1bHQpKTtcbiAgICBsb2dnZXIucHJpbnQoXCJFTkRcIik7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==