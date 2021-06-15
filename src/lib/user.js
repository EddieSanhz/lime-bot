'use strict';

const Stress = require('./stress');

module.exports = class User {

	static get defaultStressSetting() {

		return {
			stressMultiplier: 1.15,
			copingTime: 300
		};
	}

	/**
	 * User
	 * @param {User} author Discord Message Author
	 * @param {GuildMember} member Discord Message Member
	 */
	constructor(author, member, stressConfig) {

		this.id = author.id;
		this.name = author.username;
		this.discriminator = author.discriminator;
		this.tag = author.tag;
		this.avatarId = author.avatar;
		this.roles = this.getUserRoles(member);
		this.stress = new Stress(stressConfig || this.constructor.defaultStressSetting);
	}

	getUserRoles(member) {

		const roles = member.roles.cache.map(role => role);

		return roles.reduce((userRoles, { members, ...role }) => {

			if(members.has(this.id))
				userRoles.push(role);

			return userRoles;

		}, []);
	}
};
