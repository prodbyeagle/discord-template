import { ActivityType, Events } from 'discord.js';

import { logMessage } from '@/lib';

import { initializeCommands } from '@/events/initializeCommands';
import { EagleClient } from '@/client';

/**
 * Handles the `ClientReady` event.
 * This event is triggered when the bot has successfully logged in and is ready to use.
 * It initializes the bot commands and logs the status.
 *
 * @param client - The EagleClient instance that emits this event.
 */
export const readyEvent = (client: EagleClient) => {
	client.on(Events.ClientReady, async () => {
		if (client.user) {
			try {
				client.user.setPresence({
					activities: [
						{
							type: ActivityType.Custom,
							name: 'custom',
							state: '🦅 @PRODBYEAGLE DISCORD BOT TEMPLATE',
						},
					],
					status: 'dnd',
				});

				initializeCommands(client);

				logMessage(
					'Bot is ready and commands are initialized.',
					'info'
				);
			} catch (error) {
				if (error instanceof Error) {
					logMessage(`Error during bot initialization`, 'error');
				} else {
					console.error(`Error during bot initialization`);
				}
			}
		} else {
			logMessage('Client user is undefined. Unable to log in.', 'warn');
		}
	});
};
