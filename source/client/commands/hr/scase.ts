import type { CacheType, ChatInputCommandInteraction } from "discord.js"
import { OptionTypes } from "../../../types/cmd.types";
import { CommandTemplate } from '../../../temp/cmds.temp';
import { EnfinityClient } from '../../enfinity';
import { cases } from "@prisma/client";

export default class InternalCommand extends CommandTemplate {

    constructor() {
        super({
            name: 'scase',
            description: 'Execute a staff case command',
            category: 'hr',
            cooldown: 0,
            permissions: {
                hr: false,
                dev: false,
                staff: false,
                user: ['SendMessages'],
                bot: ['SendMessages']
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
                    description: 'The reason for issuing the case',
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
                        name: '1',
                        value: 'MINOR'
                    }, {
                        name: '2',
                        value: 'MODERATE'
                    }, {
                        name: '3',
                        value: 'SEVERE'
                    }, {
                        name: '4',
                        value: 'CRITICAL'
                    }]
                }]
            }, {
                name: 'get',
                description: 'Get a staff case (by ID)',
                type: OptionTypes.SubCommand,
                options: [{
                    name: 'case_id',
                    description: 'The ID of the case to fetch',
                    type: OptionTypes.String,
                    required: true
                }, {
                    name: 'user',
                    description: 'The user to fetch cases for',
                    type: OptionTypes.User,
                    required: true
                }]
            }]
        })
    }

    public async exec(bot: EnfinityClient, interaction: ChatInputCommandInteraction<CacheType>): Promise<any> {

        switch (interaction.options.getSubcommand()) {

            case 'create': {

                const user = interaction.options.getUser('user');
                const reason = interaction.options.getString('reason');
                const duration = interaction.options.getString('duration');
                const level = interaction.options.getString('level');

                let caseLevel: cases['level'];

                if (level == 'MINOR') caseLevel = 'MINOR';
                else if (level == 'MODERATE') caseLevel = 'MODERATE';
                else if (level == 'SEVERE') caseLevel = 'SEVERE';
                else if (level == 'CRITICAL') caseLevel = 'CRITICAL';
                else caseLevel = 'MINOR';

                const durationInSec = duration ? parseInt(duration) : 0;

                bot.logger.info('Raw duration:' + duration);
                bot.logger.info('Parsed duration:' + durationInSec);

                const create = await bot.db.case.create({
                    userId: user?.id as string,
                    guild: interaction.guildId as string,
                    type: 'STAFF_CASE',
                    action: 'WARN',
                    reason: reason! as string,
                    moderator: interaction.user.id! as string,
                    level: caseLevel! as cases['level'],
                    duration: durationInSec
                })

                if (!create.state) return interaction.reply({
                    embeds: [
                        new bot.MessageEmbed({
                            title: 'Error: case creation failed',
                            description: create.message,
                            color: bot.config.colors.error
                        })
                    ]
                })

                const durationInDays = create.case.duration / 86400;

                return interaction.reply({
                    embeds: [
                        new bot.MessageEmbed({
                            title: 'Success: staff case created',
                            description: `You can find more information about this case below.`,
                            color: bot.config.colors.success,
                            fields: [{
                                name: 'ID',
                                value: `\`${create.case.id.split('-')[0]}\``,
                                inline: true
                            }, {
                                name: 'Type',
                                value: `\`${create.case.type}\``,
                                inline: true
                            }, {
                                name: 'Level',
                                value: `\`${create.case.level}\``,
                                inline: true
                            }, {
                                name: 'Duration',
                                value: `\`${durationInDays} days\``,
                                inline: true
                            }, {
                                name: 'User',
                                value: `<@!${create.case.userId}>`,
                                inline: true
                            }, {
                                name: 'Moderator',
                                value: `<@!${create.case.moderator}>`,
                                inline: true
                            }]
                        })
                    ]
                })
            }

            case 'get': {

                const caseId = interaction.options.getString('case_id');
                const user = interaction.options.getUser('user');

                const fetch = await bot.db.case.get(caseId as string, user?.id as string);

                if (!fetch.state) return interaction.reply({
                    embeds: [
                        new bot.MessageEmbed({
                            title: 'Error: case fetch failed',
                            description: fetch.message,
                            color: bot.config.colors.error
                        })
                    ]
                })

                return interaction.reply({
                    embeds: [
                        new bot.MessageEmbed({
                            title: `Case #${fetch.data?.id.split('-')[0]}`,
                            description: 'You can find more information about this case below.',
                            color: bot.config.colors.base,
                            fields: [{
                                name: 'Type',
                                value: `\`${fetch.data?.type}\``,
                                inline: true
                            }, {
                                name: 'Duration',
                                value: `\`${fetch.data?.duration}\``,
                                inline: true
                            }, {
                                name: 'Action',
                                value: `\`${fetch.data?.action}\``,
                                inline: true
                            }, {
                                name: 'Level',
                                value: `\`${fetch.data?.level}\``,
                                inline: true
                            }, {
                                name: 'User',
                                value: `<@!${fetch.data?.userId}>`,
                                inline: true
                            }, {
                                name: 'Moderator',
                                value: `<@!${fetch.data?.moderator}>`,
                                inline: true
                            }, {
                                name: 'Reason',
                                value: fetch.data?.reason,
                                inline: false
                            }]
                        })
                    ]
                })
            }
        }
    }
}