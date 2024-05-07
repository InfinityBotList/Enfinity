import type { CacheType, ChatInputCommandInteraction } from "discord.js"
import { OptionTypes } from "../../../types/cmd.types";
import { CommandTemplate } from '../../../temp/cmds.temp';
import { EnfinityClient } from '../../enfinity';

export default class AboutCommand extends CommandTemplate {

    constructor() {
        super({
            name: 'sync',
            description: 'Refresh/reload a slash command',
            category: 'devs',
            cooldown: 0,
            permissions: {
                gate: ['lead_developer', 'developer'],
                user: ['SendMessages', 'EmbedLinks', 'UseApplicationCommands'],
                bot: ['SendMessages', 'EmbedLinks', 'UseApplicationCommands']
            },
            options: [{
                name: 'command',
                description: 'The command you want to refresh',
                type: OptionTypes.String,
                required: true
            }]
        })
    }

    public async exec(bot: EnfinityClient, interaction: ChatInputCommandInteraction<CacheType>): Promise<any> {

        const cmd = interaction.options.getString('command', true);
        const exists = await bot.commands.get(cmd as string);

        if (!exists) return interaction.reply({
            embeds: [
                new bot.MessageEmbed({
                    title: 'Error: command not found',
                    color: bot.config.colors.error,
                    description: `Command: \`${cmd}\` does not exist in the registry.`
                })
            ]
        })

        await bot.rest_api.sync(cmd as string).catch((e: Error) => {

            bot.logger.error('Error: ' + e.message);
            bot.logger.debug('Stack: ' + e.stack);

            return interaction.reply({
                embeds: [
                    new bot.MessageEmbed({
                        title: 'Error: command sync failed',
                        color: bot.config.colors.error,
                        description: `\`${e.message}\``
                    })
                ]
            })
        });

        return interaction.reply({
            embeds: [
                new bot.MessageEmbed({
                    title: 'Success: command sync',
                    color: bot.config.colors.success,
                    description: `Command: \`${cmd}\` has been reloaded.`
                })
            ]
        })
    }
}