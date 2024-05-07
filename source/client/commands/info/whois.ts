import type { CacheType, ChatInputCommandInteraction } from "discord.js"
import { CommandTemplate } from '../../../temp/cmds.temp';
import { OptionTypes } from "../../../types/cmd.types";
import { EnfinityClient } from '../../enfinity';
import moment from 'moment';

export default class AboutCommand extends CommandTemplate {

    constructor() {
        super({
            name: 'whois',
            description: 'Some information about a user/application',
            category: 'info',
            cooldown: 0,
            permissions: {
                user: ['SendMessages'],
                bot: ['SendMessages']
            },
            options: [{
                name: 'user',
                description: 'The user/app to fetch (can be a mention or ID)',
                required: true,
                type: OptionTypes.User
            }]
        })
    }

    public async exec(bot: EnfinityClient, interaction: ChatInputCommandInteraction<CacheType>): Promise<any> {

        const member = interaction.options.getMember("user") as any;

        if (member.user.bot) return interaction.reply({
            embeds: [
                new bot.MessageEmbed({
                    title: `About: ${member.user.tag}`,
                    description: 'Here is some information about the application you requested',
                    thumbnail: member.user.displayAvatarURL(),
                    color: bot.config.colors.base,
                    fields: [{
                        name: 'Created',
                        value: `\`${moment(member.user.createdAt).format('LLLL')}\``,
                        inline: true
                    }, {
                        name: 'Joined',
                        value: `\`${moment(member.user.joinedAt).format('LLLL')}\``,
                        inline: true
                    }, {
                        name: 'Nickname',
                        value: `${member.nickname ? member.nickname : 'No server nickname provided'}`,
                        inline: true
                    }]
                })
            ]
        })

        return interaction.reply({
            embeds: [
                new bot.MessageEmbed({
                    title: `About: ${member.user.tag}`,
                    description: 'Here is some information about the user you requested',
                    thumbnail: member.user.displayAvatarURL(),
                    color: bot.config.colors.base,
                    fields: [{
                        name: 'Created',
                        value: `\`${moment(member.user.createdAt).format('LLLL')}\``,
                        inline: true
                    }, {
                        name: 'Joined',
                        value: `\`${moment(member.joinedAt).format('LLLL')}\``,
                        inline: true
                    }, {
                        name: 'Nickname',
                        value: `${member.nickname ? member.nickname : 'No server nickname provided'}`,
                        inline: true
                    }, {
                        name: 'Acknowledgements',
                        value: `${await bot.utils.users.team_acks(member.user.id)}`,
                        inline: false
                    }]
                })
            ]
        })
    }
}