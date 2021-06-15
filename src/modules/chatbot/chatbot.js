'use strict';

const { BasicBot } = require('neural-chatbot');
const { UserData } = require('neural-phrasex');

const DynamicResponses = require('./lib/dynamic-responses');

const mainData = require('./db.json');

module.exports = class Chatbot {

	constructor(userName) {

		this.config = {
			database: mainData,
			doc: {
				description: {
					name: userName
				}
			}
		};

		this.pendingMessages = [];
	}

	get bot() {

		if(!this._bot)
			this._bot = new BasicBot();

		return this._bot;
	}

	get userData() {

		if(!this._userData)
			this._userData = new UserData();

		return this._userData;
	}

	/**
	 * Makes the bot reply to a received chat message
	 * @param {Discord.Message} message The discord.js message object
	 * @param {User} user An user (see user lib for more info)
	 * @param {Object} options
	 * @param {Boolean} options.simulateTyping Specifies if the bot should simulate reaction and typing times (default: true)
	 * @returns
	 */
	async chat(message, user, { simulateTyping = true } = {}) {

		if(this.busy) {
			this.pendingMessages.push([message, user]);
			return;
		}

		this.busy = true;

		await this.initializeChatbot();

		if(simulateTyping) {

			// Reaction time
			if(this.pendingMessages.length)
				await this.wait(1, 2);
			else
				await this.wait(4, 8);

			message.channel.startTyping();

			// Typing time
			await this.wait(2, 6);
			message.channel.stopTyping();
		}

		const { response } = await this.bot.getResult(message.content, this.userData);

		message.reply(DynamicResponses.parse(response, user));

		this.busy = false;

		if(this.pendingMessages.length) {
			const [[nextMessage, nextMessageUser]] = this.pendingMessages.splice(0, 1);
			return this.chat(nextMessage, nextMessageUser);
		}
	}

	/**
	 * Initializes the Chatbot instance
	 */
	async initializeChatbot() {

		if(this.initialized)
			return;

		this.userData.initialize();
		await this.bot.initialize(this.config);

		this.initialized = true;
	}

	/**
	 * Waits a random amount of seconds between the min and max values
	 * @param {Number} min minimum seconds to wait
	 * @param {Number} max maximum seconds to wait
	 */
	async wait(min, max) {

		const secondsToWait = min && max ? Math.floor(Math.random() * (max - min + 1) + min) : min;

		return new Promise(res => {

			setTimeout(() => {
				return res();
			}, secondsToWait * 1000);
		});
	}
};
