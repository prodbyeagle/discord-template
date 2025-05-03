import { EagleClient } from '@/client';
import { interactionCreateEvent } from '@/events/interaction';
import { readyEvent } from '@/events/ready';
import { config, logMessage } from '@/lib';

export const client = new EagleClient();

/**
 * Initializes the bot client, event listeners, and handles bot login.
 */
const initializeBot = async () => {
	try {
		readyEvent(client);
		interactionCreateEvent(client);

		await client.login(config.token);

		logMessage('Bot successfully logged in and ready!', 'info');
	} catch (err) {
		logMessage(
			`Error during bot initialization: ${
				err instanceof Error ? err.message : err
			}`,
			'error'
		);
	}
};

initializeBot();
