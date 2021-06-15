'use strict';

const formatters = require('./dynamic-formatters');

const identifierRegex = new RegExp(/<#:(.*?)>/g);

module.exports = class DynamicResponses {

	static get formatters() {
		return formatters;
	}

	static parse(response, context) {

		const dynamicItems = response.match(identifierRegex);

		if(!dynamicItems || !dynamicItems.length)
			return response;

		const formattedItems = dynamicItems.reduce((formatted, identifier) => {

			const formatterType = identifier.replace(/<#:|>/g, '');

			const [name, ...props] = formatterType.split('.');

			if(!this.formatters[name])
				return;

			formatted[formatterType] = this.formatters[name](props, context);

			return formatted;
		}, {});

		Object.entries(formattedItems).forEach(([identifier, value]) => {
			response = response.replace(`<#:${identifier}>`, value);
		});

		return response;
	}
};
