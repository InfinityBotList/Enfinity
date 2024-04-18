import { OptionTypes } from '../../../types/cmd.types';
import type { CacheType, ChatInputCommandInteraction } from "discord.js"
import { CommandTemplate } from '../../../temp/cmds.temp';
import { EnfinityClient } from '../../enfinity';

export default class ErrorCommand extends CommandTemplate {

    constructor() {
        super({
            name: 'error',
            description: 'View or update any of our saved errors.',
            category: 'devs',
            cooldown: 5,
            permissions: {
                dev: true,
                user: [],
                bot: []
            },
            options: [{
                name: 'view',
                description: 'View an error by ID.',
                type: OptionTypes['SubCommand'],
                options: [{
                    name: 'id',
                    description: 'The ID of the error you want to view.',
                    type: OptionTypes['String'],
                    required: true
                }]
            }, {
                name: 'update',
                description: 'Update an error by ID.',
                type: OptionTypes['SubCommand'],
                options: [{
                    name: 'id',
                    description: 'The ID of the error you want to update.',
                    type: OptionTypes['String'],
                    required: true
                }, {
                    name: 'state',
                    description: 'The updated state of the error.',
                    type: OptionTypes['String'],
                    required: true,
                    choices: [
                        { name: 'open', value: 'OPEN' },
                        { name: 'investigating', value: 'INVESTIGATING' },
                        { name: 'info needed', value: 'INFO_NEEDED' },
                        { name: 'closed', value: 'CLOSED' }
                    ]
                }]
            }]
        })
    }

    public async exec(bot: EnfinityClient, interaction: ChatInputCommandInteraction<CacheType>): Promise<any> {

        switch (interaction.options.getSubcommand()) {

            case 'view': {
                try {
                    const id = interaction.options.getString('id', true);

                    const error = await bot.error.fetch(id);

                    if (!error) return interaction.reply({
                        ephemeral: true,
                        embeds: [
                            new bot.MessageEmbed({
                                title: 'Error: not found',
                                description: 'The error you are looking for does not exist.',
                                color: bot.config.colors.error
                            })
                        ]
                    })


                    return interaction.reply({
                        embeds: [
                            new bot.MessageEmbed({
                                title: 'View: error information',
                                description: `\`\`\`json\n${JSON.stringify(error.stack.stack, null, 2)}\`\`\``,
                                color: bot.config.colors.base,
                                fields: [
                                    { name: 'Name', value: error.name, inline: true },
                                    { name: 'State', value: error.state, inline: true },
                                    { name: 'Type', value: error.info, inline: true },
                                ]
                            })
                        ]
                    })
                } catch (err: any) {
                    bot.logger.error(`Failed to view error: ${err.message}`);
                    return interaction.reply({
                        ephemeral: true,
                        embeds: [
                            new bot.MessageEmbed({
                                title: 'Error: failed to view',
                                description: 'An error occurred while trying to view this error.',
                                color: bot.config.colors.error
                            })
                        ]
                    })
                }
            }
        }
    }
}