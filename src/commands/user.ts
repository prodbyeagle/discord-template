import { SlashCommandBuilder, EmbedBuilder, MessageFlags } from 'discord.js';
import type { ICommand } from '@/types';

export const usercommand: ICommand = {
	data: new SlashCommandBuilder()
		.setName('user-info')
		.setDescription('View info about a user')
		.addUserOption((option) =>
			option
				.setName('target')
				.setDescription('User to inspect')
				.setRequired(true)
		),

	async execute(interaction) {
		const user = interaction.options.getUser('target', true);
		const member = interaction.guild?.members.cache.get(user.id);

		const embed = new EmbedBuilder()
			.setTitle(`👤 User Info: ${user.username}`)
			.setThumbnail(user.displayAvatarURL())
			.addFields(
				{ name: 'Username', value: `${user.tag}`, inline: true },
				{ name: 'ID', value: user.id, inline: true },
				{
					name: 'Joined Server',
					value: member?.joinedAt?.toDateString() || 'Unknown',
					inline: false,
				}
			)
			.setColor('Random');

		await interaction.reply({
			embeds: [embed],
			flags: MessageFlags.Ephemeral,
		});
	},
};
