'use strict';

const emojiRegex = require('emoji-regex')();

const customEmojiRegex = new RegExp(/<:(.*?)>/g);
const mentionRegex = new RegExp(/<@(.*?)>/g);
const spoilerRegex = new RegExp(/\|\|/g);

module.exports = class MessageSanitizer {

	static get regexTypes() {

		return {
			emoji: emojiRegex,
			customEmoji: customEmojiRegex,
			mentions: mentionRegex,
			spoiler: spoilerRegex
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
