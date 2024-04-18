import type { CacheType, ChatInputCommandInteraction } from "discord.js"
import { CommandTemplate } from '../../../temp/cmds.temp';
import { EnfinityClient } from '../../enfinity';

export default class AboutCommand extends CommandTemplate {

    constructor() {
        super({
            name: 'about',
            description: 'Some information about the bot',
            category: 'info',
            cooldown: 0,
            permissions: {
                dev: false,
                user: ['SendMessages'],
                bot: ['SendMessages']
            }
        })
    }

    public async exec(bot: EnfinityClient, interaction: ChatInputCommandInteraction<CacheType>): Promise<any> {
        return interaction.reply({
            embeds: [
                new bot.MessageEmbed({
                    title: 'About Enfinity',
                    color: bot.config.colors.base,
                    description: 'Hey there, my name is Enfinity and i am the Official Client for Infinity Bot List Support, FAQs, Information and Moderation!',
                    fields: [{
                        name: 'Created By',
                        value: 'therealtoxicdev (<@!510065483693817867>)',
                        inline: true
                    }, {
                        name: 'Library',
                        value: 'Discord.js',
                        inline: true
                    }, {
                        name: 'GitHub',
                        value: '[InfinityBotList/Enfinity](https://github.com/InfinityBotList/Enfinity)',
                        inline: true
                    }]
                })
            ]
        })
    }
}