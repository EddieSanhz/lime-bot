'use strict';

const formatters = require('./dynamic-formatters');

const identifierRegex = new RegExp(/<#:(.*?)>/g);

module.exports = class DynamicResponses {

	static get formatters() {
		return formatters;
	}

	static parse(response) {

		const dynamicItems = response.match(identifierRegex);

		if(!dynamicItems || !dynamicItems.length)
			return response;

		const formattedItems = dynamicItems.reduce((formatted, identifier) => {

			const formatterType = identifier.replace(/<#:|>/g, '');

			if(!this.formatters[formatterType])
				return;

			formatted[formatterType] = this.formatters[formatterType]();

			return formatted;
		}, {});

		Object.entries(formattedItems).forEach(([identifier, value]) => {
			response = response.replace(`<#:${identifier}>`, value);
		});

		return response;
	}
};
