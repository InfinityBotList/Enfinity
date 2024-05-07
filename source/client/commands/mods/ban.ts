import type { CacheType, ChatInputCommandInteraction } from "discord.js"
import { CommandTemplate } from '../../../temp/cmds.temp';
import { OptionTypes } from "../../../types/cmd.types";
import { EnfinityClient } from '../../enfinity';

export default class BanComamnd extends CommandTemplate {

    constructor() {
        super({
            name: 'ban',
            description: 'Ban a user from our guild',
            category: 'mods',
            cooldown: 0,
            permissions: {
                user: ['SendMessages', 'BanMembers', 'EmbedLinks', 'UseApplicationCommands'],
                bot: ['SendMessages', 'BanMembers', 'EmbedLinks', 'UseApplicationCommands']
            },
            options: [{
                name: 'user',
                description: 'The user to ban',
                type: OptionTypes.User,
                required: true
            }, {
                name: 'reason',
                description: 'The reason for the ban',
                type: OptionTypes.String,
                required: true
            }]
        })
    }

    public async exec(bot: EnfinityClient, interaction: ChatInputCommandInteraction<CacheType>): Promise<any> {

        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');

        if (!user) return interaction.reply({ content: 'You need to provide a user to ban!', ephemeral: true });
        if (!reason) return interaction.reply({ content: 'You need to provide a reason for the ban!', ephemeral: true });

        await interaction.guild?.bans.create(user, {
            reason: reason,
            deleteMessageSeconds: 86400
        }).then(async (banned: any) => {

            const audits = interaction.guild?.channels.cache.find((c) => c.name === 'mod-logs');

            if (!audits || !audits.isTextBased()) return interaction.reply({ content: 'I could not find the mod-logs channel!', ephemeral: true });

            await audits.send({
                embeds: [
                    new bot.MessageEmbed({
                        title: 'Action: ban user 🔨',
                        description: 'Whoops, someone has been naughty and got caught red handed!',
                        thumbnail: banned.displayAvatarURL(),
                        color: bot.config.colors.error,
                        fields: [{
                            name: 'User',
                            value: `${banned.globalName ? banned.globalName : banned.username}`,
                            inline: true
                        }, {
                            name: 'User ID',
                            value: `\`${banned.id}\``,
                            inline: true
                        }, {
                            name: 'Moderator',
                            value: `${interaction.user.globalName ? interaction.user.globalName : interaction.user.username}`,
                            inline: true
                        }, {
                            name: 'Reason',
                            value: `\`${reason}\``,
                            inline: false
                        }]
                    })
                ]
            })

            return interaction.reply({
                embeds: [
                    new bot.MessageEmbed({
                        title: 'User banned 🔨',
                        description: `Whoops, ${banned.globalName ? banned.globalName : banned.username} has been naughty and got caught red handed!`,
                        color: bot.config.colors.error,
                    })
                ]
            })
        });
    }
}