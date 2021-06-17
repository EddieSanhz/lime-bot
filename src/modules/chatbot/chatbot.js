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
	 * @param {Function} customResponse (optional) Uses the specified function to get the bot response message
	 * @returns
	 */
	async chat(message, user, customResponse) {

		if(this.busy) {
			this.pendingMessages.push([message, user, customResponse]);
			return;
		}

		this.busy = true;

		await this.initializeChatbot();
		await this.simulateTyping(message.channel);

		const response = await (customResponse ? customResponse(message.content) : this.getResponse(message.content));

		message.reply(DynamicResponses.parse(response, user));

		this.busy = false;

		if(this.pendingMessages.length) {
			const [[nextMessage, nextMessageUser, nextCustomResponse]] = this.pendingMessages.splice(0, 1);
			return this.chat(nextMessage, nextMessageUser, nextCustomResponse);
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
	 * Makes the bot to use it's computational powers to reply to your stupid message :D
	 * @param {String} message The message to reply
	 * @returns {String} The bot response
	 */
	async getResponse(message) {
		const { response } = await this.bot.getResult(message, this.userData);
		return response;
	}

	/**
	 * Simulates reaction and typing times owo
	 * @param {Channel} discordChannel Discord Channel object
	 */
	async simulateTyping(discordChannel) {

		// Reaction time
		if(this.pendingMessages.length)
			await this.wait(1, 2);
		else
			await this.wait(4, 8);

		discordChannel.startTyping();

		// Typing time
		await this.wait(2, 6);
		discordChannel.stopTyping();
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

	/**
	 * Send a message to the received discord channel
	 * @param {Channel} discordChannel The discord channel object
	 */
	async send(discordChannel, message) {
		await this.simulateTyping(discordChannel);
		return discordChannel.send(message);
	}
};
