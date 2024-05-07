import type { CacheType, ChatInputCommandInteraction } from "discord.js"
import { EnfinityClient } from '../client/enfinity';
import { CommandTemplate } from './cmds.temp';

export default class SampleCommand extends CommandTemplate {

    constructor() {
        super({
            name: 'some_name', // Replace this with the command name
            description: 'some_description', // Replace this with the command description
            category: 'some_category', // Replace this with the command category
            cooldown: 0, // Replace this with the command cooldown
            permissions: {
                user: ['SendMessages'],
                bot: ['SendMessages']
            }
        })
    }

    public async exec(bot: EnfinityClient, interaction: ChatInputCommandInteraction<CacheType>): Promise<any> {
        return interaction.reply({
            embeds: [
                new bot.MessageEmbed({
                    title: 'Sample Command',
                    color: bot.config.colors.base,
                    description: 'Sample command description'
                })
            ]
        })
    }
}