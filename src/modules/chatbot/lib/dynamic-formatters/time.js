'use strict';

module.exports = () => {

	const date = new Date();

	const hours = ('0' + date.getUTCHours).slice(-2);
	const minutes = ('0' + date.getUTCMinutes).slice(-2);

	return `${hours}:${minutes}`;
};
