import { EagleClient } from '@/client';
import { logMessage } from '@/lib';
import { EmbedBuilder, Events, MessageFlags } from 'discord.js';

/**
 * Handles the `InteractionCreate` event.
 * This event is triggered when an interaction (such as a command or autocomplete) is created.
 *
 * It processes both autocomplete interactions and chat input commands,
 * executing the associated command if available, and handling errors gracefully.
 *
 * @param client - The Client instance that emits this event.
 */
export const interactionCreateEvent = (client: EagleClient) => {
	client.on(Events.InteractionCreate, async (interaction) => {
		if (!interaction) {
			logMessage('Received an undefined or null interaction.', 'error');
			return;
		}

		if (interaction.isAutocomplete()) {
			const command = client.commands.get(interaction.commandName);

			if (command?.autocomplete) {
				try {
					await command.autocomplete(interaction);
					logMessage(
						`Successfully handled autocomplete for ${interaction.commandName}`,
						'info'
					);
				} catch (error) {
					if (error instanceof Error) {
						logMessage(
							`Error executing command ${interaction.commandName}: ${error.message}`,
							'error'
						);
					} else {
						logMessage(
							`Error executing command ${
								interaction.commandName
							}: ${String(error)}`,
							'error'
						);
					}
				}
			}
			return;
		}

		if (!interaction.isChatInputCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) {
			logMessage(`Unknown command: ${interaction.commandName}`, 'warn');
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			if (error instanceof Error) {
				logMessage(
					`Error executing command ${interaction.commandName}: ${error.message}`,
					'error'
				);
			} else {
				logMessage(
					`Error executing command ${
						interaction.commandName
					}: ${String(error)}`,
					'error'
				);
			}

			const errorEmbed = new EmbedBuilder()
				.setTitle('❌ Command Error')
				.setDescription('There was an error executing this command!')
				.setColor('DarkRed')
				.setTimestamp();

			try {
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({
						embeds: [errorEmbed],
						flags: MessageFlags.Ephemeral,
					});
				} else {
					await interaction.reply({
						embeds: [errorEmbed],
						flags: MessageFlags.Ephemeral,
					});
				}
			} catch (replyError) {
				let errorMsg = '';
				if (replyError instanceof Error) {
					errorMsg = replyError.message;
				} else {
					errorMsg = String(replyError);
				}
				logMessage(
					`Error sending error message for ${interaction.commandName}: ${errorMsg}`,
					'error'
				);
			}
		}
	});
};
