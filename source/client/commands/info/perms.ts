import type { CacheType, ChatInputCommandInteraction } from "discord.js"
import { CommandTemplate } from '../../../temp/cmds.temp';
import { OptionTypes } from "../../../types/cmd.types";
import { EnfinityClient } from '../../enfinity';
import moment from 'moment';

export default class AboutCommand extends CommandTemplate {

    constructor() {
        super({
            name: 'perms',
            description: 'View the infinity permissions of a user!',
            category: 'info',
            cooldown: 0,
            permissions: {
                user: ['SendMessages'],
                bot: ['SendMessages']
            },
            options: [{
                name: 'user',
                description: 'The user to check perms for (Mention or ID)',
                required: true,
                type: OptionTypes.User
            }]
        })
    }

    public async exec(bot: EnfinityClient, interaction: ChatInputCommandInteraction<CacheType>): Promise<any> {

        const member = interaction.options.getMember('user') as any;
        const perms = await bot.perms.user.list(member.user.id);

        if (member.user.bot) return interaction.reply({ content: `Bots do not have permissions!`, ephemeral: true });

        return interaction.reply({
            embeds: [
                new bot.MessageEmbed({
                    title: `${member.user.globalName}\`s permissions`,
                    description: `**NOTE:** this list can contain duplicate values if the user has multiple positions that provide the same perm!`,
                    thumbnail: member.user.displayAvatarURL(),
                    color: bot.config.colors.base,
                    fields: [{
                        name: 'Permissions',
                        value: perms.data,
                        inline: false
                    }]
                })
            ]
        })
    }
}