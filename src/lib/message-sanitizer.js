'use strict';

const emojiRegex = require('emoji-regex')();

const customEmojiRegex = new RegExp(/<:(.*?)>/);
const mentionRegex = new RegExp(/<@(.*?)>/);

module.exports = class MessageSanitizer {

	static get regexTypes() {

		return {
			emoji: emojiRegex,
			customEmoji: customEmojiRegex,
			mentions: mentionRegex
		};
	}

	static clean(termsToRemove, message) {

		return termsToRemove.reduce((sanitizedMessage, regexType) => {

			if(!this.regexTypes[regexType])
				return sanitizedMessage;

			return sanitizedMessage.replace(this.regexTypes[regexType], '');
		}, message);
	}
};
