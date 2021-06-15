'use strict';

module.exports = class Stress {

	static get maxStress() {
		return 100;
	}

	/**
	 * Stress Simulator (Isn't the real life?)
	 * @param {Object} options
	 * @param {Number} options.multiplier The stress multiplier factor (the more sh*t happens, the more stress you get, compadre)
	 * @param {Number} options.copingTime The time (seconds) to wait until the stress returns to <= 1 (the amount of time you need to cry)
	 * @example
	 * // Increase stress proportionally at 1.25x and cry for 2 minutes to feel good again
	 * new Stress({ multiplier: 1.25, copingTime: 120 });
	 */
	constructor({ multiplier, copingTime }) {

		this.copingCooldownFactor = this.constructor.maxStress / copingTime;
		this.copingMechanism = {};

		this.multiplier = multiplier;
		this.level = 1;
	}

	/**
	 * Applies pressure to you, like every single thing that happens in real life. Yeah let's cry together (Imagine crying btw)
	 * @returns {Boolean}
	 * - `true` If despite your stress level you can continue faking that smile
	 * - `false` If you're f*cked up :(
	 */
	pressure() {

		if(this.isSuffering)
			return false;

		this.increaseStress();

		return !this.isSuffering;
	}

	/**
	 * HAHAHAHA YES >:D
	 * - Uh, yeah this increases the stress level using the multiplier and that, you know...
	 */
	increaseStress() {

		this.level *= this.multiplier;

		if(this.level >= this.constructor.maxStress)
			this.isSuffering = true;

		this.cope();
	}

	/**
	 * Yeah! Bottle your problems and feelings, how long can you last? *laughs in crying*
	 * - Also this basically generates the coping mechanism which reduces the stress based on the specified coping time. **WOAH I'M SO NEEEEERDDD OWO**
	 * - NO, no, I'm not good at math. Yes, this has nothing to do with here, but I wanted to say it
	 */
	cope() {

		if(this.copingMechanism._destroyed === false)
			return;

		this.copingMechanism = setInterval(() => {

			this.level -= this.copingCooldownFactor;

			if(this.level > 1)
				return;

			this.isSuffering = false;
			this.level = 1;

			clearInterval(this.copingMechanism);

		}, 1000);
	}
};
