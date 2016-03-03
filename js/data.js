(function () {
	"use strict";

	var MIN = 2;

	var words = [
		'осень',
		'Ясень',
		'ЁЖ'
	];

	function Data (arr) {
		if (arr instanceof Array)
			this.addWords(arr);
		else if (typeof arr === 'string')
			this.addWord(arr);
		else
			throw "Incorrect initial data";
	}

	Object.defineProperties(Data.prototype, {
		addWord: {
			value: function (w) {
				if (!w || typeof w !== 'string' || w.length < MIN || /[^a-zA-Zёа-яЁА-Я]/.test(w))
					throw ['Incorrect word:', w].join(' ');
				w = w.toLowerCase();
				var length = w.length;
				if (!this[length])
					this[length] = [w];
				else
					this[length].push(w);
				return this;
			},
			writable: false,
			enumerable: false,
			configurable: false
		},
		addWords: {
			value: function (arr) {
				if (!(arr instanceof Array))
					throw "Incorrect array";
				for (var i = 0, l = arr.length; i < l; ++i)
					this.addWord(arr[i]);
				return this;
			},
			writable: false,
			enumerable: false,
			configurable: false
		},
		getWord: {
			value: function (l) {
				return this[l] ? this[l][Math.floor(Math.random() * this[l].length)] : undefined;
			},
			writable: false,
			enumerable: false,
			configurable: false
		},
		lengthes: {
			get: function () {
				var res = [];
				for (var key in this) {
					key = parseInt(key);
					if (key)
						res.push(key);
				}
				return res;
			},
			enumerable: false,
			configurable: false
		}
	});
	
	game.addProperty('wordList', new Data(words));
})()