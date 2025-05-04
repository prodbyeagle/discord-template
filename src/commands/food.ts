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

function getIndefiniteArticle(word: string): 'a' | 'an' {
	return /^[aeiou]/i.test(word) ? 'an' : 'a';
}

export const foodcommand: ICommand = {
	data: new SlashCommandBuilder()
		.setName('food')
		.setDescription('Give someone a fruity treat 🍓')
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
		.addStringOption((option) =>
			option
				.setName('fruit')
				.setDescription('Pick a fruit 🍇')
				.setRequired(true)
				.setAutocomplete(true)
		)
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('Pick a hungry user 😋')
				.setRequired(true)
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
		const user = interaction.options.getUser('user', true);

		if (user.bot) {
			const embed = new EmbedBuilder()
				.setTitle('🤖 Bots Have No Taste Buds')
				.setDescription(`You tried to feed ${user}, but...`)
				.addFields({
					name: '🍽️ Rejected',
					value: 'Bots don’t eat fruit. They consume RAM and electricity.',
				})
				.setColor('NotQuiteBlack')
				.setFooter({ text: 'Try feeding a human next time!' });

			await interaction.reply({
				embeds: [embed],
				flags: MessageFlags.Ephemeral,
			});
			return;
		}

		const article = getIndefiniteArticle(fruit);
		const embed = new EmbedBuilder()
			.setTitle('🍽️ Fruit Served!')
			.setDescription(
				`**${interaction.user.username}** just handed ${user} ${article} **${fruit}**! 🍴\n` +
					`Delicious, nutritious, and approved by 9/10 Discord users.`
			)
			.setColor('Random')
			.setFooter({ text: `Need more fruit? Try /food again.` });

		await interaction.reply({
			embeds: [embed],
			flags: MessageFlags.Ephemeral,
		});
	},
};
