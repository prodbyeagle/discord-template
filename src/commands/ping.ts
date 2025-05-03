import {
	ChatInputCommandInteraction,
	EmbedBuilder,
	PermissionFlagsBits,
	SlashCommandBuilder,
} from 'discord.js';

import type { ICommand } from '@/types';
import { EagleClient } from '@/client';

export const pingCommand: ICommand = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong! and latency info')
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
	execute: async (
		interaction: ChatInputCommandInteraction
	): Promise<void> => {
		const client = interaction.client as EagleClient;

		await interaction.reply({ content: 'Pinging...' });

		const sent = await interaction.fetchReply();
		const latency = sent.createdTimestamp - interaction.createdTimestamp;
		const apiLatency = Math.round(client.ws.ping);

		const embed = new EmbedBuilder()
			.setTitle('🏓 Pong!')
			.setDescription(
				`**Bot Latency:** \`${latency}ms\`\n**API Latency:** \`${apiLatency}ms\``
			)
			.setFooter({
				text: 'made with ❤️ by @prodbyeagle',
			})
			.setColor('Random');

		await interaction.editReply({
			content: '',
			embeds: [embed],
		});
	},
};
