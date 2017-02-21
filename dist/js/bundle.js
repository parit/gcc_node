/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _fixtures = __webpack_require__(1);
	
	var _fixtures2 = _interopRequireDefault(_fixtures);
	
	var _people = __webpack_require__(3);
	
	var _people2 = _interopRequireDefault(_people);
	
	var _Utils = __webpack_require__(2);
	
	var _Utils2 = _interopRequireDefault(_Utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_Utils2.default.ready(function (e) {
		new _fixtures2.default().init();
		new _people2.default().init();
		_Utils2.default.triggerClick(_Utils2.default.byId('season-2017'));
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Utils = __webpack_require__(2);
	
	var _Utils2 = _interopRequireDefault(_Utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var seasons = {
	    "2015": "https://spreadsheets.google.com/feeds/list/1Le0TL0SajUKWyqnzSQuRyu4c-ACdoQR9FV_YXPLtOsw/1/public/basic?alt=json",
	    "2016": "https://spreadsheets.google.com/feeds/list/1rs8faeR-UcxqzHZWIKBmbRQv3Kqm4yn_Rqolle_yyKs/1/public/basic?alt=json",
	    "2017": "https://spreadsheets.google.com/feeds/list/1zenOgULKD5fIAoBwanHjrrSCDvU7MHh4Aj7v47Xbboc/1/public/basic?alt=json"
	};
	
	var fixtures = function () {
	    function fixtures() {
	        _classCallCheck(this, fixtures);
	    }
	
	    _createClass(fixtures, [{
	        key: "init",
	        value: function init() {
	            var _this = this;
	
	            _Utils2.default.byId('seasons-list').addEventListener('click', function (e) {
	                if (e.target.matches('.seasons-select')) {
	                    var season = e.target.id.split('-')[1];
	                    _Utils2.default.byId('season-selected').innerHTML = 'Season ' + season;
	                    e.preventDefault();
	                    _this.getFixtureData(season);
	                }
	            });
	            _Utils2.default.byId('toUpcoming').addEventListener('click', _Utils2.default.tabUI(_Utils2.default.byId('fixturesInnerCol'), _Utils2.default.byId('fixturesList')));
	
	            _Utils2.default.byId('toResults').addEventListener('click', _Utils2.default.tabUI(_Utils2.default.byId('fixturesInnerCol'), _Utils2.default.byId('resultsList')));
	        }
	    }, {
	        key: "renderFixtures",
	        value: function renderFixtures(data, filterfn, template, noStr, containerId, sortfn) {
	            data = data.filter(filterfn);
	            if (sortfn) data.sort(sortfn);
	
	            var fixtureContainer = _Utils2.default.byId(containerId);
	            fixtureContainer.innerHTML = '';
	            fixtureContainer.innerHTML = data.length > 0 ? template({ 'match': data }) : noStr;
	        }
	    }, {
	        key: "renderFormattedData",
	        value: function renderFormattedData(formatedData) {
	            var template = Handlebars.compile(_Utils2.default.byId("upcoming-matches").innerHTML);
	            this.renderUpComingFixtures(formatedData, function (v) {
	                return v.result ? false : true;
	            }, template, "<div class='noresults col-sm-12'><p><b>No Upcoming matches yet</b></p></div>", 'fixturesList');
	            this.renderUpComingFixtures(formatedData, function (v) {
	                return v.result ? true : false;
	            }, template, "<div class='noresults col-sm-12'><p><b>No Results yet</b></p></div>", 'resultsList', function (a, b) {
	                return new Date(b.date) - new Date(a.date);
	            });
	        }
	    }, {
	        key: "getFixtureData",
	        value: function getFixtureData(season) {
	            var _this2 = this;
	
	            var context = this;
	            var link = seasons[season];
	            $.ajax({
	                url: link,
	                success: function success(data) {
	                    var formatedData = [];
	                    for (var i = 0; i < data.feed.entry.length; i++) {
	                        var rowCols = data.feed.entry[i].content.$t.split(',');
	                        var _data = {};
	                        for (var j = 0; j < rowCols.length; j++) {
	                            var item = rowCols[j].trim();
	                            var index = item.indexOf(':');
	                            _data[item.substring(0, index)] = item.substring(index + 1).trim();
	                        }
	                        formatedData.push(_data);
	                    }
	                    _this2.renderFormattedData(formatedData);
	                }
	            });
	        }
	    }]);
	
	    return fixtures;
	}();
	
	exports.default = fixtures;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// this class can be broken up into multiple components as is required
	// at a later stage
	var Utils = function () {
	    function Utils() {
	        _classCallCheck(this, Utils);
	    }
	
	    _createClass(Utils, null, [{
	        key: 'removeElement',
	        value: function removeElement(element) {
	            element.parentNode.removeChild(element);
	        }
	    }, {
	        key: 'cloneFormOptions',
	        value: function cloneFormOptions(formEl, options, elements) {
	            return formEl.innerHTML;
	        }
	    }, {
	        key: 'modifyAndSubmitForm',
	        value: function modifyAndSubmitForm(formEl, inputs) {
	            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	            var form = document.createElement('form');
	            form.setAttribute('action', formEl.getAttribute('action'));
	            form.setAttribute('method', formEl.getAttribute('method'));
	            Object.keys(options).forEach(function (el) {
	                return form.setAttribute(el, options[el]);
	            });
	            form.innerHTML = inputs;
	            document.body.appendChild(form);
	            return form;
	        }
	    }, {
	        key: 'makeGroupedDropDown',
	        value: function makeGroupedDropDown(data) {
	            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { 'name': '' };
	            var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (name) {
	                return name;
	            };
	
	            var html = "";
	            if (props.label) {
	                html = '<p class="label">' + props.label + '</p>';
	            }
	
	            var optionsFn = function optionsFn(data) {
	                return Object.keys(data).map(function (el) {
	                    var id = fn(el);
	                    return '<option value="' + el + '" id="' + id + '"' + '>' + data[el] + '</option>';
	                });
	            };
	
	            var groups = Object.keys(data).map(function (key) {
	                return '<optgroup label="' + key + '">' + optionsFn(data[key]).join('') + '</optgroup>';
	            });
	
	            html = html + '<p class="builder"><select name="' + props.name + '">' + groups.join('') + '</select>' + '</p>';
	            return html;
	        }
	    }, {
	        key: 'byId',
	        value: function byId(id) {
	            return document.getElementById(id);
	        }
	    }, {
	        key: 'bySelector',
	        value: function bySelector(selector) {
	            var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	            return all ? document.querySelectorAll(selector) : document.querySelector(selector);
	        }
	    }, {
	        key: 'simpleDropDownBuilder',
	        value: function simpleDropDownBuilder(data) {
	            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { 'name': '' };
	
	            var html = '';
	            if (props.label) {
	                html = '<p class="label">' + props.label + '</p>';
	            }
	            return html + '<p class="builder">' + '<select name="' + props.name + '">' + Object.keys(data.selects).map(function (el) {
	                return '<option value="' + el + '"'
	                // + (data.def === el ? 'selected="selected"' : '')
	                + '>' + data.selects[el].label + '</option>';
	            }).join('') + '</select></p>';
	        }
	    }, {
	        key: 'selectValue',
	        value: function selectValue(selectSelector, optionSelector) {
	            document.querySelector(selectSelector).querySelector(optionSelector).selected = true;
	        }
	    }, {
	        key: 'syncFields',
	        value: function syncFields(newForm, form, selectors) {
	            selectors.forEach(function (el) {
	                Array.prototype.forEach.call(form.querySelectorAll(el), function (element) {
	                    var name = element.getAttribute("name");
	                    newForm.querySelector(el + '[name=' + name + ']').value = element.value;
	                });
	            });
	        }
	    }, {
	        key: 'hideElementsById',
	        value: function hideElementsById(ids_array) {
	            var _this = this;
	
	            this.hideElements(ids_array.map(function (id) {
	                return _this.byId(id);
	            }));
	        }
	    }, {
	        key: 'hideElements',
	        value: function hideElements(elements) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var element = _step.value;
	
	                    element.style.display = 'none';
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'removeClassesFromElements',
	        value: function removeClassesFromElements(elCollection, classes) {
	            var _this2 = this;
	
	            Array.prototype.forEach.call(elCollection, function (el) {
	                _this2.removeClasses(el, classes);
	            });
	        }
	    }, {
	        key: 'removeClasses',
	        value: function removeClasses(el, classes) {
	            var _this3 = this;
	
	            classes.forEach(function (e) {
	                _this3.removeClass(el, e);
	            });
	        }
	    }, {
	        key: 'removeClass',
	        value: function removeClass(el, className) {
	            if (el.classList) {
	                el.classList.remove(className);
	            } else if (el.className.indexOf(className) !== -1) {
	                var classes = el.className.split(' ');
	                el.className = classes.splice(classes.indexOf(className), 1).join(' ');
	            }
	        }
	    }, {
	        key: 'hasClass',
	        value: function hasClass(el, className) {
	            return el.classList ? el.classList.contains(className) : el.className.indexOf(className) !== -1;
	        }
	    }, {
	        key: 'addClass',
	        value: function addClass(el, className) {
	            if (el.classList) {
	                el.classList.add(className);
	            } else if (el.className.indexOf(className) === -1) {
	                el.className = el.className + ' ' + className;
	            }
	        }
	    }, {
	        key: 'addClassToElements',
	        value: function addClassToElements(collection, className) {
	            var _this4 = this;
	
	            Array.prototype.forEach.call(collection, function (el) {
	                return _this4.addClass(el, className);
	            });
	        }
	    }, {
	        key: 'triggerClick',
	        value: function triggerClick(el) {
	            var cancelable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	            var event = new MouseEvent("click", { "bubbles": true, "cancelable": cancelable });
	            el.dispatchEvent(event);
	        }
	    }, {
	        key: 'triggerNative',
	        value: function triggerNative(el, eventName) {
	            var event = document.createEvent('HTMLEvents');
	            event.initEvent(eventName, true, false);
	            el.dispatchEvent(event);
	        }
	    }, {
	        key: 'findParent',
	        value: function findParent(target, selector) {
	            if ('BODY' === target.tagName) {
	                return null;
	            } else if (target.matches(selector)) {
	                return target;
	            } else {
	                return this.findParent(target.parentNode, selector);
	            }
	        }
	    }, {
	        key: 'showElementsById',
	        value: function showElementsById(arr) {
	            var _this5 = this;
	
	            arr.forEach(function (id) {
	                _this5.showElement(_this5.byId(id));
	            });
	        }
	    }, {
	        key: 'showElement',
	        value: function showElement(element) {
	            element.style.display = '';
	        }
	    }, {
	        key: 'showElements',
	        value: function showElements(elementCollection) {
	            var _this6 = this;
	
	            Array.prototype.forEach.call(elementCollection, function (e) {
	                return _this6.showElement(e);
	            });
	        }
	    }, {
	        key: 'hideElementsById',
	        value: function hideElementsById(arr) {
	            var _this7 = this;
	
	            arr.forEach(function (id) {
	                _this7.hideElement(_this7.byId(id));
	            });
	        }
	    }, {
	        key: 'hideElements',
	        value: function hideElements(elementCollection) {
	            var _this8 = this;
	
	            Array.prototype.forEach.call(elementCollection, function (e) {
	                return _this8.hideElement(e);
	            });
	        }
	    }, {
	        key: 'hideElement',
	        value: function hideElement(element) {
	            element.style.display = 'none';
	        }
	
	        // similar to jquery offset method
	
	    }, {
	        key: 'getPosition',
	        value: function getPosition(target) {
	            var box = target.getBoundingClientRect();
	            var docElem = document.documentElement;
	            return {
	                top: box.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
	                left: box.left + (window.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
	            };
	        }
	    }, {
	        key: 'matches',
	        value: function matches(element, map) {
	            var keys = Object.keys(map);
	            keys.some(function (el) {
	                if (element.matches(el)) {
	                    map[el](element);
	                    return true;
	                }
	                return false;
	            });
	        }
	    }, {
	        key: 'createElement',
	        value: function createElement(el) {
	            var attr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            var result = document.createElement(el);
	            var keys = Object.keys(attr);
	            if (keys.length !== 0) {
	                keys.forEach(function (e) {
	                    return result.setAttribute(e, attr[e]);
	                });
	            }
	            return result;
	        }
	    }, {
	        key: 'isVariableDefined',
	        value: function isVariableDefined(variable) {
	            return typeof variable !== 'undefined' && variable !== null;
	        }
	    }, {
	        key: 'makeGetORPost',
	        value: function makeGetORPost() {
	            var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	            var attr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            if ('' === url || Object.keys(attr).length === 0) return;
	            var qStr = Object.keys(attr).map(function (el) {
	                return el + '=' + attr[key];
	            }).join('&');
	            /*
	            * not sure what could be the best length. 
	            * but http://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers
	            * says 2000 characters. Will gradually increase this if needed
	            */
	            if (qStr.length < 600) {
	                url = url.endsWith('/') ? url : url + '/';
	                window.location.href = url + (qStr.length > 0 ? '?' + qStr : '');
	            } else {
	                (function () {
	                    var form = utils.createElement('form', {
	                        'method': 'POST', 'action': url
	                    });
	                    Object.keys(attr).forEach(function (el) {
	                        form.appendChild(utils.createElement('input', {
	                            'name': el, 'value': attr[el]
	                        }));
	                    });
	                    document.body.appendChild(form);
	                    form.submit();
	                    utils.removeElement(form);
	                })();
	            }
	        }
	    }, {
	        key: 'tabUI',
	        value: function tabUI(container, showUp) {
	            var _this9 = this;
	
	            return function (e) {
	                var parent = e.target.parentNode;
	                if (_this9.hasClass(parent, 'active')) return;
	
	                _this9.removeClassesFromElements(parent.parent.children, ['active']);
	                _this9.addClass(parent, 'active');
	                _this9.addClassToElements(container.querySelectorAll('.tab-section'), 'hide');
	                _this9.removeClass(showUp, 'hide');
	            };
	        }
	    }, {
	        key: 'ready',
	        value: function ready(fn) {
	            if (document.readyState != 'loading') {
	                fn();
	            } else {
	                document.addEventListener('DOMContentLoaded', fn);
	            }
	        }
	    }]);
	
	    return Utils;
	}();
	
	exports.default = Utils;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Utils = __webpack_require__(2);
	
	var _Utils2 = _interopRequireDefault(_Utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var sheets = [{
	    'container': 'players',
	    'link': 'https://spreadsheets.google.com/feeds/list/1dPbsHsdSgQo4rUnxg-rzfYmy0w17vTJttHZ4PRMs3Uc/1/public/basic?alt=json'
	}, {
	    'container': 'admin',
	    'link': 'https://spreadsheets.google.com/feeds/list/1J3qnqDHtNXsQBYCjhkW9mRyIxwdiIjypAkZKr8Sxsos/1/public/basic?alt=json'
	}];
	
	var people = function () {
	    function people() {
	        _classCallCheck(this, people);
	    }
	
	    _createClass(people, [{
	        key: 'init',
	        value: function init() {
	            var _this = this;
	
	            var template = Handlebars.compile(_Utils2.default.byId("entry-template").innerHTML);
	            sheets.forEach(function (el) {
	                _this.getData(el.link, _Utils2.default.byId(el.container), template);
	            });
	
	            _Utils2.default.byId('toPlayers').addEventListener('click', _Utils2.default.tabUI(_Utils2.default.byId('playersContainer'), _Utils2.default.byId('players')));
	
	            _Utils2.default.byId('toManagement').addEventListener('click', _Utils2.default.tabUI(_Utils2.default.byId('playersContainer'), _Utils2.default.byId('admin')));
	        }
	    }, {
	        key: 'getData',
	        value: function getData(url, container, template) {
	            return $.ajax({
	                url: url,
	                success: function success(data) {
	                    var players = data.feed.entry.map(function (el) {
	                        var rowCols = el.content.$t.split(',');
	                        return {
	                            'name': rowCols[0].split(":")[1],
	                            'image': rowCols[1].split(":")[1].trim(),
	                            'description': rowCols[2].split(":")[1]
	                        };
	                    });
	                    container.innerHTML = template({ "entry": players });
	                }
	            });
	        }
	    }]);
	
	    return people;
	}();
	
	exports.default = people;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2NhYTU1NTliYTlhZDI1MjIyNjQiLCJ3ZWJwYWNrOi8vLy4vZ2NjLmpzIiwid2VicGFjazovLy8uL2ZpeHR1cmVzLmpzIiwid2VicGFjazovLy8uL1V0aWxzLmpzIiwid2VicGFjazovLy8uL3Blb3BsZS5qcyJdLCJuYW1lcyI6WyJyZWFkeSIsImUiLCJpbml0IiwidHJpZ2dlckNsaWNrIiwiYnlJZCIsInNlYXNvbnMiLCJmaXh0dXJlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0YXJnZXQiLCJtYXRjaGVzIiwic2Vhc29uIiwiaWQiLCJzcGxpdCIsImlubmVySFRNTCIsInByZXZlbnREZWZhdWx0IiwiZ2V0Rml4dHVyZURhdGEiLCJ0YWJVSSIsImRhdGEiLCJmaWx0ZXJmbiIsInRlbXBsYXRlIiwibm9TdHIiLCJjb250YWluZXJJZCIsInNvcnRmbiIsImZpbHRlciIsInNvcnQiLCJmaXh0dXJlQ29udGFpbmVyIiwibGVuZ3RoIiwiZm9ybWF0ZWREYXRhIiwiSGFuZGxlYmFycyIsImNvbXBpbGUiLCJyZW5kZXJVcENvbWluZ0ZpeHR1cmVzIiwidiIsInJlc3VsdCIsImEiLCJiIiwiRGF0ZSIsImRhdGUiLCJjb250ZXh0IiwibGluayIsIiQiLCJhamF4IiwidXJsIiwic3VjY2VzcyIsImkiLCJmZWVkIiwiZW50cnkiLCJyb3dDb2xzIiwiY29udGVudCIsIiR0IiwiX2RhdGEiLCJqIiwiaXRlbSIsInRyaW0iLCJpbmRleCIsImluZGV4T2YiLCJzdWJzdHJpbmciLCJwdXNoIiwicmVuZGVyRm9ybWF0dGVkRGF0YSIsIlV0aWxzIiwiZWxlbWVudCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImZvcm1FbCIsIm9wdGlvbnMiLCJlbGVtZW50cyIsImlucHV0cyIsImZvcm0iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImVsIiwiYm9keSIsImFwcGVuZENoaWxkIiwicHJvcHMiLCJmbiIsIm5hbWUiLCJodG1sIiwibGFiZWwiLCJvcHRpb25zRm4iLCJtYXAiLCJncm91cHMiLCJrZXkiLCJqb2luIiwiZ2V0RWxlbWVudEJ5SWQiLCJzZWxlY3RvciIsImFsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJxdWVyeVNlbGVjdG9yIiwic2VsZWN0cyIsInNlbGVjdFNlbGVjdG9yIiwib3B0aW9uU2VsZWN0b3IiLCJzZWxlY3RlZCIsIm5ld0Zvcm0iLCJzZWxlY3RvcnMiLCJBcnJheSIsInByb3RvdHlwZSIsImNhbGwiLCJ2YWx1ZSIsImlkc19hcnJheSIsImhpZGVFbGVtZW50cyIsInN0eWxlIiwiZGlzcGxheSIsImVsQ29sbGVjdGlvbiIsImNsYXNzZXMiLCJyZW1vdmVDbGFzc2VzIiwicmVtb3ZlQ2xhc3MiLCJjbGFzc05hbWUiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJzcGxpY2UiLCJjb250YWlucyIsImFkZCIsImNvbGxlY3Rpb24iLCJhZGRDbGFzcyIsImNhbmNlbGFibGUiLCJldmVudCIsIk1vdXNlRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiZXZlbnROYW1lIiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJ0YWdOYW1lIiwiZmluZFBhcmVudCIsImFyciIsInNob3dFbGVtZW50IiwiZWxlbWVudENvbGxlY3Rpb24iLCJoaWRlRWxlbWVudCIsImJveCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImRvY0VsZW0iLCJkb2N1bWVudEVsZW1lbnQiLCJ0b3AiLCJ3aW5kb3ciLCJwYWdlWU9mZnNldCIsInNjcm9sbFRvcCIsImNsaWVudFRvcCIsImxlZnQiLCJwYWdlWE9mZnNldCIsInNjcm9sbExlZnQiLCJjbGllbnRMZWZ0Iiwic29tZSIsImF0dHIiLCJ2YXJpYWJsZSIsInFTdHIiLCJlbmRzV2l0aCIsImxvY2F0aW9uIiwiaHJlZiIsInV0aWxzIiwic3VibWl0IiwicmVtb3ZlRWxlbWVudCIsImNvbnRhaW5lciIsInNob3dVcCIsInBhcmVudCIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3Nlc0Zyb21FbGVtZW50cyIsImNoaWxkcmVuIiwiYWRkQ2xhc3NUb0VsZW1lbnRzIiwicmVhZHlTdGF0ZSIsInNoZWV0cyIsInBlb3BsZSIsImdldERhdGEiLCJwbGF5ZXJzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsaUJBQU1BLEtBQU4sQ0FBWSxVQUFDQyxDQUFELEVBQU87QUFDbEIsMkJBQWVDLElBQWY7QUFDQSx5QkFBYUEsSUFBYjtBQUNBLGtCQUFNQyxZQUFOLENBQW1CLGdCQUFNQyxJQUFOLENBQVcsYUFBWCxDQUFuQjtBQUNBLEVBSkQsRTs7Ozs7Ozs7Ozs7Ozs7QUNKQTs7Ozs7Ozs7QUFFQSxLQUFNQyxVQUFVO0FBQ1osYUFBUyxpSEFERztBQUVaLGFBQVMsaUhBRkc7QUFHWixhQUFTO0FBSEcsRUFBaEI7O0tBTXFCQyxRO0FBQ2pCLHlCQUFjO0FBQUE7QUFFYjs7OztnQ0FFRztBQUFBOztBQUNBLDZCQUFNRixJQUFOLENBQVcsY0FBWCxFQUEyQkcsZ0JBQTNCLENBQTRDLE9BQTVDLEVBQ0EsVUFBQ04sQ0FBRCxFQUFPO0FBQ0gscUJBQUlBLEVBQUVPLE1BQUYsQ0FBU0MsT0FBVCxDQUFpQixpQkFBakIsQ0FBSixFQUF5QztBQUNyQyx5QkFBSUMsU0FBU1QsRUFBRU8sTUFBRixDQUFTRyxFQUFULENBQVlDLEtBQVosQ0FBa0IsR0FBbEIsRUFBdUIsQ0FBdkIsQ0FBYjtBQUNBLHFDQUFNUixJQUFOLENBQVcsaUJBQVgsRUFBOEJTLFNBQTlCLEdBQTBDLFlBQVlILE1BQXREO0FB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VSxpQkFBQ3pCLElBQUQsRUFBVTtBQUNuQix5QkFBSW9KLFVBQVVwSixLQUFLMkIsSUFBTCxDQUFVQyxLQUFWLENBQWdCc0MsR0FBaEIsQ0FBb0IsVUFBQ1QsRUFBRCxFQUFRO0FBQzFCLDZCQUFJNUIsVUFBVTRCLEdBQUczQixPQUFILENBQVdDLEVBQVgsQ0FBY3BDLEtBQWQsQ0FBb0IsR0FBcEIsQ0FBZDtBQUNBLGdDQUFPO0FBQ0gscUNBQVNrQyxRQUFRLENBQVIsRUFBV2xDLEtBQVgsQ0FBaUIsR0FBakIsRUFBc0IsQ0FBdEIsQ0FETjtBQUVILHNDQUFTa0MsUUFBUSxDQUFSLEVBQVdsQyxLQUFYLENBQWlCLEdBQWpCLEVBQXNCLENBQXRCLEVBQXlCd0MsSUFBekIsRUFGTjtBQUdILDRDQUFnQk4sUUFBUSxDQUFSLEVBQVdsQyxLQUFYLENBQWlCLEdBQWpCLEVBQXNCLENBQXRCO0FBSGIsMEJBQVA7QUFLSCxzQkFQQyxDQUFkO0FBUUE4SSwrQkFBVTdJLFNBQVYsR0FBc0JNLFNBQVMsRUFBQyxTQUFVa0osT0FBWCxFQUFULENBQXRCO0FBQ0E7QUFaWSxjQUFQLENBQVA7QUFjRzs7Ozs7O21CQWpDZ0JGLE0iLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgN2NhYTU1NTliYTlhZDI1MjIyNjQiLCJpbXBvcnQgZml4dHVyZXMgZnJvbSAnLi9maXh0dXJlcyc7XG5pbXBvcnQgcGVvcGxlIGZyb20gJy4vcGVvcGxlJ1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vVXRpbHMnO1xuXG51dGlscy5yZWFkeSgoZSkgPT4ge1xuXHRuZXcgZml4dHVyZXMoKS5pbml0KCk7XG5cdG5ldyBwZW9wbGUoKS5pbml0KCk7XG5cdHV0aWxzLnRyaWdnZXJDbGljayh1dGlscy5ieUlkKCdzZWFzb24tMjAxNycpKTtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2djYy5qcyIsImltcG9ydCB1dGlscyBmcm9tICcuL1V0aWxzJztcblxuY29uc3Qgc2Vhc29ucyA9IHtcbiAgICBcIjIwMTVcIiA6IFwiaHR0cHM6Ly9zcHJlYWRzaGVldHMuZ29vZ2xlLmNvbS9mZWVkcy9saXN0LzFMZTBUTDBTYWpVS1d5cW56U1F1Unl1NGMtQUNkb1FSOUZWX1lYUEx0T3N3LzEvcHVibGljL2Jhc2ljP2FsdD1qc29uXCIsXG4gICAgXCIyMDE2XCIgOiBcImh0dHBzOi8vc3ByZWFkc2hlZXRzLmdvb2dsZS5jb20vZmVlZHMvbGlzdC8xcnM4ZmFlUi1VY3hxekhaV0lLQm1iUlF2M0txbTR5bl9ScW9sbGVfeXlLcy8xL3B1YmxpYy9iYXNpYz9hbHQ9anNvblwiLFxuICAgIFwiMjAxN1wiIDogXCJodHRwczovL3NwcmVhZHNoZWV0cy5nb29nbGUuY29tL2ZlZWRzL2xpc3QvMXplbk9nVUxLRDVmSUFvQndhbkhqcnJTQ0R2VTdNSGg0QWo3djQ3WGJib2MvMS9wdWJsaWMvYmFzaWM/YWx0PWpzb25cIlxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZml4dHVyZXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIFxuICAgIH1cblxuXHRpbml0KCkge1xuICAgICAgICB1dGlscy5ieUlkKCdzZWFzb25zLWxpc3QnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFxuICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0Lm1hdGNoZXMoJy5zZWFzb25zLXNlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlYXNvbiA9IGUudGFyZ2V0LmlkLnNwbGl0KCctJylbMV07XG4gICAgICAgICAgICAgICAgdXRpbHMuYnlJZCgnc2Vhc29uLXNlbGVjdGVkJykuaW5uZXJIVE1MID0gJ1NlYXNvbiAnICsgc2Vhc29uO1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEZpeHR1cmVEYXRhKHNlYXNvbik7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdXRpbHMuYnlJZCgndG9VcGNvbWluZycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgXG4gICAgICAgICAgICB1dGlscy50YWJVSSh1dGlscy5ieUlkKCdmaXh0dXJlc0lubmVyQ29sJyksIHV0aWxzLmJ5SWQoJ2ZpeHR1cmVzTGlzdCcpKSk7XG5cbiAgICAgICAgdXRpbHMuYnlJZCgndG9SZXN1bHRzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBcbiAgICAgICAgICAgIHV0aWxzLnRhYlVJKHV0aWxzLmJ5SWQoJ2ZpeHR1cmVzSW5uZXJDb2wnKSwgdXRpbHMuYnlJZCgncmVzdWx0c0xpc3QnKSkpOyAgICBcblxuXHR9O1xuXG4gICAgcmVuZGVyRml4dHVyZXMoZGF0YSwgZmlsdGVyZm4sIHRlbXBsYXRlLCBub1N0ciwgY29udGFpbmVySWQsIHNvcnRmbikge1xuICAgICAgICBkYXRhID0gZGF0YS5maWx0ZXIoZmlsdGVyZm4pO1xuICAgICAgICBpZiAoc29ydGZuKVxuICAgICAgICAgICAgZGF0YS5zb3J0KHNvcnRmbik7XG5cbiAgICAgICAgbGV0IGZpeHR1cmVDb250YWluZXIgPSB1dGlscy5ieUlkKGNvbnRhaW5lcklkKTtcbiAgICAgICAgZml4dHVyZUNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgZml4dHVyZUNvbnRhaW5lci5pbm5lckhUTUwgPSAgZGF0YS5sZW5ndGggPiAwID8gXG4gICAgICAgICAgICB0ZW1wbGF0ZSh7J21hdGNoJyA6IGRhdGF9KSA6IG5vU3RyIDtcbiAgICB9XG5cdFxuXHRyZW5kZXJGb3JtYXR0ZWREYXRhIChmb3JtYXRlZERhdGEpIHtcbiAgICAgICAgbGV0IHRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKHV0aWxzLmJ5SWQoXCJ1cGNvbWluZy1tYXRjaGVzXCIpLmlubmVySFRNTCk7XG5cdFx0dGhpcy5yZW5kZXJVcENvbWluZ0ZpeHR1cmVzKFxuICAgICAgICAgICAgICAgIGZvcm1hdGVkRGF0YSxcbiAgICAgICAgICAgICAgICB2ID0+IHYucmVzdWx0ID8gZmFsc2UgOiB0cnVlLCBcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J25vcmVzdWx0cyBjb2wtc20tMTInPjxwPjxiPk5vIFVwY29taW5nIG1hdGNoZXMgeWV0PC9iPjwvcD48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAnZml4dHVyZXNMaXN0Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyVXBDb21pbmdGaXh0dXJlcyhcbiAgICAgICAgICAgICAgICBmb3JtYXRlZERhdGEsXG4gICAgICAgICAgICAgICAgdiA9PiB2LnJlc3VsdCA/IHRydWUgOiBmYWxzZSwgXG4gICAgICAgICAgICAgICAgdGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdub3Jlc3VsdHMgY29sLXNtLTEyJz48cD48Yj5ObyBSZXN1bHRzIHlldDwvYj48L3A+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgJ3Jlc3VsdHNMaXN0JyxcbiAgICAgICAgICAgICAgICAoYSxiKSA9PiBuZXcgRGF0ZShiLmRhdGUpIC0gbmV3IERhdGUoYS5kYXRlKSk7ICAgICAgICAgICAgICAgIFxuXHR9O1xuXHRcblx0Z2V0Rml4dHVyZURhdGEoc2Vhc29uKSB7XG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzO1xuXHRcdHZhciBsaW5rID0gc2Vhc29uc1tzZWFzb25dO1xuXHRcdCQuYWpheCh7XG5cdFx0XHR1cmwgOiBsaW5rLCBcblx0XHRcdHN1Y2Nlc3MgOiAoZGF0YSkgPT4ge1xuXHRcdFx0XHR2YXIgZm9ybWF0ZWREYXRhID0gW107XG5cdFx0XHRcdGZvcihsZXQgaSA9IDAgOyBpIDwgZGF0YS5mZWVkLmVudHJ5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdCAgIGxldCByb3dDb2xzID0gZGF0YS5mZWVkLmVudHJ5W2ldLmNvbnRlbnQuJHQuc3BsaXQoJywnKTtcblx0XHRcdFx0ICAgbGV0IF9kYXRhID0ge307XG5cdFx0XHRcdCAgIGZvcihsZXQgaiA9IDA7IGogPCByb3dDb2xzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0ICAgbGV0IGl0ZW0gPSByb3dDb2xzW2pdLnRyaW0oKTtcblx0XHRcdFx0XHQgICBsZXQgaW5kZXggPSBpdGVtLmluZGV4T2YoJzonKTtcblx0XHRcdFx0XHQgICBfZGF0YVtpdGVtLnN1YnN0cmluZygwLGluZGV4KV0gPSBpdGVtLnN1YnN0cmluZyhpbmRleCsxKS50cmltKCk7XG5cdFx0XHRcdCAgIH1cblx0XHRcdFx0ICAgZm9ybWF0ZWREYXRhLnB1c2goX2RhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMucmVuZGVyRm9ybWF0dGVkRGF0YShmb3JtYXRlZERhdGEpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2ZpeHR1cmVzLmpzIiwiLy8gdGhpcyBjbGFzcyBjYW4gYmUgYnJva2VuIHVwIGludG8gbXVsdGlwbGUgY29tcG9uZW50cyBhcyBpcyByZXF1aXJlZFxuLy8gYXQgYSBsYXRlciBzdGFnZVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbHMge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcblxuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgIH0gICAgXG5cbiAgICBzdGF0aWMgY2xvbmVGb3JtT3B0aW9ucyhmb3JtRWwsIG9wdGlvbnMsIGVsZW1lbnRzKSB7XG4gICAgICAgIHJldHVybiBmb3JtRWwuaW5uZXJIVE1MO1xuICAgIH1cblxuICAgIHN0YXRpYyBtb2RpZnlBbmRTdWJtaXRGb3JtKGZvcm1FbCwgaW5wdXRzLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgICAgIGZvcm0uc2V0QXR0cmlidXRlKCdhY3Rpb24nLCBmb3JtRWwuZ2V0QXR0cmlidXRlKCdhY3Rpb24nKSk7XG4gICAgICAgIGZvcm0uc2V0QXR0cmlidXRlKCdtZXRob2QnLCBmb3JtRWwuZ2V0QXR0cmlidXRlKCdtZXRob2QnKSk7XG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKGVsKSA9PiBmb3JtLnNldEF0dHJpYnV0ZShlbCwgb3B0aW9uc1tlbF0pKTtcbiAgICAgICAgZm9ybS5pbm5lckhUTUwgPSBpbnB1dHM7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gICAgICAgIHJldHVybiBmb3JtO1xuICAgIH1cblxuICAgIHN0YXRpYyBtYWtlR3JvdXBlZERyb3BEb3duIChkYXRhLCBwcm9wcyA9IHsgJ25hbWUnIDogJyd9LCBmbiA9IGZ1bmN0aW9uKG5hbWUpIHsgcmV0dXJuIG5hbWUgfSkge1xuXHRcdHZhciBodG1sID0gXCJcIjtcblx0XHRpZiAocHJvcHMubGFiZWwpIHtcblx0XHRcdGh0bWwgPSAnPHAgY2xhc3M9XCJsYWJlbFwiPicgKyBwcm9wcy5sYWJlbCArICc8L3A+JzsgXG5cdFx0fVxuXG5cdFx0dmFyIG9wdGlvbnNGbiA9IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdHJldHVybiBPYmplY3Qua2V5cyhkYXRhKS5tYXAoZnVuY3Rpb24oZWwpe1xuXHRcdFx0XHR2YXIgaWQgPSBmbihlbCk7XG5cdFx0XHRcdHJldHVybiAnPG9wdGlvbiB2YWx1ZT1cIicgKyBlbCArICdcIiBpZD1cIicgKyBpZCArICdcIicgXG5cdFx0XHRcdFx0XHRcdCsgJz4nICsgZGF0YVtlbF0gXG5cdFx0XHRcdFx0KyAnPC9vcHRpb24+Jztcblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHR2YXIgZ3JvdXBzID0gXG5cdFx0T2JqZWN0LmtleXMoZGF0YSkubWFwKGZ1bmN0aW9uKGtleSl7XG5cdFx0XHRyZXR1cm4gJzxvcHRncm91cCBsYWJlbD1cIicgKyBrZXkgKyAnXCI+JyBcblx0XHRcdFx0XHQrIG9wdGlvbnNGbihkYXRhW2tleV0pLmpvaW4oJycpIFxuXHRcdFx0XHRcdCsgJzwvb3B0Z3JvdXA+Jztcblx0XHR9KTtcblxuXHRcdGh0bWwgPSBodG1sICsgJzxwIGNsYXNzPVwiYnVpbGRlclwiPjxzZWxlY3QgbmFtZT1cIicgKyBwcm9wcy5uYW1lKyAnXCI+JyBcblx0XHRcdFx0XHRcdCsgZ3JvdXBzLmpvaW4oJycpICArICc8L3NlbGVjdD4nXG5cdFx0XHRcdFx0KyAnPC9wPicgXG5cdFx0cmV0dXJuIGh0bWw7XG5cdH07XG5cbiAgICBzdGF0aWMgYnlJZChpZCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBieVNlbGVjdG9yKHNlbGVjdG9yLCBhbGwgPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gYWxsID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikgXG4gICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzaW1wbGVEcm9wRG93bkJ1aWxkZXIoZGF0YSwgcHJvcHMgPSB7ICduYW1lJyA6ICcnfSkge1xuICAgICAgICBsZXQgaHRtbCA9ICcnO1xuICAgICAgICBpZiAocHJvcHMubGFiZWwpIHtcbiAgICAgICAgICAgIGh0bWwgPSAnPHAgY2xhc3M9XCJsYWJlbFwiPicgKyBwcm9wcy5sYWJlbCArICc8L3A+JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHRtbCArIFxuICAgICAgICAgICAgJzxwIGNsYXNzPVwiYnVpbGRlclwiPidcbiAgICAgICAgICAgICsgJzxzZWxlY3QgbmFtZT1cIicgKyBwcm9wcy5uYW1lICsgJ1wiPidcbiAgICAgICAgICAgICAgICArIE9iamVjdC5rZXlzKGRhdGEuc2VsZWN0cykubWFwKChlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8b3B0aW9uIHZhbHVlPVwiJyArIGVsICsgJ1wiJyBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICsgKGRhdGEuZGVmID09PSBlbCA/ICdzZWxlY3RlZD1cInNlbGVjdGVkXCInIDogJycpXG4gICAgICAgICAgICAgICAgICAgICAgICArJz4nICsgZGF0YS5zZWxlY3RzW2VsXS5sYWJlbCArICc8L29wdGlvbj4nO1xuICAgICAgICAgICAgICAgICAgICB9KS5qb2luKCcnKVxuICAgICAgICAgICAgKyAnPC9zZWxlY3Q+PC9wPic7XG4gICAgfVxuXG4gICAgc3RhdGljIHNlbGVjdFZhbHVlKHNlbGVjdFNlbGVjdG9yLCBvcHRpb25TZWxlY3Rvcikge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdFNlbGVjdG9yKVxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3Iob3B0aW9uU2VsZWN0b3IpXG4gICAgICAgICAgICAuc2VsZWN0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHN0YXRpYyBzeW5jRmllbGRzKG5ld0Zvcm0sIGZvcm0sIHNlbGVjdG9ycykge1xuICAgICAgICBzZWxlY3RvcnMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGZvcm0ucXVlcnlTZWxlY3RvckFsbChlbCksIChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIik7XG4gICAgICAgICAgICAgICAgbmV3Rm9ybS5xdWVyeVNlbGVjdG9yKGVsICsgJ1tuYW1lPScgKyBuYW1lICsgJ10nKS52YWx1ZSA9IGVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGhpZGVFbGVtZW50c0J5SWQoaWRzX2FycmF5KSBcbiAgICB7XG4gICAgICAgIHRoaXMuaGlkZUVsZW1lbnRzKGlkc19hcnJheS5tYXAoKGlkKSA9PiB0aGlzLmJ5SWQoaWQpKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGhpZGVFbGVtZW50cyhlbGVtZW50cykge1xuICAgICAgICBmb3IobGV0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVDbGFzc2VzRnJvbUVsZW1lbnRzKGVsQ29sbGVjdGlvbiwgY2xhc3Nlcykge1xuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGVsQ29sbGVjdGlvbiwgKGVsKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzZXMoZWwsY2xhc3Nlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVDbGFzc2VzIChlbCwgY2xhc3Nlcykge1xuICAgICAgICBjbGFzc2VzLmZvckVhY2goZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKGVsLGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlQ2xhc3MoZWwsIGNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZWwuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3NOYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxldCBjbGFzc2VzID0gZWwuY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICBlbC5jbGFzc05hbWUgPSBjbGFzc2VzLnNwbGljZShjbGFzc2VzLmluZGV4T2YoY2xhc3NOYW1lKSwgMSkuam9pbignICcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgIHN0YXRpYyBoYXNDbGFzcyhlbCxjbGFzc05hbWUpIHtcbiAgICAgICAgcmV0dXJuIGVsLmNsYXNzTGlzdCA/IGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpIDogXG4gICAgICAgICAgICBlbC5jbGFzc05hbWUuaW5kZXhPZihjbGFzc05hbWUpICE9PSAtMTtcbiAgICB9XG5cbiAgICAgc3RhdGljIGFkZENsYXNzKGVsLCBjbGFzc05hbWUpIHtcbiAgICAgICAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGVsLmNsYXNzTmFtZS5pbmRleE9mKGNsYXNzTmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUgKyAnICcgKyBjbGFzc05hbWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAgc3RhdGljIGFkZENsYXNzVG9FbGVtZW50cyhjb2xsZWN0aW9uLCBjbGFzc05hbWUpIHtcbiAgICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoY29sbGVjdGlvbiwgKGVsKSA9PiB0aGlzLmFkZENsYXNzKGVsLCBjbGFzc05hbWUpKTtcbiAgICB9ICAgIFxuXG4gICAgc3RhdGljIHRyaWdnZXJDbGljayhlbCwgY2FuY2VsYWJsZSA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBldmVudCA9IG5ldyBNb3VzZUV2ZW50KFwiY2xpY2tcIiwge1wiYnViYmxlc1wiOnRydWUsIFwiY2FuY2VsYWJsZVwiOmNhbmNlbGFibGV9KTtcbiAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfSAgICBcblxuICAgIHN0YXRpYyB0cmlnZ2VyTmF0aXZlKGVsLCBldmVudE5hbWUpIHtcbiAgICAgICAgbGV0IGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgICAgZXZlbnQuaW5pdEV2ZW50KGV2ZW50TmFtZSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZmluZFBhcmVudCh0YXJnZXQsIHNlbGVjdG9yKSB7XG4gICAgICAgIGlmICgnQk9EWScgPT09IHRhcmdldC50YWdOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kUGFyZW50KHRhcmdldC5wYXJlbnROb2RlLCBzZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvd0VsZW1lbnRzQnlJZChhcnIpIHtcbiAgICAgICAgYXJyLmZvckVhY2goKGlkKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNob3dFbGVtZW50KHRoaXMuYnlJZChpZCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvd0VsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvd0VsZW1lbnRzKGVsZW1lbnRDb2xsZWN0aW9uKSB7XG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGxcbiAgICAgICAgKGVsZW1lbnRDb2xsZWN0aW9uLCAoZSkgPT4gdGhpcy5zaG93RWxlbWVudChlKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGhpZGVFbGVtZW50c0J5SWQoYXJyKSB7XG4gICAgICAgIGFyci5mb3JFYWNoKChpZCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5oaWRlRWxlbWVudCh0aGlzLmJ5SWQoaWQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICBzdGF0aWMgaGlkZUVsZW1lbnRzKGVsZW1lbnRDb2xsZWN0aW9uKSB7XG4gICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbFxuICAgICAgIChlbGVtZW50Q29sbGVjdGlvbiwgKGUpID0+IHRoaXMuaGlkZUVsZW1lbnQoZSkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBoaWRlRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cbi8vIHNpbWlsYXIgdG8ganF1ZXJ5IG9mZnNldCBtZXRob2RcbiAgICBzdGF0aWMgZ2V0UG9zaXRpb24odGFyZ2V0KSB7XG4gICAgICAgIGxldCBib3ggPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGxldCBkb2NFbGVtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9wOiBib3gudG9wICsgKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2NFbGVtLnNjcm9sbFRvcCkgLSAoZG9jRWxlbS5jbGllbnRUb3AgfHwgMCksXG4gICAgICAgICAgICBsZWZ0OiBib3gubGVmdCArICh3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jRWxlbS5zY3JvbGxMZWZ0KSAtIChkb2NFbGVtLmNsaWVudExlZnQgfHwgMClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbWF0Y2hlcyhlbGVtZW50LCBtYXApIHtcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhtYXApO1xuICAgICAgICBrZXlzLnNvbWUoKGVsKSA9PiB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5tYXRjaGVzKGVsKSkge1xuICAgICAgICAgICAgICAgIG1hcFtlbF0oZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVFbGVtZW50KGVsLCBhdHRyID0ge30pIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwpO1xuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGF0dHIpO1xuICAgICAgICBpZiAoa2V5cy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGtleXMuZm9yRWFjaCgoZSkgPT4gcmVzdWx0LnNldEF0dHJpYnV0ZShlLCBhdHRyW2VdKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNWYXJpYWJsZURlZmluZWQodmFyaWFibGUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YXJpYWJsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFyaWFibGUgIT09IG51bGxcbiAgICB9XG5cbiAgICBzdGF0aWMgbWFrZUdldE9SUG9zdCh1cmwgPSAnJywgYXR0ciA9IHt9KSB7XG4gICAgICAgIGlmICgnJyA9PT0gdXJsIHx8IE9iamVjdC5rZXlzKGF0dHIpLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbGV0IHFTdHIgPSBcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGF0dHIpLm1hcCgoZWwpID0+IGVsICsgJz0nICsgYXR0cltrZXldKS5qb2luKCcmJyk7XG4gICAgICAgIC8qXG5cdFx0ICogbm90IHN1cmUgd2hhdCBjb3VsZCBiZSB0aGUgYmVzdCBsZW5ndGguIFxuXHRcdCAqIGJ1dCBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQxNzE0Mi93aGF0LWlzLXRoZS1tYXhpbXVtLWxlbmd0aC1vZi1hLXVybC1pbi1kaWZmZXJlbnQtYnJvd3NlcnNcblx0XHQgKiBzYXlzIDIwMDAgY2hhcmFjdGVycy4gV2lsbCBncmFkdWFsbHkgaW5jcmVhc2UgdGhpcyBpZiBuZWVkZWRcblx0XHQgKi8gICAgICAgIFxuICAgICAgICBpZiAocVN0ci5sZW5ndGggPCA2MDApIHtcbiAgICAgICAgICAgIHVybCA9IHVybC5lbmRzV2l0aCgnLycpID8gdXJsIDogKHVybCArICcvJyk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHVybCArIChxU3RyLmxlbmd0aCA+IDAgPyAoJz8nICsgcVN0cikgOiAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgZm9ybSA9IHV0aWxzLmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nLCB7XG4gICAgICAgICAgICAgICAgJ21ldGhvZCcgOiAnUE9TVCcsICdhY3Rpb24nIDogdXJsIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhhdHRyKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgICAgdXRpbHMuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7XG4gICAgICAgICAgICAgICAgICAgICduYW1lJyA6IGVsLCAndmFsdWUnIDogYXR0cltlbF1cbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gICAgICAgICAgICBmb3JtLnN1Ym1pdCgpO1xuICAgICAgICAgICAgdXRpbHMucmVtb3ZlRWxlbWVudChmb3JtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyB0YWJVSShjb250YWluZXIsIHNob3dVcCkge1xuICAgICAgICByZXR1cm4gKGUpID0+IHtcbiAgICAgICAgICAgIGxldCBwYXJlbnQgPSBlLnRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzQ2xhc3MocGFyZW50LCAnYWN0aXZlJykpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzZXNGcm9tRWxlbWVudHMocGFyZW50LnBhcmVudC5jaGlsZHJlbiwgWydhY3RpdmUnXSk7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzKHBhcmVudCwgJ2FjdGl2ZScpO1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzc1RvRWxlbWVudHMoY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWItc2VjdGlvbicpLCAnaGlkZScpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhzaG93VXAsICdoaWRlJyk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHN0YXRpYyByZWFkeShmbikge1xuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPSAnbG9hZGluZycpe1xuICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmbik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL1V0aWxzLmpzIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vVXRpbHMnO1xuXG5jb25zdCBzaGVldHMgPSBbXG4gICAge1xuICAgICAgICAnY29udGFpbmVyJyA6ICdwbGF5ZXJzJyxcbiAgICAgICAgJ2xpbmsnIDogJ2h0dHBzOi8vc3ByZWFkc2hlZXRzLmdvb2dsZS5jb20vZmVlZHMvbGlzdC8xZFBic0hzZFNnUW80clVueGctcnpmWW15MHcxN3ZUSnR0SFo0UFJNczNVYy8xL3B1YmxpYy9iYXNpYz9hbHQ9anNvbicgXG4gICAgfSxcbiAgICB7XG4gICAgICAgICdjb250YWluZXInIDogJ2FkbWluJyxcbiAgICAgICAgJ2xpbmsnIDogJ2h0dHBzOi8vc3ByZWFkc2hlZXRzLmdvb2dsZS5jb20vZmVlZHMvbGlzdC8xSjNxbnFESHROWHNRQllDamhrVzltUnlJeHdkaUlqeXBBa1pLcjhTeHNvcy8xL3B1YmxpYy9iYXNpYz9hbHQ9anNvbidcbiAgICB9XG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBwZW9wbGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgbGV0IHRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKHV0aWxzLmJ5SWQoXCJlbnRyeS10ZW1wbGF0ZVwiKS5pbm5lckhUTUwpO1xuICAgICAgICBzaGVldHMuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0YShlbC5saW5rLCB1dGlscy5ieUlkKGVsLmNvbnRhaW5lciksIHRlbXBsYXRlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXRpbHMuYnlJZCgndG9QbGF5ZXJzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBcbiAgICAgICAgICAgIHV0aWxzLnRhYlVJKHV0aWxzLmJ5SWQoJ3BsYXllcnNDb250YWluZXInKSwgdXRpbHMuYnlJZCgncGxheWVycycpKSk7XG5cbiAgICAgICAgdXRpbHMuYnlJZCgndG9NYW5hZ2VtZW50JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBcbiAgICAgICAgICAgIHV0aWxzLnRhYlVJKHV0aWxzLmJ5SWQoJ3BsYXllcnNDb250YWluZXInKSwgdXRpbHMuYnlJZCgnYWRtaW4nKSkpOyAgICAgICAgXG4gICAgfVxuXG4gICAgZ2V0RGF0YSh1cmwsIGNvbnRhaW5lciwgdGVtcGxhdGUpIHtcblx0XHRyZXR1cm4gJC5hamF4KHtcblx0XHRcdHVybCA6IHVybCwgXG5cdFx0XHRzdWNjZXNzIDogKGRhdGEpID0+IHtcblx0XHRcdFx0bGV0IHBsYXllcnMgPSBkYXRhLmZlZWQuZW50cnkubWFwKChlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcm93Q29scyA9IGVsLmNvbnRlbnQuJHQuc3BsaXQoJywnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICduYW1lJyA6IHJvd0NvbHNbMF0uc3BsaXQoXCI6XCIpWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ltYWdlJzogcm93Q29sc1sxXS5zcGxpdChcIjpcIilbMV0udHJpbSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJyA6IHJvd0NvbHNbMl0uc3BsaXQoXCI6XCIpWzFdXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSk7XG5cdFx0XHRcdGNvbnRhaW5lci5pbm5lckhUTUwgPSB0ZW1wbGF0ZSh7XCJlbnRyeVwiIDogcGxheWVyc30pO1xuXHRcdFx0fVxuXHRcdH0pOyBcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGVvcGxlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==