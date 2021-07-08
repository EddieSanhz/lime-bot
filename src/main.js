'use strict';

const prompts = require('prompts');
const chalk = require('chalk');

const Lime = require('./lime');
const limeConfig = require('./config.json');

const lime = new Lime(limeConfig);

const getOptions = () => prompts([
	{
		type: 'select',
		name: 'sendFile',
		message: 'What to do?',
		choices: [
			{ title: 'Say something', value: false },
			{ title: 'Send a file', value: true }
		]
	},
	{
		type: prev => (prev ? 'text' : null),
		name: 'file',
		message: 'File path or URL:',
		initial: null
	},
	{
		type: 'text',
		name: 'message',
		message: 'Say someting?',
		initial: null
	},
	{
		type: 'text',
		name: 'channel',
		message: 'Discord channel where to send the message:',
		initial: 'dev-bot'
	}
],
{
	onCancel: () => {
		console.log(chalk.red('😔 K isn\'t dead but she\'s gone.'));
		process.exit(0);
	}
});

const idle = async () => {

	const options = await getOptions();

	await lime.say(options.message, options.file, options.channel);

	return idle();
};

(async () => {

	await lime.start();

	return idle();

})();
