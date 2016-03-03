(function () {
	"use strict";

	function Select() {
		this.setOptions = function (opts, init) {
			this.clear();

			if (init !== undefined)
				this.createChild('option', {value: ''}, init);

			for (var key in opts)
				this.createChild('option', {value: key}, opts[key]);

			return this;
		}
	}

	function Element (elem) {
		this.e = elem;

		if (elem.tagName.toLowerCase() === 'select')
			Select.call(this);
	}

	Object.defineProperties(Element.prototype, {
		addClass: {
			value: function (cls) {
				if (!(new RegExp(['\\b', cls, '\b'].join('')).test(this.e.className))) {
					var list = this.e.className.split(' ');
					list.push(cls);
					this.e.className = list.join(' ').trim();
				}
				return this;
			},
			writable: false,
			enumerable: false,
			configurable: false
		},
		clear: {
			value: function () {
				while(this.e.childNodes.length)
					this.e.removeChild(this.e.firstChild);
				return this;
			},
			writable: false,
			enumerable: false,
			configurable: false

		},
		createChild: {
			value: function (name, attrs, text) {
				var child = document.createElement(name);
				if (attrs && typeof attrs !== 'object') {
					text = attrs;
					attrs = undefined;
				}

				if (attrs)
					for (var attr in attrs)
				child[attr] = attrs[attr];

				if (text || text === 0)
					child.appendChild(document.createTextNode(text));

				this.e.appendChild(child);

				return new Element(child);
			},
			writable: false,
			enumerable: false,
			configurable: false
		},
		disable: {
			value: function (disable) {
				if (!arguments.length)
					disable = true;
				this.e.disabled = disable;
				return this;
			},
			writable: false,
			enumerable: false,
			configurable: false
		},
		disabled: {
			get: function () {
				return this.e.disabled;
			},
			enumerable: false,
			configurable: false
		},
		enable: {
			value: function (enable) {
				if (!arguments.length)
					enable = true;
				this.e.disabled = !enable;
				return this;
			},
			writable: false,
			enumerable: false,
			configurable: false
		},
		enabled: {
			get: function () {
				return !this.e.disabled;
			},
			enumerable: false,
			configurable: false
		},
		exchange: {
			value: function (elem) {
				var parentNode = this.e.parentNode;
				elem.e.parentNode.appendChild(this.e);
				parentNode.appendChild(elem.e);
				return this;
			},
			writable: false,
			enumerable: false,
			configurable: false
		},
		expand: {
			value: function (v) {
				switch (typeof v) {
					case 'object':
						for (var key in v)
							this[key] = v[key];
						break;
					case 'function': v.apply(this, Array.prototype.slice.call(arguments, 1)); break;
					default: this[v] = v;
				}
				return this;
			},
			writable: false,
			enumerable: false,
			configurable: false
		},
		hide: {
			value: function (hide) {
				if (!arguments.length)
					hide = true;
				return hide ? this.addClass('hidden') : this.removeClass('hidden');
			},
			writable: false,
			enumerable: false,
			configurable: false
		},
		on: {
			value: function (type, handler, opts) {
				opts = opts || {};
				var target = this.e,
				    self = this;

				function addEvent (event) {
					event = event || window.event;

					if (!opts.stopPrevent) {
						try {
							event.preventDefault();
						} catch (e) {
							event.returnValue = false;
						}
					}

					if (opts.noBubble) {
							try {
								event.stopPropagation();
							} catch (e) {
								event.cancelBubble = true;
							}
					}

					return handler.call(opts.context || self, target.value, self, event);
				}

				try {
					target.addEventListener(type, addEvent, false);
				} catch (e) {
					target.attachEvent(['on', type].join(''), addEvent);
				}
				return this;
			},
			writable: false,
			enumerable: false,
			configurable: false
		},
		removeClass: {
			value: function (cls) {
				this.e.className = this.e.className.replace(cls, '').replace(/\s{2,}/g, ' ').trim();
				return this;
			},
			writable: false,
			enumerable: false,
			configurable: false
		},
		setText: {
			value: function (txt) {
				this.text = txt;
				return this;
			},
			writable: false,
			enumerable: false,
			configurable: false
		},
		show: {
			value: function (show) {
				if (!arguments.length)
					show = true;
				return show ? this.removeClass('hidden') : this.addClass('hidden');
			},
			writable: false,
			enumerable: false,
			configurable: false
		},
		text: {
			set: function (txt) {
				this.clear().e.appendChild(document.createTextNode(txt));
			},
			get: function () {
				return this.e.textContent;
			},
			enumerable: false,
			configurable: false
		},
		value: {
			get: function () {
				return this.e.value;
			},
			set: function (v) {
				this.e.value = v;
			},
			enumerable: false,
			configurable: false
		}
	});

	game.addProperty('elementCover', Element);
})();