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
		var postsTemplate = Handlebars.compile(_Utils2.default.byId('blog-posts').innerHTML);
		$.ajax({
			'url': '/news.json',
			'dataType': 'json',
			success: function success(data) {
				console.log(data);
				var div = _Utils2.default.createElement('div');
				div.innerHTML = postsTemplate({ "entry": data.item });
				_Utils2.default.byId('blogsCol').appendChild(div);
			}
		});
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
	            this.renderFixtures(formatedData, function (v) {
	                return v.result ? false : true;
	            }, template, "<div class='noresults col-sm-12'><p><b>No Upcoming matches yet</b></p></div>", 'fixturesList');
	            this.renderFixtures(formatedData, function (v) {
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
	                        _data.practice = _data.tournament === 'Practice Session';
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
	
	                _this9.removeClassesFromElements(parent.parentNode.children, ['active']);
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
	                            'description': rowCols[2].split(":")[1],
	                            'url': rowCols.length === 4 ? rowCols[3].trim().split("url:")[1] : ''
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTg3Y2VjMzk4MTI2NGFhYTU2OTUiLCJ3ZWJwYWNrOi8vLy4vZ2NjLmpzIiwid2VicGFjazovLy8uL2ZpeHR1cmVzLmpzIiwid2VicGFjazovLy8uL1V0aWxzLmpzIiwid2VicGFjazovLy8uL3Blb3BsZS5qcyJdLCJuYW1lcyI6WyJyZWFkeSIsImUiLCJpbml0IiwidHJpZ2dlckNsaWNrIiwiYnlJZCIsInBvc3RzVGVtcGxhdGUiLCJIYW5kbGViYXJzIiwiY29tcGlsZSIsImlubmVySFRNTCIsIiQiLCJhamF4Iiwic3VjY2VzcyIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiZGl2IiwiY3JlYXRlRWxlbWVudCIsIml0ZW0iLCJhcHBlbmRDaGlsZCIsInNlYXNvbnMiLCJmaXh0dXJlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0YXJnZXQiLCJtYXRjaGVzIiwic2Vhc29uIiwiaWQiLCJzcGxpdCIsInByZXZlbnREZWZhdWx0IiwiZ2V0Rml4dHVyZURhdGEiLCJ0YWJVSSIsImZpbHRlcmZuIiwidGVtcGxhdGUiLCJub1N0ciIsImNvbnRhaW5lcklkIiwic29ydGZuIiwiZmlsdGVyIiwic29ydCIsImZpeHR1cmVDb250YWluZXIiLCJsZW5ndGgiLCJmb3JtYXRlZERhdGEiLCJyZW5kZXJGaXh0dXJlcyIsInYiLCJyZXN1bHQiLCJhIiwiYiIsIkRhdGUiLCJkYXRlIiwiY29udGV4dCIsImxpbmsiLCJ1cmwiLCJpIiwiZmVlZCIsImVudHJ5Iiwicm93Q29scyIsImNvbnRlbnQiLCIkdCIsIl9kYXRhIiwiaiIsInRyaW0iLCJpbmRleCIsImluZGV4T2YiLCJzdWJzdHJpbmciLCJwcmFjdGljZSIsInRvdXJuYW1lbnQiLCJwdXNoIiwicmVuZGVyRm9ybWF0dGVkRGF0YSIsIlV0aWxzIiwiZWxlbWVudCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImZvcm1FbCIsIm9wdGlvbnMiLCJlbGVtZW50cyIsImlucHV0cyIsImZvcm0iLCJkb2N1bWVudCIsInNldEF0dHJpYnV0ZSIsImdldEF0dHJpYnV0ZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiZWwiLCJib2R5IiwicHJvcHMiLCJmbiIsIm5hbWUiLCJodG1sIiwibGFiZWwiLCJvcHRpb25zRm4iLCJtYXAiLCJncm91cHMiLCJrZXkiLCJqb2luIiwiZ2V0RWxlbWVudEJ5SWQiLCJzZWxlY3RvciIsImFsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJxdWVyeVNlbGVjdG9yIiwic2VsZWN0cyIsInNlbGVjdFNlbGVjdG9yIiwib3B0aW9uU2VsZWN0b3IiLCJzZWxlY3RlZCIsIm5ld0Zvcm0iLCJzZWxlY3RvcnMiLCJBcnJheSIsInByb3RvdHlwZSIsImNhbGwiLCJ2YWx1ZSIsImlkc19hcnJheSIsImhpZGVFbGVtZW50cyIsInN0eWxlIiwiZGlzcGxheSIsImVsQ29sbGVjdGlvbiIsImNsYXNzZXMiLCJyZW1vdmVDbGFzc2VzIiwicmVtb3ZlQ2xhc3MiLCJjbGFzc05hbWUiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJzcGxpY2UiLCJjb250YWlucyIsImFkZCIsImNvbGxlY3Rpb24iLCJhZGRDbGFzcyIsImNhbmNlbGFibGUiLCJldmVudCIsIk1vdXNlRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiZXZlbnROYW1lIiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJ0YWdOYW1lIiwiZmluZFBhcmVudCIsImFyciIsInNob3dFbGVtZW50IiwiZWxlbWVudENvbGxlY3Rpb24iLCJoaWRlRWxlbWVudCIsImJveCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImRvY0VsZW0iLCJkb2N1bWVudEVsZW1lbnQiLCJ0b3AiLCJ3aW5kb3ciLCJwYWdlWU9mZnNldCIsInNjcm9sbFRvcCIsImNsaWVudFRvcCIsImxlZnQiLCJwYWdlWE9mZnNldCIsInNjcm9sbExlZnQiLCJjbGllbnRMZWZ0Iiwic29tZSIsImF0dHIiLCJ2YXJpYWJsZSIsInFTdHIiLCJlbmRzV2l0aCIsImxvY2F0aW9uIiwiaHJlZiIsInV0aWxzIiwic3VibWl0IiwicmVtb3ZlRWxlbWVudCIsImNvbnRhaW5lciIsInNob3dVcCIsInBhcmVudCIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3Nlc0Zyb21FbGVtZW50cyIsImNoaWxkcmVuIiwiYWRkQ2xhc3NUb0VsZW1lbnRzIiwicmVhZHlTdGF0ZSIsInNoZWV0cyIsInBlb3BsZSIsImdldERhdGEiLCJwbGF5ZXJzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsaUJBQU1BLEtBQU4sQ0FBWSxVQUFDQyxDQUFELEVBQU87QUFDbEIsMkJBQWVDLElBQWY7QUFDQSx5QkFBYUEsSUFBYjtBQUNBLGtCQUFNQyxZQUFOLENBQW1CLGdCQUFNQyxJQUFOLENBQVcsYUFBWCxDQUFuQjtBQUNBLE1BQUlDLGdCQUFnQkMsV0FBV0MsT0FBWCxDQUFtQixnQkFBTUgsSUFBTixDQUFXLFlBQVgsRUFBeUJJLFNBQTVDLENBQXBCO0FBQ0FDLElBQUVDLElBQUYsQ0FBTztBQUNOLFVBQVEsWUFERjtBQUVOLGVBQVksTUFGTjtBQUdOQyxZQUFTLGlCQUFTQyxJQUFULEVBQWU7QUFDdkJDLFlBQVFDLEdBQVIsQ0FBWUYsSUFBWjtBQUNBLFFBQUlHLE1BQU0sZ0JBQU1DLGFBQU4sQ0FBb0IsS0FBcEIsQ0FBVjtBQUNBRCxRQUFJUCxTQUFKLEdBQWdCSCxjQUFjLEVBQUMsU0FBVU8sS0FBS0ssSUFBaEIsRUFBZCxDQUFoQjtBQUNBLG9CQUFNYixJQUFOLENBQVcsVUFBWCxFQUF1QmMsV0FBdkIsQ0FBbUNILEdBQW5DO0FBQ0E7QUFSSyxHQUFQO0FBVUEsRUFmRCxFOzs7Ozs7Ozs7Ozs7OztBQ0pBOzs7Ozs7OztBQUVBLEtBQU1JLFVBQVU7QUFDWixhQUFTLGlIQURHO0FBRVosYUFBUyxpSEFGRztBQUdaLGFBQVM7QUFIRyxFQUFoQjs7S0FNcUJDLFE7QUFDakIseUJBQWM7QUFBQTtBQUViOzs7O2dDQUVHO0FBQUE7O0FBQ0EsNkJBQU1oQixJQUFOLENBQVcsY0FBWCxFQUEyQmlCLGdCQUEzQixDQUE0QyxPQUE1QyxFQUNBLFVBQUNwQixDQUFELEVBQU87QUFDSCxxQkFBSUEsRUFBRXFCLE1BQUYsQ0FBU0MsT0FBVCxDQUFpQixpQkFBakIsQ0FBSixFQUF5QztBQUNyQyx5QkFBSUMsU0FBU3ZCLEVBQUVxQixNQUFGLENBQVNHLEVBQVQsQ0FBWUMsS0FBWixDQUFrQixHQUFsQixFQUF1QixDQUF2QixDQUFiO0FBQ0EscUNBQU10QixJQUFOLENBQVcsaUJBQVgsRUFBOEJJLFNBQTlCLEdBQTBDLFlBQVlnQixNQUF0RDtBQUNBdkIsdUJBQUUwQixjQUFGO0FBQ0EsMkJBQUtDLGNBQUwsQ0FBb0JKLE1BQXBCO0FBQ0g7QUFDSixjQVJEO0FBU0EsNkJBQU1wQixJQUFOLENBQVcsWUFBWCxFQUF5QmlCLGdCQUF6QixDQUEwQyxPQUExQyxFQUNJLGdCQUFNUSxLQUFOLENBQVksZ0JBQU16QixJQUFOLENBQVcsa0JBQVgsQ0FBWixFQUE0QyxnQkFBTUEsSUFBTixDQUFXLGNBQVgsQ0FBNUMsQ0FESjs7QUFHQSw2QkFBTUEsSUFBTixDQUFXLFdBQVgsRUFBd0JpQixnQkFBeEIsQ0FBeUMsT0FBekMsRUFDSSxnQkFBTVEsS0FBTixDQUFZLGdCQUFNekIsSUFBTixDQUFXLGtCQUFYLENBQVosRUFBNEMsZ0JBQU1BLElBQU4sQ0FBVyxhQUFYLENBQTVDLENBREo7QUFHTjs7O3dDQUVpQlEsSSxFQUFNa0IsUSxFQUFVQyxRLEVBQVVDLEssRUFBT0MsVyxFQUFhQyxNLEVBQVE7QUFDakV0QixvQkFBT0EsS0FBS3VCLE1BQUwsQ0FBWUwsUUFBWixDQUFQO0FBQ0EsaUJBQUlJLE1BQUosRUFDSXRCLEtBQUt3QixJQUFMLENBQVVGLE1BQVY7O0FBRUosaUJBQUlHLG1CQUFtQixnQkFBTWpDLElBQU4sQ0FBVzZCLFdBQVgsQ0FBdkI7QUFDQUksOEJBQWlCN0IsU0FBakIsR0FBNkIsRUFBN0I7QUFDQTZCLDhCQUFpQjdCLFNBQWpCLEdBQThCSSxLQUFLMEIsTUFBTCxHQUFjLENBQWQsR0FDMUJQLFNBQVMsRUFBQyxTQUFVbkIsSUFBWCxFQUFULENBRDBCLEdBQ0dvQixLQURqQztBQUVIOzs7NkNBRWlCTyxZLEVBQWM7QUFDNUIsaUJBQUlSLFdBQVd6QixXQUFXQyxPQUFYLENBQW1CLGdCQUFNSCxJQUFOLENBQVcsa0JBQVgsRUFBK0JJLFNBQWxELENBQWY7QUFDTixrQkFBS2dDLGNBQUwsQ0FDY0QsWUFEZCxFQUVjO0FBQUEsd0JBQUtFLEVBQUVDLE1BQUYsR0FBVyxLQUFYLEdBQW1CLElBQXhCO0FBQUEsY0FGZCxFQUdjWCxRQUhkLEVBSWMsOEVBSmQsRUFLYyxjQUxkO0FBTU0sa0JBQUtTLGNBQUwsQ0FDUUQsWUFEUixFQUVRO0FBQUEsd0JBQUtFLEVBQUVDLE1BQUYsR0FBVyxJQUFYLEdBQWtCLEtBQXZCO0FBQUEsY0FGUixFQUdRWCxRQUhSLEVBSVEscUVBSlIsRUFLUSxhQUxSLEVBTVEsVUFBQ1ksQ0FBRCxFQUFHQyxDQUFIO0FBQUEsd0JBQVMsSUFBSUMsSUFBSixDQUFTRCxFQUFFRSxJQUFYLElBQW1CLElBQUlELElBQUosQ0FBU0YsRUFBRUcsSUFBWCxDQUE1QjtBQUFBLGNBTlI7QUFPTjs7O3dDQUVjdEIsTSxFQUFRO0FBQUE7O0FBQ3RCLGlCQUFJdUIsVUFBVSxJQUFkO0FBQ0EsaUJBQUlDLE9BQU83QixRQUFRSyxNQUFSLENBQVg7QUFDQWYsZUFBRUMsSUFBRixDQUFPO0FBQ051QyxzQkFBTUQsSUFEQTtBQUVOckMsMEJBQVUsaUJBQUNDLElBQUQsRUFBVTtBQUNuQix5QkFBSTJCLGVBQWUsRUFBbkI7QUFDQSwwQkFBSSxJQUFJVyxJQUFJLENBQVosRUFBZ0JBLElBQUl0QyxLQUFLdUMsSUFBTCxDQUFVQyxLQUFWLENBQWdCZCxNQUFwQyxFQUE0Q1ksR0FBNUMsRUFBaUQ7QUFDOUMsNkJBQUlHLFVBQVV6QyxLQUFLdUMsSUFBTCxDQUFVQyxLQUFWLENBQWdCRixDQUFoQixFQUFtQkksT0FBbkIsQ0FBMkJDLEVBQTNCLENBQThCN0IsS0FBOUIsQ0FBb0MsR0FBcEMsQ0FBZDtBQUNBLDZCQUFJOEIsUUFBUSxFQUFaO0FBQ0EsOEJBQUksSUFBSUMsSUFBSSxDQUFaLEVBQWVBLElBQUlKLFFBQVFmLE1BQTNCLEVBQW1DbUIsR0FBbkMsRUFBd0M7QUFDdkMsaUNBQUl4QyxPQUFPb0MsUUFBUUksQ0FBUixFQUFXQyxJQUFYLEVBQVg7QUFDQSxpQ0FBSUMsUUFBUTFDLEtBQUsyQyxPQUFMLENBQWEsR0FBYixDQUFaO0FBQ0FKLG1DQUFNdkMsS0FBSzRDLFNBQUwsQ0FBZSxDQUFmLEVBQWlCRixLQUFqQixDQUFOLElBQWlDMUMsS0FBSzRDLFNBQUwsQ0FBZUYsUUFBTSxDQUFyQixFQUF3QkQsSUFBeEIsRUFBakM7QUFDQTtBQUNXRiwrQkFBTU0sUUFBTixHQUFpQk4sTUFBTU8sVUFBTixLQUFxQixrQkFBdEM7QUFDWnhCLHNDQUFheUIsSUFBYixDQUFrQlIsS0FBbEI7QUFDRjtBQUNELDRCQUFLUyxtQkFBTCxDQUF5QjFCLFlBQXpCO0FBQ0E7QUFoQkssY0FBUDtBQWtCQTs7Ozs7O21CQXhFbUJuQixROzs7Ozs7Ozs7Ozs7Ozs7O0FDUnJCO0FBQ0E7S0FDcUI4QyxLO0FBQ2pCLHNCQUFlO0FBQUE7QUFFZDs7Ozt1Q0FFb0JDLE8sRUFBUztBQUMxQkEscUJBQVFDLFVBQVIsQ0FBbUJDLFdBQW5CLENBQStCRixPQUEvQjtBQUNIOzs7MENBRXVCRyxNLEVBQVFDLE8sRUFBU0MsUSxFQUFVO0FBQy9DLG9CQUFPRixPQUFPOUQsU0FBZDtBQUNIOzs7NkNBRTBCOEQsTSxFQUFRRyxNLEVBQXNCO0FBQUEsaUJBQWRGLE9BQWMsdUVBQUosRUFBSTs7QUFDckQsaUJBQUlHLE9BQU9DLFNBQVMzRCxhQUFULENBQXVCLE1BQXZCLENBQVg7QUFDQTBELGtCQUFLRSxZQUFMLENBQWtCLFFBQWxCLEVBQTRCTixPQUFPTyxZQUFQLENBQW9CLFFBQXBCLENBQTVCO0FBQ0FILGtCQUFLRSxZQUFMLENBQWtCLFFBQWxCLEVBQTRCTixPQUFPTyxZQUFQLENBQW9CLFFBQXBCLENBQTVCO0FBQ0FDLG9CQUFPQyxJQUFQLENBQVlSLE9BQVosRUFBcUJTLE9BQXJCLENBQTZCLFVBQUNDLEVBQUQ7QUFBQSx3QkFBUVAsS0FBS0UsWUFBTCxDQUFrQkssRUFBbEIsRUFBc0JWLFFBQVFVLEVBQVIsQ0FBdEIsQ0FBUjtBQUFBLGNBQTdCO0FBQ0FQLGtCQUFLbEUsU0FBTCxHQUFpQmlFLE1BQWpCO0FBQ0FFLHNCQUFTTyxJQUFULENBQWNoRSxXQUFkLENBQTBCd0QsSUFBMUI7QUFDQSxvQkFBT0EsSUFBUDtBQUNIOzs7NkNBRTJCOUQsSSxFQUFtRTtBQUFBLGlCQUE3RHVFLEtBQTZELHVFQUFyRCxFQUFFLFFBQVMsRUFBWCxFQUFxRDtBQUFBLGlCQUFyQ0MsRUFBcUMsdUVBQWhDLFVBQVNDLElBQVQsRUFBZTtBQUFFLHdCQUFPQSxJQUFQO0FBQWEsY0FBRTs7QUFDakcsaUJBQUlDLE9BQU8sRUFBWDtBQUNBLGlCQUFJSCxNQUFNSSxLQUFWLEVBQWlCO0FBQ2hCRCx3QkFBTyxzQkFBc0JILE1BQU1JLEtBQTVCLEdBQW9DLE1BQTNDO0FBQ0E7O0FBRUQsaUJBQUlDLFlBQVksU0FBWkEsU0FBWSxDQUFTNUUsSUFBVCxFQUFlO0FBQzlCLHdCQUFPa0UsT0FBT0MsSUFBUCxDQUFZbkUsSUFBWixFQUFrQjZFLEdBQWxCLENBQXNCLFVBQVNSLEVBQVQsRUFBWTtBQUN4Qyx5QkFBSXhELEtBQUsyRCxHQUFHSCxFQUFILENBQVQ7QUFDQSw0QkFBTyxvQkFBb0JBLEVBQXBCLEdBQXlCLFFBQXpCLEdBQW9DeEQsRUFBcEMsR0FBeUMsR0FBekMsR0FDRixHQURFLEdBQ0liLEtBQUtxRSxFQUFMLENBREosR0FFSixXQUZIO0FBR0Esa0JBTE0sQ0FBUDtBQU1BLGNBUEQ7O0FBU0EsaUJBQUlTLFNBQ0paLE9BQU9DLElBQVAsQ0FBWW5FLElBQVosRUFBa0I2RSxHQUFsQixDQUFzQixVQUFTRSxHQUFULEVBQWE7QUFDbEMsd0JBQU8sc0JBQXNCQSxHQUF0QixHQUE0QixJQUE1QixHQUNISCxVQUFVNUUsS0FBSytFLEdBQUwsQ0FBVixFQUFxQkMsSUFBckIsQ0FBMEIsRUFBMUIsQ0FERyxHQUVILGFBRko7QUFHQSxjQUpELENBREE7O0FBT0FOLG9CQUFPQSxPQUFPLG1DQUFQLEdBQTZDSCxNQUFNRSxJQUFuRCxHQUF5RCxJQUF6RCxHQUNESyxPQUFPRSxJQUFQLENBQVksRUFBWixDQURDLEdBQ2tCLFdBRGxCLEdBRUYsTUFGTDtBQUdBLG9CQUFPTixJQUFQO0FBQ0E7Ozs4QkFFYzdELEUsRUFBSTtBQUNaLG9CQUFPa0QsU0FBU2tCLGNBQVQsQ0FBd0JwRSxFQUF4QixDQUFQO0FBQ0g7OztvQ0FFaUJxRSxRLEVBQXVCO0FBQUEsaUJBQWJDLEdBQWEsdUVBQVAsS0FBTzs7QUFDckMsb0JBQU9BLE1BQU1wQixTQUFTcUIsZ0JBQVQsQ0FBMEJGLFFBQTFCLENBQU4sR0FDRG5CLFNBQVNzQixhQUFULENBQXVCSCxRQUF2QixDQUROO0FBRUg7OzsrQ0FFNEJsRixJLEVBQThCO0FBQUEsaUJBQXhCdUUsS0FBd0IsdUVBQWhCLEVBQUUsUUFBUyxFQUFYLEVBQWdCOztBQUN2RCxpQkFBSUcsT0FBTyxFQUFYO0FBQ0EsaUJBQUlILE1BQU1JLEtBQVYsRUFBaUI7QUFDYkQsd0JBQU8sc0JBQXNCSCxNQUFNSSxLQUE1QixHQUFvQyxNQUEzQztBQUNIO0FBQ0Qsb0JBQU9ELE9BQ0gscUJBREcsR0FFRCxnQkFGQyxHQUVrQkgsTUFBTUUsSUFGeEIsR0FFK0IsSUFGL0IsR0FHR1AsT0FBT0MsSUFBUCxDQUFZbkUsS0FBS3NGLE9BQWpCLEVBQTBCVCxHQUExQixDQUE4QixVQUFDUixFQUFELEVBQVE7QUFDaEMsd0JBQU8sb0JBQW9CQSxFQUFwQixHQUF5QjtBQUNoQztBQURPLG1CQUVOLEdBRk0sR0FFQXJFLEtBQUtzRixPQUFMLENBQWFqQixFQUFiLEVBQWlCTSxLQUZqQixHQUV5QixXQUZoQztBQUdILGNBSkgsRUFJS0ssSUFKTCxDQUlVLEVBSlYsQ0FISCxHQVFELGVBUk47QUFTSDs7O3FDQUVrQk8sYyxFQUFnQkMsYyxFQUFnQjtBQUMvQ3pCLHNCQUFTc0IsYUFBVCxDQUF1QkUsY0FBdkIsRUFDS0YsYUFETCxDQUNtQkcsY0FEbkIsRUFFS0MsUUFGTCxHQUVnQixJQUZoQjtBQUdIOzs7b0NBRWlCQyxPLEVBQVM1QixJLEVBQU02QixTLEVBQVc7QUFDeENBLHVCQUFVdkIsT0FBVixDQUFrQixjQUFNO0FBQ3BCd0IsdUJBQU1DLFNBQU4sQ0FBZ0J6QixPQUFoQixDQUF3QjBCLElBQXhCLENBQTZCaEMsS0FBS3NCLGdCQUFMLENBQXNCZixFQUF0QixDQUE3QixFQUF3RCxVQUFDZCxPQUFELEVBQWE7QUFDakUseUJBQUlrQixPQUFPbEIsUUFBUVUsWUFBUixDQUFxQixNQUFyQixDQUFYO0FBQ0F5Qiw2QkFBUUwsYUFBUixDQUFzQmhCLEtBQUssUUFBTCxHQUFnQkksSUFBaEIsR0FBdUIsR0FBN0MsRUFBa0RzQixLQUFsRCxHQUEwRHhDLFFBQVF3QyxLQUFsRTtBQUNILGtCQUhEO0FBSUgsY0FMRDtBQU1IOzs7MENBRXVCQyxTLEVBQ3hCO0FBQUE7O0FBQ0ksa0JBQUtDLFlBQUwsQ0FBa0JELFVBQVVuQixHQUFWLENBQWMsVUFBQ2hFLEVBQUQ7QUFBQSx3QkFBUSxNQUFLckIsSUFBTCxDQUFVcUIsRUFBVixDQUFSO0FBQUEsY0FBZCxDQUFsQjtBQUNIOzs7c0NBRW1CK0MsUSxFQUFVO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQzFCLHNDQUFtQkEsUUFBbkIsOEhBQTZCO0FBQUEseUJBQXJCTCxPQUFxQjs7QUFDekJBLDZCQUFRMkMsS0FBUixDQUFjQyxPQUFkLEdBQXdCLE1BQXhCO0FBQ0g7QUFIeUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUk3Qjs7O21EQUVnQ0MsWSxFQUFjQyxPLEVBQVM7QUFBQTs7QUFDcERULG1CQUFNQyxTQUFOLENBQWdCekIsT0FBaEIsQ0FBd0IwQixJQUF4QixDQUE2Qk0sWUFBN0IsRUFBMkMsVUFBQy9CLEVBQUQsRUFBUTtBQUMvQyx3QkFBS2lDLGFBQUwsQ0FBbUJqQyxFQUFuQixFQUFzQmdDLE9BQXRCO0FBQ0gsY0FGRDtBQUdIOzs7dUNBRXFCaEMsRSxFQUFJZ0MsTyxFQUFTO0FBQUE7O0FBQy9CQSxxQkFBUWpDLE9BQVIsQ0FBZ0IsYUFBSztBQUNqQix3QkFBS21DLFdBQUwsQ0FBaUJsQyxFQUFqQixFQUFvQmhGLENBQXBCO0FBQ0gsY0FGRDtBQUdIOzs7cUNBRWtCZ0YsRSxFQUFJbUMsUyxFQUFXO0FBQzlCLGlCQUFJbkMsR0FBR29DLFNBQVAsRUFBa0I7QUFDZHBDLG9CQUFHb0MsU0FBSCxDQUFhQyxNQUFiLENBQW9CRixTQUFwQjtBQUNILGNBRkQsTUFFTyxJQUFJbkMsR0FBR21DLFNBQUgsQ0FBYXhELE9BQWIsQ0FBcUJ3RCxTQUFyQixNQUFvQyxDQUFDLENBQXpDLEVBQTRDO0FBQy9DLHFCQUFJSCxVQUFVaEMsR0FBR21DLFNBQUgsQ0FBYTFGLEtBQWIsQ0FBbUIsR0FBbkIsQ0FBZDtBQUNBdUQsb0JBQUdtQyxTQUFILEdBQWVILFFBQVFNLE1BQVIsQ0FBZU4sUUFBUXJELE9BQVIsQ0FBZ0J3RCxTQUFoQixDQUFmLEVBQTJDLENBQTNDLEVBQThDeEIsSUFBOUMsQ0FBbUQsR0FBbkQsQ0FBZjtBQUNIO0FBQ0o7OztrQ0FFZ0JYLEUsRUFBR21DLFMsRUFBVztBQUMzQixvQkFBT25DLEdBQUdvQyxTQUFILEdBQWVwQyxHQUFHb0MsU0FBSCxDQUFhRyxRQUFiLENBQXNCSixTQUF0QixDQUFmLEdBQ0huQyxHQUFHbUMsU0FBSCxDQUFheEQsT0FBYixDQUFxQndELFNBQXJCLE1BQW9DLENBQUMsQ0FEekM7QUFFSDs7O2tDQUVnQm5DLEUsRUFBSW1DLFMsRUFBVztBQUM1QixpQkFBSW5DLEdBQUdvQyxTQUFQLEVBQWtCO0FBQ2RwQyxvQkFBR29DLFNBQUgsQ0FBYUksR0FBYixDQUFpQkwsU0FBakI7QUFDSCxjQUZELE1BRU8sSUFBSW5DLEdBQUdtQyxTQUFILENBQWF4RCxPQUFiLENBQXFCd0QsU0FBckIsTUFBb0MsQ0FBQyxDQUF6QyxFQUE0QztBQUMvQ25DLG9CQUFHbUMsU0FBSCxHQUFlbkMsR0FBR21DLFNBQUgsR0FBZSxHQUFmLEdBQXFCQSxTQUFwQztBQUNIO0FBQ0o7Ozs0Q0FFMEJNLFUsRUFBWU4sUyxFQUFXO0FBQUE7O0FBQzdDWixtQkFBTUMsU0FBTixDQUFnQnpCLE9BQWhCLENBQXdCMEIsSUFBeEIsQ0FBNkJnQixVQUE3QixFQUF5QyxVQUFDekMsRUFBRDtBQUFBLHdCQUFRLE9BQUswQyxRQUFMLENBQWMxQyxFQUFkLEVBQWtCbUMsU0FBbEIsQ0FBUjtBQUFBLGNBQXpDO0FBQ0o7OztzQ0FFbUJuQyxFLEVBQXdCO0FBQUEsaUJBQXBCMkMsVUFBb0IsdUVBQVAsS0FBTzs7QUFDeEMsaUJBQUlDLFFBQVEsSUFBSUMsVUFBSixDQUFlLE9BQWYsRUFBd0IsRUFBQyxXQUFVLElBQVgsRUFBaUIsY0FBYUYsVUFBOUIsRUFBeEIsQ0FBWjtBQUNBM0MsZ0JBQUc4QyxhQUFILENBQWlCRixLQUFqQjtBQUNIOzs7dUNBRW9CNUMsRSxFQUFJK0MsUyxFQUFXO0FBQ2hDLGlCQUFJSCxRQUFRbEQsU0FBU3NELFdBQVQsQ0FBcUIsWUFBckIsQ0FBWjtBQUNBSixtQkFBTUssU0FBTixDQUFnQkYsU0FBaEIsRUFBMkIsSUFBM0IsRUFBaUMsS0FBakM7QUFDQS9DLGdCQUFHOEMsYUFBSCxDQUFpQkYsS0FBakI7QUFDSDs7O29DQUVpQnZHLE0sRUFBUXdFLFEsRUFBVTtBQUNoQyxpQkFBSSxXQUFXeEUsT0FBTzZHLE9BQXRCLEVBQStCO0FBQzNCLHdCQUFPLElBQVA7QUFDSCxjQUZELE1BRU8sSUFBSTdHLE9BQU9DLE9BQVAsQ0FBZXVFLFFBQWYsQ0FBSixFQUE4QjtBQUNqQyx3QkFBT3hFLE1BQVA7QUFDSCxjQUZNLE1BRUE7QUFDSCx3QkFBTyxLQUFLOEcsVUFBTCxDQUFnQjlHLE9BQU84QyxVQUF2QixFQUFtQzBCLFFBQW5DLENBQVA7QUFDSDtBQUNKOzs7MENBRXVCdUMsRyxFQUFLO0FBQUE7O0FBQ3pCQSxpQkFBSXJELE9BQUosQ0FBWSxVQUFDdkQsRUFBRCxFQUFRO0FBQ2hCLHdCQUFLNkcsV0FBTCxDQUFpQixPQUFLbEksSUFBTCxDQUFVcUIsRUFBVixDQUFqQjtBQUNILGNBRkQ7QUFHSDs7O3FDQUVrQjBDLE8sRUFBUztBQUN4QkEscUJBQVEyQyxLQUFSLENBQWNDLE9BQWQsR0FBd0IsRUFBeEI7QUFDSDs7O3NDQUVtQndCLGlCLEVBQW1CO0FBQUE7O0FBQ25DL0IsbUJBQU1DLFNBQU4sQ0FBZ0J6QixPQUFoQixDQUF3QjBCLElBQXhCLENBQ0M2QixpQkFERCxFQUNvQixVQUFDdEksQ0FBRDtBQUFBLHdCQUFPLE9BQUtxSSxXQUFMLENBQWlCckksQ0FBakIsQ0FBUDtBQUFBLGNBRHBCO0FBRUg7OzswQ0FFdUJvSSxHLEVBQUs7QUFBQTs7QUFDekJBLGlCQUFJckQsT0FBSixDQUFZLFVBQUN2RCxFQUFELEVBQVE7QUFDaEIsd0JBQUsrRyxXQUFMLENBQWlCLE9BQUtwSSxJQUFMLENBQVVxQixFQUFWLENBQWpCO0FBQ0gsY0FGRDtBQUdIOzs7c0NBRWtCOEcsaUIsRUFBbUI7QUFBQTs7QUFDbkMvQixtQkFBTUMsU0FBTixDQUFnQnpCLE9BQWhCLENBQXdCMEIsSUFBeEIsQ0FDQzZCLGlCQURELEVBQ29CLFVBQUN0SSxDQUFEO0FBQUEsd0JBQU8sT0FBS3VJLFdBQUwsQ0FBaUJ2SSxDQUFqQixDQUFQO0FBQUEsY0FEcEI7QUFFRjs7O3FDQUVrQmtFLE8sRUFBUztBQUN4QkEscUJBQVEyQyxLQUFSLENBQWNDLE9BQWQsR0FBd0IsTUFBeEI7QUFDSDs7QUFFTDs7OztxQ0FDdUJ6RixNLEVBQVE7QUFDdkIsaUJBQUltSCxNQUFNbkgsT0FBT29ILHFCQUFQLEVBQVY7QUFDQSxpQkFBSUMsVUFBVWhFLFNBQVNpRSxlQUF2QjtBQUNBLG9CQUFPO0FBQ0hDLHNCQUFLSixJQUFJSSxHQUFKLElBQVdDLE9BQU9DLFdBQVAsSUFBc0JKLFFBQVFLLFNBQXpDLEtBQXVETCxRQUFRTSxTQUFSLElBQXFCLENBQTVFLENBREY7QUFFSEMsdUJBQU1ULElBQUlTLElBQUosSUFBWUosT0FBT0ssV0FBUCxJQUFzQlIsUUFBUVMsVUFBMUMsS0FBeURULFFBQVFVLFVBQVIsSUFBc0IsQ0FBL0U7QUFGSCxjQUFQO0FBSUg7OztpQ0FFY2xGLE8sRUFBU3NCLEcsRUFBSztBQUN6QixpQkFBSVYsT0FBT0QsT0FBT0MsSUFBUCxDQUFZVSxHQUFaLENBQVg7QUFDQVYsa0JBQUt1RSxJQUFMLENBQVUsVUFBQ3JFLEVBQUQsRUFBUTtBQUNkLHFCQUFJZCxRQUFRNUMsT0FBUixDQUFnQjBELEVBQWhCLENBQUosRUFBeUI7QUFDckJRLHlCQUFJUixFQUFKLEVBQVFkLE9BQVI7QUFDQSw0QkFBTyxJQUFQO0FBQ0g7QUFDRCx3QkFBTyxLQUFQO0FBQ0gsY0FORDtBQU9IOzs7dUNBRW9CYyxFLEVBQWU7QUFBQSxpQkFBWHNFLElBQVcsdUVBQUosRUFBSTs7QUFDaEMsaUJBQUk3RyxTQUFTaUMsU0FBUzNELGFBQVQsQ0FBdUJpRSxFQUF2QixDQUFiO0FBQ0EsaUJBQUlGLE9BQU9ELE9BQU9DLElBQVAsQ0FBWXdFLElBQVosQ0FBWDtBQUNBLGlCQUFJeEUsS0FBS3pDLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDbkJ5QyxzQkFBS0MsT0FBTCxDQUFhLFVBQUMvRSxDQUFEO0FBQUEsNEJBQU95QyxPQUFPa0MsWUFBUCxDQUFvQjNFLENBQXBCLEVBQXVCc0osS0FBS3RKLENBQUwsQ0FBdkIsQ0FBUDtBQUFBLGtCQUFiO0FBQ0g7QUFDRCxvQkFBT3lDLE1BQVA7QUFDSDs7OzJDQUV3QjhHLFEsRUFBVTtBQUMvQixvQkFBTyxPQUFPQSxRQUFQLEtBQW9CLFdBQXBCLElBQW1DQSxhQUFhLElBQXZEO0FBQ0g7Ozt5Q0FFeUM7QUFBQSxpQkFBckJ2RyxHQUFxQix1RUFBZixFQUFlO0FBQUEsaUJBQVhzRyxJQUFXLHVFQUFKLEVBQUk7O0FBQ3RDLGlCQUFJLE9BQU90RyxHQUFQLElBQWM2QixPQUFPQyxJQUFQLENBQVl3RSxJQUFaLEVBQWtCakgsTUFBbEIsS0FBNkIsQ0FBL0MsRUFDSTtBQUNKLGlCQUFJbUgsT0FDQTNFLE9BQU9DLElBQVAsQ0FBWXdFLElBQVosRUFBa0I5RCxHQUFsQixDQUFzQixVQUFDUixFQUFEO0FBQUEsd0JBQVFBLEtBQUssR0FBTCxHQUFXc0UsS0FBSzVELEdBQUwsQ0FBbkI7QUFBQSxjQUF0QixFQUFvREMsSUFBcEQsQ0FBeUQsR0FBekQsQ0FESjtBQUVBOzs7OztBQUtBLGlCQUFJNkQsS0FBS25ILE1BQUwsR0FBYyxHQUFsQixFQUF1QjtBQUNuQlcsdUJBQU1BLElBQUl5RyxRQUFKLENBQWEsR0FBYixJQUFvQnpHLEdBQXBCLEdBQTJCQSxNQUFNLEdBQXZDO0FBQ0E2Rix3QkFBT2EsUUFBUCxDQUFnQkMsSUFBaEIsR0FBdUIzRyxPQUFPd0csS0FBS25ILE1BQUwsR0FBYyxDQUFkLEdBQW1CLE1BQU1tSCxJQUF6QixHQUFpQyxFQUF4QyxDQUF2QjtBQUNILGNBSEQsTUFHTztBQUFBO0FBQ0gseUJBQUkvRSxPQUFPbUYsTUFBTTdJLGFBQU4sQ0FBb0IsTUFBcEIsRUFBNEI7QUFDbkMsbUNBQVcsTUFEd0IsRUFDaEIsVUFBV2lDO0FBREssc0JBQTVCLENBQVg7QUFHQTZCLDRCQUFPQyxJQUFQLENBQVl3RSxJQUFaLEVBQWtCdkUsT0FBbEIsQ0FBMEIsVUFBQ0MsRUFBRCxFQUFRO0FBQzlCUCw4QkFBS3hELFdBQUwsQ0FDQTJJLE1BQU03SSxhQUFOLENBQW9CLE9BQXBCLEVBQTZCO0FBQ3pCLHFDQUFTaUUsRUFEZ0IsRUFDWixTQUFVc0UsS0FBS3RFLEVBQUw7QUFERSwwQkFBN0IsQ0FEQTtBQUlILHNCQUxEO0FBTUFOLDhCQUFTTyxJQUFULENBQWNoRSxXQUFkLENBQTBCd0QsSUFBMUI7QUFDQUEsMEJBQUtvRixNQUFMO0FBQ0FELDJCQUFNRSxhQUFOLENBQW9CckYsSUFBcEI7QUFaRztBQWFOO0FBQ0o7OzsrQkFFWXNGLFMsRUFBV0MsTSxFQUFRO0FBQUE7O0FBQzVCLG9CQUFPLFVBQUNoSyxDQUFELEVBQU87QUFDVixxQkFBSWlLLFNBQVNqSyxFQUFFcUIsTUFBRixDQUFTOEMsVUFBdEI7QUFDQSxxQkFBSSxPQUFLK0YsUUFBTCxDQUFjRCxNQUFkLEVBQXNCLFFBQXRCLENBQUosRUFDSTs7QUFFSix3QkFBS0UseUJBQUwsQ0FBK0JGLE9BQU85RixVQUFQLENBQWtCaUcsUUFBakQsRUFBMkQsQ0FBQyxRQUFELENBQTNEO0FBQ0Esd0JBQUsxQyxRQUFMLENBQWN1QyxNQUFkLEVBQXNCLFFBQXRCO0FBQ0Esd0JBQUtJLGtCQUFMLENBQXdCTixVQUFVaEUsZ0JBQVYsQ0FBMkIsY0FBM0IsQ0FBeEIsRUFBb0UsTUFBcEU7QUFDQSx3QkFBS21CLFdBQUwsQ0FBaUI4QyxNQUFqQixFQUF5QixNQUF6QjtBQUNILGNBVEQ7QUFVSDs7OytCQUNZN0UsRSxFQUFJO0FBQ2IsaUJBQUlULFNBQVM0RixVQUFULElBQXVCLFNBQTNCLEVBQXFDO0FBQ2pDbkY7QUFDSCxjQUZELE1BRU87QUFDSFQsMEJBQVN0RCxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMrRCxFQUE5QztBQUNIO0FBQ0o7Ozs7OzttQkFoUmdCbEIsSzs7Ozs7Ozs7Ozs7Ozs7QUNGckI7Ozs7Ozs7O0FBRUEsS0FBTXNHLFNBQVMsQ0FDWDtBQUNJLGtCQUFjLFNBRGxCO0FBRUksYUFBUztBQUZiLEVBRFcsRUFLWDtBQUNJLGtCQUFjLE9BRGxCO0FBRUksYUFBUztBQUZiLEVBTFcsQ0FBZjs7S0FXcUJDLE07QUFDakIsdUJBQWM7QUFBQTtBQUViOzs7O2dDQUVNO0FBQUE7O0FBQ0gsaUJBQUkxSSxXQUFXekIsV0FBV0MsT0FBWCxDQUFtQixnQkFBTUgsSUFBTixDQUFXLGdCQUFYLEVBQTZCSSxTQUFoRCxDQUFmO0FBQ0FnSyxvQkFBT3hGLE9BQVAsQ0FBZSxVQUFDQyxFQUFELEVBQVE7QUFDbkIsdUJBQUt5RixPQUFMLENBQWF6RixHQUFHakMsSUFBaEIsRUFBc0IsZ0JBQU01QyxJQUFOLENBQVc2RSxHQUFHK0UsU0FBZCxDQUF0QixFQUFnRGpJLFFBQWhEO0FBQ0gsY0FGRDs7QUFJQSw2QkFBTTNCLElBQU4sQ0FBVyxXQUFYLEVBQXdCaUIsZ0JBQXhCLENBQXlDLE9BQXpDLEVBQ0ksZ0JBQU1RLEtBQU4sQ0FBWSxnQkFBTXpCLElBQU4sQ0FBVyxrQkFBWCxDQUFaLEVBQTRDLGdCQUFNQSxJQUFOLENBQVcsU0FBWCxDQUE1QyxDQURKOztBQUdBLDZCQUFNQSxJQUFOLENBQVcsY0FBWCxFQUEyQmlCLGdCQUEzQixDQUE0QyxPQUE1QyxFQUNJLGdCQUFNUSxLQUFOLENBQVksZ0JBQU16QixJQUFOLENBQVcsa0JBQVgsQ0FBWixFQUE0QyxnQkFBTUEsSUFBTixDQUFXLE9BQVgsQ0FBNUMsQ0FESjtBQUVIOzs7aUNBRU82QyxHLEVBQUsrRyxTLEVBQVdqSSxRLEVBQVU7QUFDcEMsb0JBQU90QixFQUFFQyxJQUFGLENBQU87QUFDYnVDLHNCQUFNQSxHQURPO0FBRWJ0QywwQkFBVSxpQkFBQ0MsSUFBRCxFQUFVO0FBQ25CLHlCQUFJK0osVUFBVS9KLEtBQUt1QyxJQUFMLENBQVVDLEtBQVYsQ0FBZ0JxQyxHQUFoQixDQUFvQixVQUFDUixFQUFELEVBQVE7QUFDMUIsNkJBQUk1QixVQUFVNEIsR0FBRzNCLE9BQUgsQ0FBV0MsRUFBWCxDQUFjN0IsS0FBZCxDQUFvQixHQUFwQixDQUFkO0FBQ0EsZ0NBQU87QUFDSCxxQ0FBUzJCLFFBQVEsQ0FBUixFQUFXM0IsS0FBWCxDQUFpQixHQUFqQixFQUFzQixDQUF0QixDQUROO0FBRUgsc0NBQVMyQixRQUFRLENBQVIsRUFBVzNCLEtBQVgsQ0FBaUIsR0FBakIsRUFBc0IsQ0FBdEIsRUFBeUJnQyxJQUF6QixFQUZOO0FBR0gsNENBQWdCTCxRQUFRLENBQVIsRUFBVzNCLEtBQVgsQ0FBaUIsR0FBakIsRUFBc0IsQ0FBdEIsQ0FIYjtBQUlILG9DQUFPMkIsUUFBUWYsTUFBUixLQUFtQixDQUFuQixHQUF1QmUsUUFBUSxDQUFSLEVBQVdLLElBQVgsR0FBa0JoQyxLQUFsQixDQUF3QixNQUF4QixFQUFnQyxDQUFoQyxDQUF2QixHQUE0RDtBQUpoRSwwQkFBUDtBQU1ILHNCQVJDLENBQWQ7QUFTQXNJLCtCQUFVeEosU0FBVixHQUFzQnVCLFNBQVMsRUFBQyxTQUFVNEksT0FBWCxFQUFULENBQXRCO0FBQ0E7QUFiWSxjQUFQLENBQVA7QUFlRzs7Ozs7O21CQWxDZ0JGLE0iLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZTg3Y2VjMzk4MTI2NGFhYTU2OTUiLCJpbXBvcnQgZml4dHVyZXMgZnJvbSAnLi9maXh0dXJlcyc7XG5pbXBvcnQgcGVvcGxlIGZyb20gJy4vcGVvcGxlJ1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vVXRpbHMnO1xuXG51dGlscy5yZWFkeSgoZSkgPT4ge1xuXHRuZXcgZml4dHVyZXMoKS5pbml0KCk7XG5cdG5ldyBwZW9wbGUoKS5pbml0KCk7XG5cdHV0aWxzLnRyaWdnZXJDbGljayh1dGlscy5ieUlkKCdzZWFzb24tMjAxNycpKTtcblx0dmFyIHBvc3RzVGVtcGxhdGUgPSBIYW5kbGViYXJzLmNvbXBpbGUodXRpbHMuYnlJZCgnYmxvZy1wb3N0cycpLmlubmVySFRNTCk7XG5cdCQuYWpheCh7XG5cdFx0J3VybCcgOiAnL25ld3MuanNvbicsXG5cdFx0J2RhdGFUeXBlJzogJ2pzb24nLFxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xuXHRcdFx0bGV0IGRpdiA9IHV0aWxzLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0ZGl2LmlubmVySFRNTCA9IHBvc3RzVGVtcGxhdGUoe1wiZW50cnlcIiA6IGRhdGEuaXRlbX0pOyBcblx0XHRcdHV0aWxzLmJ5SWQoJ2Jsb2dzQ29sJykuYXBwZW5kQ2hpbGQoZGl2KTtcblx0XHR9XG5cdH0pO1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZ2NjLmpzIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vVXRpbHMnO1xuXG5jb25zdCBzZWFzb25zID0ge1xuICAgIFwiMjAxNVwiIDogXCJodHRwczovL3NwcmVhZHNoZWV0cy5nb29nbGUuY29tL2ZlZWRzL2xpc3QvMUxlMFRMMFNhalVLV3lxbnpTUXVSeXU0Yy1BQ2RvUVI5RlZfWVhQTHRPc3cvMS9wdWJsaWMvYmFzaWM/YWx0PWpzb25cIixcbiAgICBcIjIwMTZcIiA6IFwiaHR0cHM6Ly9zcHJlYWRzaGVldHMuZ29vZ2xlLmNvbS9mZWVkcy9saXN0LzFyczhmYWVSLVVjeHF6SFpXSUtCbWJSUXYzS3FtNHluX1Jxb2xsZV95eUtzLzEvcHVibGljL2Jhc2ljP2FsdD1qc29uXCIsXG4gICAgXCIyMDE3XCIgOiBcImh0dHBzOi8vc3ByZWFkc2hlZXRzLmdvb2dsZS5jb20vZmVlZHMvbGlzdC8xemVuT2dVTEtENWZJQW9Cd2FuSGpyclNDRHZVN01IaDRBajd2NDdYYmJvYy8xL3B1YmxpYy9iYXNpYz9hbHQ9anNvblwiXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBmaXh0dXJlcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgXG4gICAgfVxuXG5cdGluaXQoKSB7XG4gICAgICAgIHV0aWxzLmJ5SWQoJ3NlYXNvbnMtbGlzdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgXG4gICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQubWF0Y2hlcygnLnNlYXNvbnMtc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICBsZXQgc2Vhc29uID0gZS50YXJnZXQuaWQuc3BsaXQoJy0nKVsxXTtcbiAgICAgICAgICAgICAgICB1dGlscy5ieUlkKCdzZWFzb24tc2VsZWN0ZWQnKS5pbm5lckhUTUwgPSAnU2Vhc29uICcgKyBzZWFzb247XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Rml4dHVyZURhdGEoc2Vhc29uKTsgXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB1dGlscy5ieUlkKCd0b1VwY29taW5nJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBcbiAgICAgICAgICAgIHV0aWxzLnRhYlVJKHV0aWxzLmJ5SWQoJ2ZpeHR1cmVzSW5uZXJDb2wnKSwgdXRpbHMuYnlJZCgnZml4dHVyZXNMaXN0JykpKTtcblxuICAgICAgICB1dGlscy5ieUlkKCd0b1Jlc3VsdHMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFxuICAgICAgICAgICAgdXRpbHMudGFiVUkodXRpbHMuYnlJZCgnZml4dHVyZXNJbm5lckNvbCcpLCB1dGlscy5ieUlkKCdyZXN1bHRzTGlzdCcpKSk7ICAgIFxuXG5cdH07XG5cbiAgICByZW5kZXJGaXh0dXJlcyhkYXRhLCBmaWx0ZXJmbiwgdGVtcGxhdGUsIG5vU3RyLCBjb250YWluZXJJZCwgc29ydGZuKSB7XG4gICAgICAgIGRhdGEgPSBkYXRhLmZpbHRlcihmaWx0ZXJmbik7XG4gICAgICAgIGlmIChzb3J0Zm4pXG4gICAgICAgICAgICBkYXRhLnNvcnQoc29ydGZuKTtcblxuICAgICAgICBsZXQgZml4dHVyZUNvbnRhaW5lciA9IHV0aWxzLmJ5SWQoY29udGFpbmVySWQpO1xuICAgICAgICBmaXh0dXJlQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBmaXh0dXJlQ29udGFpbmVyLmlubmVySFRNTCA9ICBkYXRhLmxlbmd0aCA+IDAgPyBcbiAgICAgICAgICAgIHRlbXBsYXRlKHsnbWF0Y2gnIDogZGF0YX0pIDogbm9TdHIgO1xuICAgIH1cblx0XG5cdHJlbmRlckZvcm1hdHRlZERhdGEgKGZvcm1hdGVkRGF0YSkge1xuICAgICAgICBsZXQgdGVtcGxhdGUgPSBIYW5kbGViYXJzLmNvbXBpbGUodXRpbHMuYnlJZChcInVwY29taW5nLW1hdGNoZXNcIikuaW5uZXJIVE1MKTtcblx0XHR0aGlzLnJlbmRlckZpeHR1cmVzKFxuICAgICAgICAgICAgICAgIGZvcm1hdGVkRGF0YSxcbiAgICAgICAgICAgICAgICB2ID0+IHYucmVzdWx0ID8gZmFsc2UgOiB0cnVlLCBcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J25vcmVzdWx0cyBjb2wtc20tMTInPjxwPjxiPk5vIFVwY29taW5nIG1hdGNoZXMgeWV0PC9iPjwvcD48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAnZml4dHVyZXNMaXN0Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyRml4dHVyZXMoXG4gICAgICAgICAgICAgICAgZm9ybWF0ZWREYXRhLFxuICAgICAgICAgICAgICAgIHYgPT4gdi5yZXN1bHQgPyB0cnVlIDogZmFsc2UsIFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlLFxuICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nbm9yZXN1bHRzIGNvbC1zbS0xMic+PHA+PGI+Tm8gUmVzdWx0cyB5ZXQ8L2I+PC9wPjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgICdyZXN1bHRzTGlzdCcsXG4gICAgICAgICAgICAgICAgKGEsYikgPT4gbmV3IERhdGUoYi5kYXRlKSAtIG5ldyBEYXRlKGEuZGF0ZSkpOyAgICAgICAgICAgICAgICBcblx0fTtcblx0XG5cdGdldEZpeHR1cmVEYXRhKHNlYXNvbikge1xuXHRcdHZhciBjb250ZXh0ID0gdGhpcztcblx0XHR2YXIgbGluayA9IHNlYXNvbnNbc2Vhc29uXTtcblx0XHQkLmFqYXgoe1xuXHRcdFx0dXJsIDogbGluaywgXG5cdFx0XHRzdWNjZXNzIDogKGRhdGEpID0+IHtcblx0XHRcdFx0dmFyIGZvcm1hdGVkRGF0YSA9IFtdO1xuXHRcdFx0XHRmb3IobGV0IGkgPSAwIDsgaSA8IGRhdGEuZmVlZC5lbnRyeS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHQgICBsZXQgcm93Q29scyA9IGRhdGEuZmVlZC5lbnRyeVtpXS5jb250ZW50LiR0LnNwbGl0KCcsJyk7XG5cdFx0XHRcdCAgIGxldCBfZGF0YSA9IHt9O1xuXHRcdFx0XHQgICBmb3IobGV0IGogPSAwOyBqIDwgcm93Q29scy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdCAgIGxldCBpdGVtID0gcm93Q29sc1tqXS50cmltKCk7XG5cdFx0XHRcdFx0ICAgbGV0IGluZGV4ID0gaXRlbS5pbmRleE9mKCc6Jyk7XG5cdFx0XHRcdFx0ICAgX2RhdGFbaXRlbS5zdWJzdHJpbmcoMCxpbmRleCldID0gaXRlbS5zdWJzdHJpbmcoaW5kZXgrMSkudHJpbSgpO1xuXHRcdFx0XHQgICB9XG4gICAgICAgICAgICAgICAgICAgX2RhdGEucHJhY3RpY2UgPSBfZGF0YS50b3VybmFtZW50ID09PSAnUHJhY3RpY2UgU2Vzc2lvbic7XG5cdFx0XHRcdCAgIGZvcm1hdGVkRGF0YS5wdXNoKF9kYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLnJlbmRlckZvcm1hdHRlZERhdGEoZm9ybWF0ZWREYXRhKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9maXh0dXJlcy5qcyIsIi8vIHRoaXMgY2xhc3MgY2FuIGJlIGJyb2tlbiB1cCBpbnRvIG11bHRpcGxlIGNvbXBvbmVudHMgYXMgaXMgcmVxdWlyZWRcbi8vIGF0IGEgbGF0ZXIgc3RhZ2VcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFV0aWxzIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICB9ICAgIFxuXG4gICAgc3RhdGljIGNsb25lRm9ybU9wdGlvbnMoZm9ybUVsLCBvcHRpb25zLCBlbGVtZW50cykge1xuICAgICAgICByZXR1cm4gZm9ybUVsLmlubmVySFRNTDtcbiAgICB9XG5cbiAgICBzdGF0aWMgbW9kaWZ5QW5kU3VibWl0Rm9ybShmb3JtRWwsIGlucHV0cywgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICBmb3JtLnNldEF0dHJpYnV0ZSgnYWN0aW9uJywgZm9ybUVsLmdldEF0dHJpYnV0ZSgnYWN0aW9uJykpO1xuICAgICAgICBmb3JtLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywgZm9ybUVsLmdldEF0dHJpYnV0ZSgnbWV0aG9kJykpO1xuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChlbCkgPT4gZm9ybS5zZXRBdHRyaWJ1dGUoZWwsIG9wdGlvbnNbZWxdKSk7XG4gICAgICAgIGZvcm0uaW5uZXJIVE1MID0gaW5wdXRzO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xuICAgICAgICByZXR1cm4gZm9ybTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbWFrZUdyb3VwZWREcm9wRG93biAoZGF0YSwgcHJvcHMgPSB7ICduYW1lJyA6ICcnfSwgZm4gPSBmdW5jdGlvbihuYW1lKSB7IHJldHVybiBuYW1lIH0pIHtcblx0XHR2YXIgaHRtbCA9IFwiXCI7XG5cdFx0aWYgKHByb3BzLmxhYmVsKSB7XG5cdFx0XHRodG1sID0gJzxwIGNsYXNzPVwibGFiZWxcIj4nICsgcHJvcHMubGFiZWwgKyAnPC9wPic7IFxuXHRcdH1cblxuXHRcdHZhciBvcHRpb25zRm4gPSBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmtleXMoZGF0YSkubWFwKGZ1bmN0aW9uKGVsKXtcblx0XHRcdFx0dmFyIGlkID0gZm4oZWwpO1xuXHRcdFx0XHRyZXR1cm4gJzxvcHRpb24gdmFsdWU9XCInICsgZWwgKyAnXCIgaWQ9XCInICsgaWQgKyAnXCInIFxuXHRcdFx0XHRcdFx0XHQrICc+JyArIGRhdGFbZWxdIFxuXHRcdFx0XHRcdCsgJzwvb3B0aW9uPic7XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0dmFyIGdyb3VwcyA9IFxuXHRcdE9iamVjdC5rZXlzKGRhdGEpLm1hcChmdW5jdGlvbihrZXkpe1xuXHRcdFx0cmV0dXJuICc8b3B0Z3JvdXAgbGFiZWw9XCInICsga2V5ICsgJ1wiPicgXG5cdFx0XHRcdFx0KyBvcHRpb25zRm4oZGF0YVtrZXldKS5qb2luKCcnKSBcblx0XHRcdFx0XHQrICc8L29wdGdyb3VwPic7XG5cdFx0fSk7XG5cblx0XHRodG1sID0gaHRtbCArICc8cCBjbGFzcz1cImJ1aWxkZXJcIj48c2VsZWN0IG5hbWU9XCInICsgcHJvcHMubmFtZSsgJ1wiPicgXG5cdFx0XHRcdFx0XHQrIGdyb3Vwcy5qb2luKCcnKSAgKyAnPC9zZWxlY3Q+J1xuXHRcdFx0XHRcdCsgJzwvcD4nIFxuXHRcdHJldHVybiBodG1sO1xuXHR9O1xuXG4gICAgc3RhdGljIGJ5SWQoaWQpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYnlTZWxlY3RvcihzZWxlY3RvciwgYWxsID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGFsbCA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpIFxuICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2ltcGxlRHJvcERvd25CdWlsZGVyKGRhdGEsIHByb3BzID0geyAnbmFtZScgOiAnJ30pIHtcbiAgICAgICAgbGV0IGh0bWwgPSAnJztcbiAgICAgICAgaWYgKHByb3BzLmxhYmVsKSB7XG4gICAgICAgICAgICBodG1sID0gJzxwIGNsYXNzPVwibGFiZWxcIj4nICsgcHJvcHMubGFiZWwgKyAnPC9wPic7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGh0bWwgKyBcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImJ1aWxkZXJcIj4nXG4gICAgICAgICAgICArICc8c2VsZWN0IG5hbWU9XCInICsgcHJvcHMubmFtZSArICdcIj4nXG4gICAgICAgICAgICAgICAgKyBPYmplY3Qua2V5cyhkYXRhLnNlbGVjdHMpLm1hcCgoZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPG9wdGlvbiB2YWx1ZT1cIicgKyBlbCArICdcIicgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyArIChkYXRhLmRlZiA9PT0gZWwgPyAnc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJyA6ICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgKyc+JyArIGRhdGEuc2VsZWN0c1tlbF0ubGFiZWwgKyAnPC9vcHRpb24+JztcbiAgICAgICAgICAgICAgICAgICAgfSkuam9pbignJylcbiAgICAgICAgICAgICsgJzwvc2VsZWN0PjwvcD4nO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZWxlY3RWYWx1ZShzZWxlY3RTZWxlY3Rvciwgb3B0aW9uU2VsZWN0b3IpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RTZWxlY3RvcilcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKG9wdGlvblNlbGVjdG9yKVxuICAgICAgICAgICAgLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc3luY0ZpZWxkcyhuZXdGb3JtLCBmb3JtLCBzZWxlY3RvcnMpIHtcbiAgICAgICAgc2VsZWN0b3JzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoZWwpLCAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpO1xuICAgICAgICAgICAgICAgIG5ld0Zvcm0ucXVlcnlTZWxlY3RvcihlbCArICdbbmFtZT0nICsgbmFtZSArICddJykudmFsdWUgPSBlbGVtZW50LnZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBoaWRlRWxlbWVudHNCeUlkKGlkc19hcnJheSkgXG4gICAge1xuICAgICAgICB0aGlzLmhpZGVFbGVtZW50cyhpZHNfYXJyYXkubWFwKChpZCkgPT4gdGhpcy5ieUlkKGlkKSkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBoaWRlRWxlbWVudHMoZWxlbWVudHMpIHtcbiAgICAgICAgZm9yKGxldCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlQ2xhc3Nlc0Zyb21FbGVtZW50cyhlbENvbGxlY3Rpb24sIGNsYXNzZXMpIHtcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChlbENvbGxlY3Rpb24sIChlbCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzc2VzKGVsLGNsYXNzZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlQ2xhc3NlcyAoZWwsIGNsYXNzZXMpIHtcbiAgICAgICAgY2xhc3Nlcy5mb3JFYWNoKGUgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhlbCxlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZUNsYXNzKGVsLCBjbGFzc05hbWUpIHtcbiAgICAgICAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGVsLmNsYXNzTmFtZS5pbmRleE9mKGNsYXNzTmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgY2xhc3NlcyA9IGVsLmNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gY2xhc3Nlcy5zcGxpY2UoY2xhc3Nlcy5pbmRleE9mKGNsYXNzTmFtZSksIDEpLmpvaW4oJyAnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICBzdGF0aWMgaGFzQ2xhc3MoZWwsY2xhc3NOYW1lKSB7XG4gICAgICAgIHJldHVybiBlbC5jbGFzc0xpc3QgPyBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSA6IFxuICAgICAgICAgICAgZWwuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3NOYW1lKSAhPT0gLTE7XG4gICAgfVxuXG4gICAgIHN0YXRpYyBhZGRDbGFzcyhlbCwgY2xhc3NOYW1lKSB7XG4gICAgICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbC5jbGFzc05hbWUuaW5kZXhPZihjbGFzc05hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lICsgJyAnICsgY2xhc3NOYW1lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgIHN0YXRpYyBhZGRDbGFzc1RvRWxlbWVudHMoY29sbGVjdGlvbiwgY2xhc3NOYW1lKSB7XG4gICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGNvbGxlY3Rpb24sIChlbCkgPT4gdGhpcy5hZGRDbGFzcyhlbCwgY2xhc3NOYW1lKSk7XG4gICAgfSAgICBcblxuICAgIHN0YXRpYyB0cmlnZ2VyQ2xpY2soZWwsIGNhbmNlbGFibGUgPSBmYWxzZSkge1xuICAgICAgICBsZXQgZXZlbnQgPSBuZXcgTW91c2VFdmVudChcImNsaWNrXCIsIHtcImJ1YmJsZXNcIjp0cnVlLCBcImNhbmNlbGFibGVcIjpjYW5jZWxhYmxlfSk7XG4gICAgICAgIGVsLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH0gICAgXG5cbiAgICBzdGF0aWMgdHJpZ2dlck5hdGl2ZShlbCwgZXZlbnROYW1lKSB7XG4gICAgICAgIGxldCBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICAgIGV2ZW50LmluaXRFdmVudChldmVudE5hbWUsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZpbmRQYXJlbnQodGFyZ2V0LCBzZWxlY3Rvcikge1xuICAgICAgICBpZiAoJ0JPRFknID09PSB0YXJnZXQudGFnTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZFBhcmVudCh0YXJnZXQucGFyZW50Tm9kZSwgc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHNob3dFbGVtZW50c0J5SWQoYXJyKSB7XG4gICAgICAgIGFyci5mb3JFYWNoKChpZCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93RWxlbWVudCh0aGlzLmJ5SWQoaWQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNob3dFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgfVxuXG4gICAgc3RhdGljIHNob3dFbGVtZW50cyhlbGVtZW50Q29sbGVjdGlvbikge1xuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsXG4gICAgICAgIChlbGVtZW50Q29sbGVjdGlvbiwgKGUpID0+IHRoaXMuc2hvd0VsZW1lbnQoZSkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBoaWRlRWxlbWVudHNCeUlkKGFycikge1xuICAgICAgICBhcnIuZm9yRWFjaCgoaWQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGlkZUVsZW1lbnQodGhpcy5ieUlkKGlkKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgc3RhdGljIGhpZGVFbGVtZW50cyhlbGVtZW50Q29sbGVjdGlvbikge1xuICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGxcbiAgICAgICAoZWxlbWVudENvbGxlY3Rpb24sIChlKSA9PiB0aGlzLmhpZGVFbGVtZW50KGUpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaGlkZUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuXG4vLyBzaW1pbGFyIHRvIGpxdWVyeSBvZmZzZXQgbWV0aG9kXG4gICAgc3RhdGljIGdldFBvc2l0aW9uKHRhcmdldCkge1xuICAgICAgICBsZXQgYm94ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBsZXQgZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogYm94LnRvcCArICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jRWxlbS5zY3JvbGxUb3ApIC0gKGRvY0VsZW0uY2xpZW50VG9wIHx8IDApLFxuICAgICAgICAgICAgbGVmdDogYm94LmxlZnQgKyAod2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvY0VsZW0uc2Nyb2xsTGVmdCkgLSAoZG9jRWxlbS5jbGllbnRMZWZ0IHx8IDApXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc3RhdGljIG1hdGNoZXMoZWxlbWVudCwgbWFwKSB7XG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMobWFwKTtcbiAgICAgICAga2V5cy5zb21lKChlbCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQubWF0Y2hlcyhlbCkpIHtcbiAgICAgICAgICAgICAgICBtYXBbZWxdKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlRWxlbWVudChlbCwgYXR0ciA9IHt9KSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsKTtcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhhdHRyKTtcbiAgICAgICAgaWYgKGtleXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBrZXlzLmZvckVhY2goKGUpID0+IHJlc3VsdC5zZXRBdHRyaWJ1dGUoZSwgYXR0cltlXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzVmFyaWFibGVEZWZpbmVkKHZhcmlhYmxlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFyaWFibGUgIT09ICd1bmRlZmluZWQnICYmIHZhcmlhYmxlICE9PSBudWxsXG4gICAgfVxuXG4gICAgc3RhdGljIG1ha2VHZXRPUlBvc3QodXJsID0gJycsIGF0dHIgPSB7fSkge1xuICAgICAgICBpZiAoJycgPT09IHVybCB8fCBPYmplY3Qua2V5cyhhdHRyKS5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGxldCBxU3RyID0gXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhhdHRyKS5tYXAoKGVsKSA9PiBlbCArICc9JyArIGF0dHJba2V5XSkuam9pbignJicpO1xuICAgICAgICAvKlxuXHRcdCAqIG5vdCBzdXJlIHdoYXQgY291bGQgYmUgdGhlIGJlc3QgbGVuZ3RoLiBcblx0XHQgKiBidXQgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80MTcxNDIvd2hhdC1pcy10aGUtbWF4aW11bS1sZW5ndGgtb2YtYS11cmwtaW4tZGlmZmVyZW50LWJyb3dzZXJzXG5cdFx0ICogc2F5cyAyMDAwIGNoYXJhY3RlcnMuIFdpbGwgZ3JhZHVhbGx5IGluY3JlYXNlIHRoaXMgaWYgbmVlZGVkXG5cdFx0ICovICAgICAgICBcbiAgICAgICAgaWYgKHFTdHIubGVuZ3RoIDwgNjAwKSB7XG4gICAgICAgICAgICB1cmwgPSB1cmwuZW5kc1dpdGgoJy8nKSA/IHVybCA6ICh1cmwgKyAnLycpO1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmwgKyAocVN0ci5sZW5ndGggPiAwID8gKCc/JyArIHFTdHIpIDogJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGZvcm0gPSB1dGlscy5jcmVhdGVFbGVtZW50KCdmb3JtJywge1xuICAgICAgICAgICAgICAgICdtZXRob2QnIDogJ1BPU1QnLCAnYWN0aW9uJyA6IHVybCBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoYXR0cikuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgICAgICAgICBmb3JtLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgICAgIHV0aWxzLmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywge1xuICAgICAgICAgICAgICAgICAgICAnbmFtZScgOiBlbCwgJ3ZhbHVlJyA6IGF0dHJbZWxdXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xuICAgICAgICAgICAgZm9ybS5zdWJtaXQoKTtcbiAgICAgICAgICAgIHV0aWxzLnJlbW92ZUVsZW1lbnQoZm9ybSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgdGFiVUkoY29udGFpbmVyLCBzaG93VXApIHtcbiAgICAgICAgcmV0dXJuIChlKSA9PiB7XG4gICAgICAgICAgICBsZXQgcGFyZW50ID0gZS50YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0NsYXNzKHBhcmVudCwgJ2FjdGl2ZScpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzc2VzRnJvbUVsZW1lbnRzKHBhcmVudC5wYXJlbnROb2RlLmNoaWxkcmVuLCBbJ2FjdGl2ZSddKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3MocGFyZW50LCAnYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzVG9FbGVtZW50cyhjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLnRhYi1zZWN0aW9uJyksICdoaWRlJyk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKHNob3dVcCwgJ2hpZGUnKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgc3RhdGljIHJlYWR5KGZuKSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9ICdsb2FkaW5nJyl7XG4gICAgICAgICAgICBmbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZuKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vVXRpbHMuanMiLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi9VdGlscyc7XG5cbmNvbnN0IHNoZWV0cyA9IFtcbiAgICB7XG4gICAgICAgICdjb250YWluZXInIDogJ3BsYXllcnMnLFxuICAgICAgICAnbGluaycgOiAnaHR0cHM6Ly9zcHJlYWRzaGVldHMuZ29vZ2xlLmNvbS9mZWVkcy9saXN0LzFkUGJzSHNkU2dRbzRyVW54Zy1yemZZbXkwdzE3dlRKdHRIWjRQUk1zM1VjLzEvcHVibGljL2Jhc2ljP2FsdD1qc29uJyBcbiAgICB9LFxuICAgIHtcbiAgICAgICAgJ2NvbnRhaW5lcicgOiAnYWRtaW4nLFxuICAgICAgICAnbGluaycgOiAnaHR0cHM6Ly9zcHJlYWRzaGVldHMuZ29vZ2xlLmNvbS9mZWVkcy9saXN0LzFKM3FucURIdE5Yc1FCWUNqaGtXOW1SeUl4d2RpSWp5cEFrWktyOFN4c29zLzEvcHVibGljL2Jhc2ljP2FsdD1qc29uJ1xuICAgIH1cbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHBlb3BsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBsZXQgdGVtcGxhdGUgPSBIYW5kbGViYXJzLmNvbXBpbGUodXRpbHMuYnlJZChcImVudHJ5LXRlbXBsYXRlXCIpLmlubmVySFRNTCk7XG4gICAgICAgIHNoZWV0cy5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXREYXRhKGVsLmxpbmssIHV0aWxzLmJ5SWQoZWwuY29udGFpbmVyKSwgdGVtcGxhdGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICB1dGlscy5ieUlkKCd0b1BsYXllcnMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFxuICAgICAgICAgICAgdXRpbHMudGFiVUkodXRpbHMuYnlJZCgncGxheWVyc0NvbnRhaW5lcicpLCB1dGlscy5ieUlkKCdwbGF5ZXJzJykpKTtcblxuICAgICAgICB1dGlscy5ieUlkKCd0b01hbmFnZW1lbnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFxuICAgICAgICAgICAgdXRpbHMudGFiVUkodXRpbHMuYnlJZCgncGxheWVyc0NvbnRhaW5lcicpLCB1dGlscy5ieUlkKCdhZG1pbicpKSk7ICAgICAgICBcbiAgICB9XG5cbiAgICBnZXREYXRhKHVybCwgY29udGFpbmVyLCB0ZW1wbGF0ZSkge1xuXHRcdHJldHVybiAkLmFqYXgoe1xuXHRcdFx0dXJsIDogdXJsLCBcblx0XHRcdHN1Y2Nlc3MgOiAoZGF0YSkgPT4ge1xuXHRcdFx0XHRsZXQgcGxheWVycyA9IGRhdGEuZmVlZC5lbnRyeS5tYXAoKGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByb3dDb2xzID0gZWwuY29udGVudC4kdC5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ25hbWUnIDogcm93Q29sc1swXS5zcGxpdChcIjpcIilbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW1hZ2UnOiByb3dDb2xzWzFdLnNwbGl0KFwiOlwiKVsxXS50cmltKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nIDogcm93Q29sc1syXS5zcGxpdChcIjpcIilbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAndXJsJzogcm93Q29scy5sZW5ndGggPT09IDQgPyByb3dDb2xzWzNdLnRyaW0oKS5zcGxpdChcInVybDpcIilbMV0gOiAnJ1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pO1xuXHRcdFx0XHRjb250YWluZXIuaW5uZXJIVE1MID0gdGVtcGxhdGUoe1wiZW50cnlcIiA6IHBsYXllcnN9KTtcblx0XHRcdH1cblx0XHR9KTsgXG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Blb3BsZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=