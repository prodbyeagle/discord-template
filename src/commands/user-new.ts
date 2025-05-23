import {
	SlashCommandBuilder,
	MessageFlags,
	ContainerBuilder,
	TextDisplayBuilder,
	SectionBuilder,
	MediaGalleryBuilder,
	ThumbnailBuilder,
} from 'discord.js';
import type { ICommand } from '@/types';

export const usercommandNew: ICommand = {
	data: new SlashCommandBuilder()
		.setName('user-info-new')
		.setDescription('View info about a user')
		.addUserOption((option) =>
			option
				.setName('target')
				.setDescription('User to inspect')
				.setRequired(true)
		),

	async execute(interaction) {
		try {
			const user = interaction.options.getUser('target', true);
			const member = interaction.guild?.members.cache.get(user.id);

			const displayName = user.globalName ?? user.username;
			const joinedDate = member?.joinedAt?.toDateString() ?? 'Unknown';

			const header = new TextDisplayBuilder().setContent(
				`👤 **User Info for ${displayName}**`
			);

			// const avatar = new MediaGalleryBuilder().addItems([
			// 	{
			// 		media: {
			// 			url: user.displayAvatarURL({ size: 512 }),
			// 		},
			// 	},
			// ]);

			const tagDisplay = new TextDisplayBuilder().setContent(
				`🧾 **Tag:** \`${user.tag}\``
			);

			const idDisplay = new TextDisplayBuilder().setContent(
				`🆔 **ID:** \`${user.id}\``
			);

			const joinedDisplay = new TextDisplayBuilder().setContent(
				`📅 **Joined:** \`${joinedDate}\``
			);

			const thumbnail = new ThumbnailBuilder().setURL(
				user.displayAvatarURL({ size: 128 })
			);

			const infoSection = new SectionBuilder()
				.addTextDisplayComponents(tagDisplay, idDisplay, joinedDisplay)
				.setThumbnailAccessory(thumbnail);

			const container = new ContainerBuilder()
				.addTextDisplayComponents(header)
				// .addMediaGalleryComponents(avatar)
				.addSectionComponents(infoSection);

			await interaction.reply({
				flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
				components: [container],
			});
		} catch (error) {
			console.error('Error in user-info-new command:', error);
			if (interaction.replied || interaction.deferred) {
				await interaction.editReply({
					content:
						'❌ An unexpected error occurred while processing your request.',
					components: [],
				});
			} else {
				await interaction.reply({
					content:
						'❌ An unexpected error occurred while processing your request.',
					flags: MessageFlags.Ephemeral,
				});
			}
		}
	},
};
