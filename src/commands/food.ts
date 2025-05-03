import type { ICommand } from '@/types';
import {
	SlashCommandBuilder,
	EmbedBuilder,
	MessageFlags,
	PermissionFlagsBits,
} from 'discord.js';

const fruits = [
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

export const foodcommand: ICommand = {
	data: new SlashCommandBuilder()
		.setName('food')
		.setDescription('Choose a fruit')
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
		.addStringOption((option) =>
			option
				.setName('fruit')
				.setDescription('Pick a fruit')
				.setRequired(true)
				.setAutocomplete(true)
		),

	async autocomplete(interaction) {
		const focused = interaction.options.getFocused();
		const filtered = fruits
			.filter((f) => f.toLowerCase().startsWith(focused.toLowerCase()))
			.slice(0, 25)
			.map((fruit) => ({ name: fruit, value: fruit }));
		await interaction.respond(filtered);
	},

	async execute(interaction) {
		const fruit = interaction.options.getString('fruit', true);
		const embed = new EmbedBuilder()
			.setTitle('🍽️ Fruit Selection')
			.setDescription(`You selected **${fruit}**!`)
			.setColor('Random');

		await interaction.reply({
			embeds: [embed],
			flags: MessageFlags.Ephemeral,
		});
	},
};
