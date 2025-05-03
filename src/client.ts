import { Client, Collection, GatewayIntentBits } from 'discord.js';

import type { ICommand } from './types';

/**
 * Custom Discord client class for `Eagle`.
 * Extends the base `Client` class from discord.js and adds additional functionality.
 * Change the class name to match your bot's name if necessary.
 * For example, if your bot is called "Dreamy", you can name the class `DreamyClient`.
 */
export class EagleClient extends Client {
	public commands: Collection<string, ICommand> = new Collection();

	constructor() {
		super({
			intents: [
				//? Specify the intents your bot needs here
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.DirectMessages,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildVoiceStates,
			],
		});
	}
}
