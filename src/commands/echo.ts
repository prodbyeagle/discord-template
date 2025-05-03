import {
	ChannelType,
	EmbedBuilder,
	MessageFlags,
	PermissionFlagsBits,
	SlashCommandBuilder,
	TextChannel,
} from 'discord.js';
import type { ICommand } from '@/types';

export const echocommand: ICommand = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Send a message to a selected channel')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.addChannelOption((option) =>
			option
				.setName('channel')
				.setDescription('Target text channel')
				.setRequired(true)
				.addChannelTypes(ChannelType.GuildText)
		)
		.addStringOption((option) =>
			option
				.setName('message')
				.setDescription('Message to send')
				.setRequired(true)
		),

	async execute(interaction) {
		const target = interaction.options.getChannel(
			'channel',
			true
		) as TextChannel;
		const message = interaction.options.getString('message', true);

		await target.send(message);

		const embed = new EmbedBuilder()
			.setTitle('✅ Message Sent')
			.setDescription(`Message sent to ${target}`)
			.setColor('Green');

		await interaction.reply({
			embeds: [embed],
			flags: MessageFlags.Ephemeral,
		});
	},
};
