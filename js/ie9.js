(function () {
	"use strict";
	function ClassList (e) {
		//Array.call(this);

		this.e = e;

		var list = e.className.split(' ');
		for (var i = 0, l = list.length; i < l; ++i)
			Array.prototype.push.call(this, list[i]);
	}

	Object.defineProperties(ClassList.prototype, {
		add: {
			value: function () {

				exists: for (var a = 0, l = arguments.length; a < l; ++a) {
					var cls = arguments[a].toLowerCase();

					for (var i = 0; i < this.length; ++i)
						if (cls === this[i])
							break exists;
					this.push(cls)
				}

				this.e.className = this.join(' ');
			},
			writable: false,
			enumerable: false,
			configurable: false
		},
		join: {
			value: Array.prototype.join,
			writable: false,
			enumerable: false,
			configurable: false
		},
		remove: {
			value: function () {

				for (var a = 0, l = arguments.length; a < l; ++a) {
					var cls = arguments[a].toLowerCase();

					for (var i = 0; i < this.length; ++i)
						if (this[i] === cls) {
							this.splice(i, 1);
							--i;
						}
				}

				this.e.className = this.join(' ');
			},
			writable: false,
			enumerable: false,
			configurable: false
		},
		push: {
			value: Array.prototype.push,
			writable: false,
			enumerable: false,
			configurable: false
		},
		splice: {
			value: Array.prototype.splice,
			writable: false,
			enumerable: false,
			configurable: false
		},
	});

	Object.defineProperties(Element.prototype, {
		classList: {
			get: function () {
				return new ClassList(this);
			}
		}
	});
})();