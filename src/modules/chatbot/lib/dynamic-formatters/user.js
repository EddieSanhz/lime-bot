'use strict';

/**
 * User dynamic processor
 * @param {Array<string>} props The prop to get from the user separated nest order
 * @param {User} user An user (see user lib for more info)
 * @example
 * UserFormatter(['stress','level'], user);
 */
module.exports = (props, user) => {

	return props.reduce((prop, key) => {

		if(!prop[key])
			return 'ERROR';

		prop = prop[key];
		return prop;

	}, user);
};
