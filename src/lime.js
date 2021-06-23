'use strict';

const { Client } = require('discord.js');
const MessageSanitizer = require('./lib/message-sanitizer');
const Stress = require('./lib/stress');
const User = require('./lib/user');
const botModules = require('./modules');

module.exports = class Lime {

	constructor(config) {

		this.discordClient = new Client({
			presence: {
				status: 'idle',
				activity: {
					name: 'You',
					type: 'WATCHING'
				}
			}
		});

		this.stress = new Stress(config.stress);

		this.config = config;
		this.modules = {};
		this.usersById = {};
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

		this.discordClient.login(this.config.discordToken);
	}

	async handleMessage(message) {

		if(!message.mentions.has(this.discordClient.user))
			return;

		const user = this.getUserById(message);

		const previousStressStatus = {
			user: user.stress.isSuffering,
			main: this.stress.isSuffering
		};

		// TODO
		// Stressed messages should to be answered after it have finished replying to the message queue first

		if(!user.stress.pressure()) {

			console.log(`Bot currently tired of ${user.name}: stress level ${user.stress.level}`);

			return !previousStressStatus.user &&
			this.modules.chatbot.chat(message, user,
				() => 'Enough messages from you, this is boring... If you want to talk to me, sweetie, try again in a while and **maybe** I\'ll answer you.'
			);
		}

		if(!this.stress.pressure()) {
			console.log(`Bot currently stressed: stress level ${this.stress.level}`);
			return !previousStressStatus.main && this.modules.chatbot.send(message.channel, 'Well fuck! Enough messages from all, I\'m fucking tired, I\'ll back in a while, maybe.');
		}

		console.log({
			mainStress: this.stress.level,
			userStress: user.stress.level
		});

		message.content = MessageSanitizer.clean(
			[
				'mentions',
				'customEmoji',
				'emoji'
			],
			message.content
		);

		console.log(`Replying to ${user.tag}:`, message.content);

		return this.modules.chatbot.chat(message, user);
	}

	getUserById({ author, member }) {

		if(!this.usersById[author.id])
			this.usersById[author.id] = new User(author, member, this.config.user.stress);

		return this.usersById[author.id];
	}
};
