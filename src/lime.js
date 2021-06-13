'use strict';

const { Client } = require('discord.js');
const MessageSanitizer = require('./lib/message-sanitizer');
const botModules = require('./modules');

module.exports = class Lime {

	constructor({ discordToken } = {}) {
		this.discordClient = new Client();
		this.discordToken = discordToken;
		this.modules = {};
	}

	async initializeModules() {

		// Chatbot
		this.modules.chatbot = new botModules.Chatbot('Lime');
	}

	async start() {
		await this.initializeModules();
		return this.main();
	}

	async main() {

		this.discordClient.on('ready', () => {
			console.log(`Katie is here bitches @ ${this.discordClient.user.tag}`);
		});

		this.discordClient.on('message', message => this.handleMessage(message));

		this.discordClient.login(this.discordToken);
	}

	async handleMessage(message) {

		if(!message.mentions.has(this.discordClient.user))
			return;

		message.content = MessageSanitizer.clean(
			[
				'mentions',
				'customEmoji',
				'emoji'
			],
			message.content
		);

		console.log('Replying to:', message.content);

		const response = await this.modules.chatbot.chat(message);

		return message.reply(response);
	}
};
