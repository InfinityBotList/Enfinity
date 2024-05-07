import type { CacheType, ChatInputCommandInteraction } from "discord.js"
import { OptionTypes } from "../../../types/cmd.types";
import { CommandTemplate } from '../../../temp/cmds.temp';
import { EnfinityClient } from '../../enfinity';
import { cases } from "@prisma/client";

export default class CaseCommand extends CommandTemplate {
    constructor() {
        super({
            name: 'case',
            description: 'Create, view or update a staff case',
            category: 'hr',
            cooldown: 0,
            permissions: {
                gate: ['human_resources', 'lead_developer', 'developer'],
                user: ['SendMessages', 'EmbedLinks', 'UseApplicationCommands'],
                bot: ['SendMessages', 'EmbedLinks', 'UseApplicationCommands']
            },
            options: [{
                name: 'create',
                description: 'Create a new staff case',
                type: OptionTypes.SubCommand,
                options: [{
                    name: 'user',
                    description: 'The staff member to create a case for',
                    type: OptionTypes.User,
                    required: true
                }, {
                    name: 'reason',
                    description: 'The reason for the case',
                    type: OptionTypes.String,
                    required: true
                }, {
                    name: 'duration',
                    description: 'The duration of the case',
                    type: OptionTypes.String,
                    required: true,
                    choices: [{
                        name: '1 Day',
                        value: '86400'
                    }, {
                        name: '3 Days',
                        value: '259200'
                    }, {
                        name: '7 Days',
                        value: '604800'
                    }, {
                        name: '14 Days',
                        value: '1209600'
                    }, {
                        name: '30 Days',
                        value: '2592000'
                    }]
                }, {
                    name: 'level',
                    description: 'The level/severity of the case',
                    type: OptionTypes.String,
                    required: true,
                    choices: [{
                        name: 'minor',
                        value: 'MINOR'
                    }, {
                        name: 'moderate',
                        value: 'MODERATE'
                    }, {
                        name: 'severe',
                        value: 'SEVERE'
                    }, {
                        name: 'critical',
                        value: 'CRITICAL'
                    }]
                }]
            }]
        })
    }

    public async exec(bot: EnfinityClient, interaction: ChatInputCommandInteraction<CacheType>): Promise<any> {

        switch (interaction.options.getSubcommand()) {

            case 'create': {
                try {
                    const user = interaction.options.getUser('user');
                    const reason = interaction.options.getString('reason');
                    const duration = interaction.options.getString('duration');
                    const level = interaction.options.getString('level');

                    const guild = bot.guilds.cache.get(bot.config.guild.id);
                    const logs = guild?.channels.cache.find((c) => c.name === 'mod-logs');

                    const isStaff = await bot.perms.user.exists(user?.id as string);

                    if (!isStaff) return interaction.reply({
                        embeds: [
                            new bot.MessageEmbed({
                                title: 'Error: invalid user type',
                                color: bot.config.colors.error,
                                description: 'Woahh, slow down chief! This command can only be executed on members of our Staff Team!'
                            })
                        ]
                    })

                    if (!logs || !logs.isTextBased()) return interaction.reply({
                        embeds: [
                            new bot.MessageEmbed({
                                title: 'Error: mod-logs channel not found',
                                color: bot.config.colors.error,
                                description: 'I could not find the mod-logs channel, please create one and try again!'
                            })
                        ]
                    })

                    let caseLevel: cases['level'];

                    if (level == 'MINOR') caseLevel = 'MINOR';
                    else if (level == 'MODERATE') caseLevel = 'MODERATE';
                    else if (level == 'SEVERE') caseLevel = 'SEVERE';
                    else if (level == 'CRITICAL') caseLevel = 'CRITICAL';
                    else caseLevel = 'MINOR'

                    const durationInSec = duration ? parseInt(duration) : 0;

                    const create = await bot.db.case.create({
                        target: user?.id as string,
                        guild: interaction.guildId as string,
                        state: 'OPEN',
                        level: caseLevel,
                        reason: reason as string,
                        moderator: interaction.user.id,
                        duration: durationInSec
                    });

                    if (!create.state) return interaction.reply({
                        embeds: [
                            new bot.MessageEmbed({
                                title: 'Error: case creation failed',
                                color: bot.config.colors.error,
                                description: create.message
                            })
                        ]
                    })

                    await logs.send({
                        content: `<@!${user?.id}>`,
                        embeds: [
                            new bot.MessageEmbed({
                                title: 'Action: case created',
                                description: `A new case has been created for you, more details about the case can be found below!`,
                                color: bot.config.colors.info,
                                thumbnail: user?.displayAvatarURL(),
                                fields: [{
                                    name: 'ID',
                                    value: `\`${create.case.id.split('-')[0]}\``,
                                    inline: true
                                }, {
                                    name: 'State',
                                    value: `\`${create.case.state}\``,
                                    inline: true
                                }, {
                                    name: 'Level',
                                    value: `\`${create.case.level}\``,
                                    inline: true
                                }, {
                                    name: 'Guild',
                                    value: `\`${bot.guilds.cache.get(create.case.guild)?.name}\``,
                                    inline: true
                                }, {
                                    name: 'Moderator',
                                    value: `<@!${create.case.moderator}>`,
                                    inline: true
                                }, {
                                    name: 'Duration',
                                    value: `${create.case.duration / 86400} day(s)`,
                                    inline: true
                                }, {
                                    name: 'Reason',
                                    value: `\`${create.case.reason}\``,
                                    inline: false
                                }]
                            })
                        ]
                    })

                    return interaction.reply({
                        embeds: [
                            new bot.MessageEmbed({
                                title: 'Success: case created',
                                color: bot.config.colors.success,
                                description: `Case: ${create.case.id.split('-')[0]} has been created successfully!`
                            })
                        ]
                    })
                } catch (err: unknown) {

                    if (err instanceof Error) {
                        bot.logger.error('Error: ' + err.message);
                        bot.logger.debug('Stack: ' + err.stack);

                        return interaction.reply({
                            embeds: [
                                new bot.MessageEmbed({
                                    title: 'Error: case creation failed',
                                    color: bot.config.colors.error,
                                    description: `\`${err.message}\``
                                })
                            ]
                        })
                    }
                }
            }
        }
    }
}
