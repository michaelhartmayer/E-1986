/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return callback();
/******/ 		}
/******/ 		callback(null, update);
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "2834cfebb0db2c03470a"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n__webpack_require__(1);\n\nvar path = __webpack_require__(2);\nvar fs = __webpack_require__(3);\n\n// express server\nvar express = __webpack_require__(4);\nvar app = express();\nvar server = __webpack_require__(5).createServer(app);\nvar io = __webpack_require__(6)(server);\nvar port = process.env.PORT || 9815;\n\n// dev users\nvar users = {\n    'Pawn': 'test',\n    'Knight': 'test',\n    'Rook': 'test',\n    'King': 'test',\n    'Queen': 'test',\n    'Bishop': 'test',\n    'Joker': 'test',\n    'Master': '12345'\n};\n\n// log helpers\nvar log = function log() {\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n    }\n\n    return console.log.apply(null, ['->'.bold.white].concat(args));\n};\nvar error = function error() {\n    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n        args[_key2] = arguments[_key2];\n    }\n\n    return console.log.apply(null, ['-E'.bold.red].concat(args));\n};\n\n// connection manager\n\nvar ConnectionManager = function () {\n    function ConnectionManager(_ref) {\n        var _this = this;\n\n        var _ref$io = _ref.io;\n        var io = _ref$io === undefined ? null : _ref$io;\n        var _ref$limit = _ref.limit;\n        var limit = _ref$limit === undefined ? 20 : _ref$limit;\n\n        _classCallCheck(this, ConnectionManager);\n\n        this.cLimit = limit;\n        this.cActive = 0;\n        this.cList = [];\n\n        if (!io) return error('Unable to start ConnectionManager - need io');\n\n        io.on('connection', function (sck) {\n            return _this.handleConnect(sck);\n        });\n        log('ConnectionManager started.');\n    }\n\n    _createClass(ConnectionManager, [{\n        key: 'handleConnect',\n        value: function handleConnect(sck) {\n            var _this2 = this;\n\n            var c = new Connection(sck);\n            var id = sck.id;\n\n            // bind disconnect\n\n            c.onDisconnect(function (c) {\n                return _this2.handleDisconnect(c);\n            });\n            this.register(c);\n\n            // log\n            log(id.bold + ' - Client Connected');\n        }\n    }, {\n        key: 'handleDisconnect',\n        value: function handleDisconnect(c) {\n            this.unregister(c);\n            log(c.getId().bold + ' - Client Disconnected');\n        }\n    }, {\n        key: 'register',\n        value: function register(c) {\n            this.cList.push(c);\n        }\n    }, {\n        key: 'unregister',\n        value: function unregister(c) {\n            this.cList = this.cList.filter(function (i) {\n                return c === i ? false : i;\n            });\n        }\n    }]);\n\n    return ConnectionManager;\n}();\n\n// connection\n\n\nvar Connection = function () {\n    function Connection(sck) {\n        _classCallCheck(this, Connection);\n\n        this.id = sck.id;\n        this.sck = sck;\n    }\n\n    _createClass(Connection, [{\n        key: 'onDisconnect',\n        value: function onDisconnect(fn) {\n            var _this3 = this;\n\n            this.sck.on('disconnect', function () {\n                return fn(_this3);\n            });\n        }\n    }, {\n        key: 'disconnect',\n        value: function disconnect() {\n            this.sck.close();\n        }\n    }, {\n        key: 'emit',\n        value: function emit(channel, message) {\n            this.sck.emit(channel, message);\n        }\n    }, {\n        key: 'broadcast',\n        value: function broadcast(channel, message) {\n            this.sck.broadcast.emit(channel, message);\n        }\n    }, {\n        key: 'getId',\n        value: function getId() {\n            return this.id;\n        }\n    }]);\n\n    return Connection;\n}();\n\n// session\n\n\nvar UserSession = function () {\n    function UserSession() {\n        _classCallCheck(this, UserSession);\n\n        this.id = 0 | Math.random() * 999999999;\n        this.ttl = 60 * 60 * 24; // 1 day\n        this.ts = new Date().getTime();\n    }\n\n    _createClass(UserSession, [{\n        key: 'isValid',\n        value: function isValid() {\n            var expiration = this.ts + this.ttl;\n            var now = new Date().getTime();\n\n            if (expiration > now) return true;\n            return false;\n        }\n    }, {\n        key: 'getId',\n        value: function getId() {\n            return this.id;\n        }\n    }]);\n\n    return UserSession;\n}();\n\nnew ConnectionManager({ io: io });\n\n// login\nvar login = function login(credentials) {\n    var username = credentials.username;\n    var password = credentials.password;\n\n    if (users[username] && users[username] === password) return new UserSession();\n\n    return false;\n};\n\n// http listen\nserver.listen(port, function () {\n    log('http server listening at port ' + port.toString().bold);\n});\n\n// routing\napp.use(express.static((\"/Users/michaelhartmayer/Proto/E-1986/dist\")));\n// app.get('*', (req, res) => {\n//     var uri;\n//     var file;\n\n//     console.log(req)\n\n//     uri  = req.params[0];\n//     file = path.join(__dirname, uri);\n\n//     if (fs.existsSync(file) && fs.statSync(file).isFile()) {\n//         res.sendFile(file);\n//         log('http', '200'.white, uri);\n//     }\n\n//     else {\n//         res.status(404).send('404 - Resource Not Found');\n//         log('http', '404'.red, uri);\n//     }\n// });//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uLi9zcmMvc2VydmVyLmpzPzYyM2UiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5yZXF1aXJlKCdjb2xvcnMnKTtcblxudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG52YXIgZnMgPSByZXF1aXJlKCdmcycpO1xuXG4vLyBleHByZXNzIHNlcnZlclxudmFyIGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG52YXIgYXBwID0gZXhwcmVzcygpO1xudmFyIHNlcnZlciA9IHJlcXVpcmUoJ2h0dHAnKS5jcmVhdGVTZXJ2ZXIoYXBwKTtcbnZhciBpbyA9IHJlcXVpcmUoJ3NvY2tldC5pbycpKHNlcnZlcik7XG52YXIgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgOTgxNTtcblxuLy8gZGV2IHVzZXJzXG52YXIgdXNlcnMgPSB7XG4gICAgJ1Bhd24nOiAndGVzdCcsXG4gICAgJ0tuaWdodCc6ICd0ZXN0JyxcbiAgICAnUm9vayc6ICd0ZXN0JyxcbiAgICAnS2luZyc6ICd0ZXN0JyxcbiAgICAnUXVlZW4nOiAndGVzdCcsXG4gICAgJ0Jpc2hvcCc6ICd0ZXN0JyxcbiAgICAnSm9rZXInOiAndGVzdCcsXG4gICAgJ01hc3Rlcic6ICcxMjM0NSdcbn07XG5cbi8vIGxvZyBoZWxwZXJzXG52YXIgbG9nID0gZnVuY3Rpb24gbG9nKCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnNvbGUubG9nLmFwcGx5KG51bGwsIFsnLT4nLmJvbGQud2hpdGVdLmNvbmNhdChhcmdzKSk7XG59O1xudmFyIGVycm9yID0gZnVuY3Rpb24gZXJyb3IoKSB7XG4gICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgIH1cblxuICAgIHJldHVybiBjb25zb2xlLmxvZy5hcHBseShudWxsLCBbJy1FJy5ib2xkLnJlZF0uY29uY2F0KGFyZ3MpKTtcbn07XG5cbi8vIGNvbm5lY3Rpb24gbWFuYWdlclxuXG52YXIgQ29ubmVjdGlvbk1hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29ubmVjdGlvbk1hbmFnZXIoX3JlZikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIHZhciBfcmVmJGlvID0gX3JlZi5pbztcbiAgICAgICAgdmFyIGlvID0gX3JlZiRpbyA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IF9yZWYkaW87XG4gICAgICAgIHZhciBfcmVmJGxpbWl0ID0gX3JlZi5saW1pdDtcbiAgICAgICAgdmFyIGxpbWl0ID0gX3JlZiRsaW1pdCA9PT0gdW5kZWZpbmVkID8gMjAgOiBfcmVmJGxpbWl0O1xuXG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb25uZWN0aW9uTWFuYWdlcik7XG5cbiAgICAgICAgdGhpcy5jTGltaXQgPSBsaW1pdDtcbiAgICAgICAgdGhpcy5jQWN0aXZlID0gMDtcbiAgICAgICAgdGhpcy5jTGlzdCA9IFtdO1xuXG4gICAgICAgIGlmICghaW8pIHJldHVybiBlcnJvcignVW5hYmxlIHRvIHN0YXJ0IENvbm5lY3Rpb25NYW5hZ2VyIC0gbmVlZCBpbycpO1xuXG4gICAgICAgIGlvLm9uKCdjb25uZWN0aW9uJywgZnVuY3Rpb24gKHNjaykge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLmhhbmRsZUNvbm5lY3Qoc2NrKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxvZygnQ29ubmVjdGlvbk1hbmFnZXIgc3RhcnRlZC4nKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoQ29ubmVjdGlvbk1hbmFnZXIsIFt7XG4gICAgICAgIGtleTogJ2hhbmRsZUNvbm5lY3QnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlQ29ubmVjdChzY2spIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgYyA9IG5ldyBDb25uZWN0aW9uKHNjayk7XG4gICAgICAgICAgICB2YXIgaWQgPSBzY2suaWQ7XG5cbiAgICAgICAgICAgIC8vIGJpbmQgZGlzY29ubmVjdFxuXG4gICAgICAgICAgICBjLm9uRGlzY29ubmVjdChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczIuaGFuZGxlRGlzY29ubmVjdChjKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlcihjKTtcblxuICAgICAgICAgICAgLy8gbG9nXG4gICAgICAgICAgICBsb2coaWQuYm9sZCArICcgLSBDbGllbnQgQ29ubmVjdGVkJyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2hhbmRsZURpc2Nvbm5lY3QnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlRGlzY29ubmVjdChjKSB7XG4gICAgICAgICAgICB0aGlzLnVucmVnaXN0ZXIoYyk7XG4gICAgICAgICAgICBsb2coYy5nZXRJZCgpLmJvbGQgKyAnIC0gQ2xpZW50IERpc2Nvbm5lY3RlZCcpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZWdpc3RlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZWdpc3RlcihjKSB7XG4gICAgICAgICAgICB0aGlzLmNMaXN0LnB1c2goYyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3VucmVnaXN0ZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdW5yZWdpc3RlcihjKSB7XG4gICAgICAgICAgICB0aGlzLmNMaXN0ID0gdGhpcy5jTGlzdC5maWx0ZXIoZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYyA9PT0gaSA/IGZhbHNlIDogaTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIENvbm5lY3Rpb25NYW5hZ2VyO1xufSgpO1xuXG4vLyBjb25uZWN0aW9uXG5cblxudmFyIENvbm5lY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29ubmVjdGlvbihzY2spIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbm5lY3Rpb24pO1xuXG4gICAgICAgIHRoaXMuaWQgPSBzY2suaWQ7XG4gICAgICAgIHRoaXMuc2NrID0gc2NrO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhDb25uZWN0aW9uLCBbe1xuICAgICAgICBrZXk6ICdvbkRpc2Nvbm5lY3QnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb25EaXNjb25uZWN0KGZuKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICAgICAgdGhpcy5zY2sub24oJ2Rpc2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuKF90aGlzMyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZGlzY29ubmVjdCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNjb25uZWN0KCkge1xuICAgICAgICAgICAgdGhpcy5zY2suY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZW1pdCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBlbWl0KGNoYW5uZWwsIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2NrLmVtaXQoY2hhbm5lbCwgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2Jyb2FkY2FzdCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBicm9hZGNhc3QoY2hhbm5lbCwgbWVzc2FnZSkge1xuICAgICAgICAgICAgdGhpcy5zY2suYnJvYWRjYXN0LmVtaXQoY2hhbm5lbCwgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldElkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldElkKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQ29ubmVjdGlvbjtcbn0oKTtcblxuLy8gc2Vzc2lvblxuXG5cbnZhciBVc2VyU2Vzc2lvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBVc2VyU2Vzc2lvbigpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFVzZXJTZXNzaW9uKTtcblxuICAgICAgICB0aGlzLmlkID0gMCB8IE1hdGgucmFuZG9tKCkgKiA5OTk5OTk5OTk7XG4gICAgICAgIHRoaXMudHRsID0gNjAgKiA2MCAqIDI0OyAvLyAxIGRheVxuICAgICAgICB0aGlzLnRzID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKFVzZXJTZXNzaW9uLCBbe1xuICAgICAgICBrZXk6ICdpc1ZhbGlkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGlzVmFsaWQoKSB7XG4gICAgICAgICAgICB2YXIgZXhwaXJhdGlvbiA9IHRoaXMudHMgKyB0aGlzLnR0bDtcbiAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgICAgICAgaWYgKGV4cGlyYXRpb24gPiBub3cpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRJZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRJZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlkO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFVzZXJTZXNzaW9uO1xufSgpO1xuXG5uZXcgQ29ubmVjdGlvbk1hbmFnZXIoeyBpbzogaW8gfSk7XG5cbi8vIGxvZ2luXG52YXIgbG9naW4gPSBmdW5jdGlvbiBsb2dpbihjcmVkZW50aWFscykge1xuICAgIHZhciB1c2VybmFtZSA9IGNyZWRlbnRpYWxzLnVzZXJuYW1lO1xuICAgIHZhciBwYXNzd29yZCA9IGNyZWRlbnRpYWxzLnBhc3N3b3JkO1xuXG4gICAgaWYgKHVzZXJzW3VzZXJuYW1lXSAmJiB1c2Vyc1t1c2VybmFtZV0gPT09IHBhc3N3b3JkKSByZXR1cm4gbmV3IFVzZXJTZXNzaW9uKCk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG4vLyBodHRwIGxpc3Rlblxuc2VydmVyLmxpc3Rlbihwb3J0LCBmdW5jdGlvbiAoKSB7XG4gICAgbG9nKCdodHRwIHNlcnZlciBsaXN0ZW5pbmcgYXQgcG9ydCAnICsgcG9ydC50b1N0cmluZygpLmJvbGQpO1xufSk7XG5cbi8vIHJvdXRpbmdcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoX19kaXJuYW1lKSk7XG4vLyBhcHAuZ2V0KCcqJywgKHJlcSwgcmVzKSA9PiB7XG4vLyAgICAgdmFyIHVyaTtcbi8vICAgICB2YXIgZmlsZTtcblxuLy8gICAgIGNvbnNvbGUubG9nKHJlcSlcblxuLy8gICAgIHVyaSAgPSByZXEucGFyYW1zWzBdO1xuLy8gICAgIGZpbGUgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCB1cmkpO1xuXG4vLyAgICAgaWYgKGZzLmV4aXN0c1N5bmMoZmlsZSkgJiYgZnMuc3RhdFN5bmMoZmlsZSkuaXNGaWxlKCkpIHtcbi8vICAgICAgICAgcmVzLnNlbmRGaWxlKGZpbGUpO1xuLy8gICAgICAgICBsb2coJ2h0dHAnLCAnMjAwJy53aGl0ZSwgdXJpKTtcbi8vICAgICB9XG5cbi8vICAgICBlbHNlIHtcbi8vICAgICAgICAgcmVzLnN0YXR1cyg0MDQpLnNlbmQoJzQwNCAtIFJlc291cmNlIE5vdCBGb3VuZCcpO1xuLy8gICAgICAgICBsb2coJ2h0dHAnLCAnNDA0Jy5yZWQsIHVyaSk7XG4vLyAgICAgfVxuLy8gfSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9zcmMvc2VydmVyLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("colors");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ }
/******/ ]);