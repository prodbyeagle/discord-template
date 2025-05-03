import {
	ChatInputCommandInteraction,
	AutocompleteInteraction,
	EmbedBuilder,
	MessageFlags,
	PermissionFlagsBits,
	SlashCommandBuilder,
} from 'discord.js';

import type { ICommand } from '@/types';
import { EagleClient } from '@/client';

const choices = [
	'Apple',
	'Apricot',
	'Avocado',
	'Banana',
	'Blackberry',
	'Blueberry',
	'Cherry',
	'Date',
	'Dragonfruit',
	'Elderberry',
	'Fig',
	'Grape',
	'Kiwi',
	'Lemon',
	'Mango',
	'Nectarine',
	'Orange',
	'Papaya',
	'Peach',
	'Pear',
	'Pineapple',
	'Plum',
	'Raspberry',
	'Strawberry',
	'Watermelon',
];

export const autocompleteCommand: ICommand = {
	name: 'autocomplete',
	description: 'Demo autocomplete command',
	data: new SlashCommandBuilder()
		.setName('autocomplete')
		.setDescription('Demo autocomplete command')
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
		.addStringOption((opt) =>
			opt
				.setName('fruit')
				.setDescription('Choose a fruit')
				.setAutocomplete(true)
				.setRequired(true)
		),
	autocomplete: async (interaction: AutocompleteInteraction) => {
		const focusedValue = interaction.options.getFocused() as string;
		const filtered = choices
			.filter((c) =>
				c.toLowerCase().startsWith(focusedValue.toLowerCase())
			)
			.slice(0, 25);

		await interaction.respond(filtered.map((c) => ({ name: c, value: c })));
	},
	execute: async (
		interaction: ChatInputCommandInteraction
	): Promise<void> => {
		const client = interaction.client as EagleClient;
		const fruit = interaction.options.getString('fruit', true);

		const embed = new EmbedBuilder()
			.setTitle('🍽️ Your selection')
			.setDescription(`You picked **${fruit}**!`)
			.setColor('Random');

		await interaction.reply({
			embeds: [embed],
			flags: MessageFlags.Ephemeral,
		});
	},
};
