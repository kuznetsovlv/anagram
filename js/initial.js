(function () {
	"use strict";

	function parseAttrs (attrs) {
		var list='writable,enumerable,configurable'.split(',');
		for (var i = 0, l = list.length; i < l; ++i) {
			var attr = list[i];
			attrs[attr] = attr in attrs ? !!attrs[attr] : true;
		}
		return attrs;
	}

	function Container () {};

	Object.defineProperties(Container.prototype, {
		addProperty: {
			value: function (name, value, attrs) {
				if (!attrs || typeof attrs !== 'object')
					attrs = {};
				attrs.value = value;
				Object.defineProperty(this, name, attrs);
				return this;
			},
			writable: false,
			enumerable: false,
			configurable: false
		},
		complete: {
			value: function (calback/*[, arg1, arg2, ..., argN]*/) {
				return calback.apply(this, Array.prototype.slice.call(arguments, 1))
			}
		}
	});

	window.game = new Container ();
})();