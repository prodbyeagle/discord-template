import { REST, Routes } from 'discord.js';
import { pingCommand } from '@/commands/ping';
import { autocompleteCommand } from '@/commands/autocomplete';

import { EagleClient } from '@/client';
import { logMessage, config } from '@/lib';

import type { ICommand } from '@/types';

/**
 * Registers and initializes all slash commands for the bot.
 *
 * This function takes the client instance, sets up the REST API, and registers
 * the commands defined in the application. The commands are first stored in
 * a map for easy retrieval and then registered with Discord's API.
 *
 * @param client - The client instance of the bot used to register commands.
 * @returns A promise that resolves once the commands are registered.
 */
export const initializeCommands = async (
	client: EagleClient
): Promise<void> => {
	const rest = new REST({ version: '10' }).setToken(config.token);

	// Create a Map to hold commands with their name as the key
	const commands = new Map<string, ICommand>();

	// Array of all available commands to register
	const allCommands: ICommand[] = [pingCommand, autocompleteCommand];

	// Loop through each command and set it up in the map and client
	for (const command of allCommands) {
		commands.set(command.name, command);
		client.commands.set(command.name, command);
	}

	if (!client.user) {
		logMessage(
			'Client user is undefined. Unable to register commands.',
			'error'
		);
		return;
	}

	try {
		await rest.put(Routes.applicationCommands(client.user.id), {
			body: Array.from(commands.values()).map(
				(command) => command.data.toJSON()
			),
		});
		logMessage('Commands successfully registered.', 'info');
	} catch (error) {
		logMessage(
			`Error while refreshing commands: ${
				error instanceof Error ? error.message : String(error)
			}`,
			'error'
		);
	}
};
