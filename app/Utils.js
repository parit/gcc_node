// this class can be broken up into multiple components as is required
// at a later stage
export default class Utils {
    constructor () {

    }

    static removeElement(element) {
        element.parentNode.removeChild(element);
    }    

    static cloneFormOptions(formEl, options, elements) {
        return formEl.innerHTML;
    }

    static modifyAndSubmitForm(formEl, inputs, options = {}) {
        let form = document.createElement('form');
        form.setAttribute('action', formEl.getAttribute('action'));
        form.setAttribute('method', formEl.getAttribute('method'));
        Object.keys(options).forEach((el) => form.setAttribute(el, options[el]));
        form.innerHTML = inputs;
        document.body.appendChild(form);
        return form;
    }

    static makeGroupedDropDown (data, props = { 'name' : ''}, fn = function(name) { return name }) {
		var html = "";
		if (props.label) {
			html = '<p class="label">' + props.label + '</p>'; 
		}

		var optionsFn = function(data) {
			return Object.keys(data).map(function(el){
				var id = fn(el);
				return '<option value="' + el + '" id="' + id + '"' 
							+ '>' + data[el] 
					+ '</option>';
			});
		};

		var groups = 
		Object.keys(data).map(function(key){
			return '<optgroup label="' + key + '">' 
					+ optionsFn(data[key]).join('') 
					+ '</optgroup>';
		});

		html = html + '<p class="builder"><select name="' + props.name+ '">' 
						+ groups.join('')  + '</select>'
					+ '</p>' 
		return html;
	};

    static byId(id) {
        return document.getElementById(id);
    }

    static bySelector(selector, all = false) {
        return all ? document.querySelectorAll(selector) 
            : document.querySelector(selector);
    }

    static simpleDropDownBuilder(data, props = { 'name' : ''}) {
        let html = '';
        if (props.label) {
            html = '<p class="label">' + props.label + '</p>';
        }
        return html + 
            '<p class="builder">'
            + '<select name="' + props.name + '">'
                + Object.keys(data.selects).map((el) => {
                        return '<option value="' + el + '"' 
                        // + (data.def === el ? 'selected="selected"' : '')
                        +'>' + data.selects[el].label + '</option>';
                    }).join('')
            + '</select></p>';
    }

    static selectValue(selectSelector, optionSelector) {
        document.querySelector(selectSelector)
            .querySelector(optionSelector)
            .selected = true;
    }

    static syncFields(newForm, form, selectors) {
        selectors.forEach(el => {
            Array.prototype.forEach.call(form.querySelectorAll(el), (element) => {
                let name = element.getAttribute("name");
                newForm.querySelector(el + '[name=' + name + ']').value = element.value;
            });
        });
    }

    static hideElementsById(ids_array) 
    {
        this.hideElements(ids_array.map((id) => this.byId(id)));
    }

    static hideElements(elements) {
        for(let element of elements) {
            element.style.display = 'none';
        }
    }

    static removeClassesFromElements(elCollection, classes) {
        Array.prototype.forEach.call(elCollection, (el) => {
            this.removeClasses(el,classes);
        });
    }

    static removeClasses (el, classes) {
        classes.forEach(e => {
            this.removeClass(el,e);
        });
    }

    static removeClass(el, className) {
        if (el.classList) {
            el.classList.remove(className);
        } else if (el.className.indexOf(className) !== -1) {
            let classes = el.className.split(' ');
            el.className = classes.splice(classes.indexOf(className), 1).join(' ');
        }
    }

     static hasClass(el,className) {
        return el.classList ? el.classList.contains(className) : 
            el.className.indexOf(className) !== -1;
    }

     static addClass(el, className) {
        if (el.classList) {
            el.classList.add(className);
        } else if (el.className.indexOf(className) === -1) {
            el.className = el.className + ' ' + className;
        }
    }

     static addClassToElements(collection, className) {
         Array.prototype.forEach.call(collection, (el) => this.addClass(el, className));
    }    

    static triggerClick(el, cancelable = false) {
        let event = new MouseEvent("click", {"bubbles":true, "cancelable":cancelable});
        el.dispatchEvent(event);
    }    

    static triggerNative(el, eventName) {
        let event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, true, false);
        el.dispatchEvent(event);
    }

    static findParent(target, selector) {
        if ('BODY' === target.tagName) {
            return null;
        } else if (target.matches(selector)) {
            return target;
        } else {
            return this.findParent(target.parentNode, selector);
        }
    }

    static showElementsById(arr) {
        arr.forEach((id) => {
            this.showElement(this.byId(id));
        });
    }

    static showElement(element) {
        element.style.display = '';
    }

    static showElements(elementCollection) {
        Array.prototype.forEach.call
        (elementCollection, (e) => this.showElement(e));
    }

    static hideElementsById(arr) {
        arr.forEach((id) => {
            this.hideElement(this.byId(id));
        });
    }

   static hideElements(elementCollection) {
       Array.prototype.forEach.call
       (elementCollection, (e) => this.hideElement(e));
    }

    static hideElement(element) {
        element.style.display = 'none';
    }

// similar to jquery offset method
    static getPosition(target) {
        let box = target.getBoundingClientRect();
        let docElem = document.documentElement;
        return {
            top: box.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
            left: box.left + (window.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
        };
    }

    static matches(element, map) {
        let keys = Object.keys(map);
        keys.some((el) => {
            if (element.matches(el)) {
                map[el](element);
                return true;
            }
            return false;
        });
    }

    static createElement(el, attr = {}) {
        let result = document.createElement(el);
        let keys = Object.keys(attr);
        if (keys.length !== 0) {
            keys.forEach((e) => result.setAttribute(e, attr[e]));
        }
        return result;
    }

    static isVariableDefined(variable) {
        return typeof variable !== 'undefined' && variable !== null
    }

    static makeGetORPost(url = '', attr = {}) {
        if ('' === url || Object.keys(attr).length === 0)
            return;
        let qStr = 
            Object.keys(attr).map((el) => el + '=' + attr[key]).join('&');
        /*
		 * not sure what could be the best length. 
		 * but http://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers
		 * says 2000 characters. Will gradually increase this if needed
		 */        
        if (qStr.length < 600) {
            url = url.endsWith('/') ? url : (url + '/');
            window.location.href = url + (qStr.length > 0 ? ('?' + qStr) : '');
        } else {
            let form = utils.createElement('form', {
                'method' : 'POST', 'action' : url 
            });
            Object.keys(attr).forEach((el) => {
                form.appendChild(
                utils.createElement('input', {
                    'name' : el, 'value' : attr[el]
                }));
            });
            document.body.appendChild(form);
            form.submit();
            utils.removeElement(form);
        }
    }

    static tabUI(container, showUp) {
        return (e) => {
            let parent = e.target.parentNode;
            if (this.hasClass(parent, 'active'))
                return;
            
            this.removeClassesFromElements(parent.parentNode.children, ['active']);
            this.addClass(parent, 'active');
            this.addClassToElements(container.querySelectorAll('.tab-section'), 'hide');
            this.removeClass(showUp, 'hide');
        };
    }
    static ready(fn) {
        if (document.readyState != 'loading'){
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
}

