(function () {
	"use strict";

	function hasClass (elem, cls) {
		var list = elem.className.split(' ');
		for (var i = 0, l = list.length; i < l; ++i)
			if (list[i] === cls)
				return true;
		return false;
	}

	function createElement (tag, attrs, text) {
		var elem = document.createElement(tag);
		if (attrs && typeof attrs !== 'object') {
			text = attrs;
			attrs = undefined;
		}

		if (attrs)
			for (var attr in attrs)
				elem[attr] = attrs[attr];

		if (text || text === 0)
			elem.appendChild(document.createTextNode(text));

		return elem;
	}

	function Select() {
		this.setOptions = function (opts, init) {
			this.clear();

			if (init !== undefined)
				this.e.appendChild(createElement('option', {value: ''}, init));

			for (var key in opts)
				this.e.appendChild(createElement('option', {value: key}, opts[key]));

			return this;
		}
	}

	function Word() {
		this.setWord = function (word) {
			if (typeof word !== 'string')
				throw "Incorrect argument type, must be string.";

			this.clear();
			this.word = word;

			var anagram = word.split('').shufle();

			for (var i = 0, l = anagram.length; i < l; ++i) {
				var div = createElement('div', {className: 'letter'}),
				    span = createElement('span', {draggable: true}, anagram[i]);
				div.appendChild(span);
				this.e.appendChild(div);

				new Element(span).on('dradstart', function (value, self, event) {
					console.log(arguments);
				}).on('drag', function (value, self, event) {
					console.log(arguments);
				}, this);
			}

			return this;
		}
	}

	function Element (elem) {
		this.e = elem;

		if (elem.tagName.toLowerCase() === 'select')
			Select.call(this);
		if (hasClass(elem, 'word'))
			Word.call(this);

	}

	Object.defineProperties(Element.prototype, {
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
		disable: {
			value: function (disable) {
				if (!arguments.length)
					disable = true;
				return this.enable(!disable);
			},
			writable: false,
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
		on: {
			value: function (type, handler, context) {
				var target = this.e,
				    self = this,
				    context = context || this;
				try {
					target.addEventListener(type, function (event) {
						return handler.call(context, target.value, self, event);
					}, false);
				} catch (e) {
					target.attachEvent(['on', type].join(''), function (event) {
						return handler.call(context, target.value, self, event || window.event);
					});
				}
				return this;
			},
			writable: false,
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