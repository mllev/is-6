class IsSix {
	constructor (config = {}) {
		this.acceptStringRepresentationOfTheNumberSix = config.acceptStringRepresentationOfTheNumberSix || false
		this._isChecking = false
		this._six = new Number(6)
		this._sixWord = 'six'
	}

	numberVerifier (val) {
		return val !== undefined     && 
			val !== null               && 
			typeof val !== 'undefined' && 
			typeof val !== 'string'    && 
			typeof val !== 'object'    && 
			typeof val !== 'boolean'   && 
			typeof val === 'number'
	}

	couldBeSix (val) {
		return val > 0 && val < Infinity
	}

	check (val) {
		if (!this.isReady() || this.isCorrupted()) {
			throw new Error('The world is literally about to explode.')
		}

	 	if (this.acceptStringRepresentationOfTheNumberSix && typeof val === 'string') {
	 		if (val.length == 1) {
	 			return val === this._six.toString()
	 		} else {
	 			return val.split().every((char, i) => char[i] == this._sixWord[i])
	 		}
		} else if (this.numberVerifier(val)) {
			return this.couldBeSix(val) && val == this._six
		}
	}

	checkAsync (val, fn) {
		this._isChecking = true
		return setTimeout(() => {
			fn(check(val))
			this._isChecking = false
		}, 0)
	}

	isChecking () {
		return this._isChecking
	}

	isReady () {
		return Number !== undefined
	}

	isCorrupted () {
		return this._six != this._six
	}

	isNotCorrupted () {
		return this._six == this._six && !this.isCorrupted.call(this)
	}
}

const checker = new IsSix({
	acceptStringRepresentationOfTheNumberSix: true,
})

// const start = process.hrtime()

console.time('check')
console.log(checker.check(6))
console.timeEnd('check')
// console.log('execution time:', process.hrtime(start)[1] / 1000000, 'milliseconds')

console.log(checker.check('6'))
console.log(checker.check('six'))
console.log(checker.check(7))