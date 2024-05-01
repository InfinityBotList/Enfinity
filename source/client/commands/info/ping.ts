import type { CacheType, ChatInputCommandInteraction } from "discord.js"
import { CommandTemplate } from '../../../temp/cmds.temp';
import { EnfinityClient } from '../../enfinity';

export default class PingCommand extends CommandTemplate {

    constructor() {
        super({
            name: 'ping',
            description: 'View the bots latency and response time',
            category: 'info',
            cooldown: 0,
            permissions: {
                hr: false,
                dev: false,
                staff: false,
                user: ['SendMessages'],
                bot: ['SendMessages']
            }
        })
    }

    public async exec(bot: EnfinityClient, interaction: ChatInputCommandInteraction<CacheType>): Promise<any> {
        try {
            const msg = await interaction.reply('Gathering the ping information...');
            const res = msg.createdTimestamp - interaction.createdTimestamp;

            const embed = new bot.MessageEmbed({
                title: '🏓 Pong!',
                description: `Be honest with me doc, is it bad?`,
                color: bot.config.colors.base,
                fields: [
                    {
                        name: 'Websocket Ping',
                        value: `\`${Math.round(bot.ws.ping)}ms\``,
                        inline: true
                    },
                    {
                        name: 'Response Time',
                        value: `\`${res}ms\``,
                        inline: true
                    },
                    {
                        name: 'API Latency',
                        value: `\`${Date.now() - interaction.createdTimestamp}ms\``,
                        inline: true
                    }
                ]
            });

            await msg.edit({ embeds: [embed] })

        } catch (err: any) {
            return interaction.reply({
                embeds: [
                    new bot.MessageEmbed({
                        title: 'Error: command execution failed',
                        color: bot.config.colors.error,
                        description: `\`${err.message}\``,
                        fields: [
                            {
                                name: 'Error Trace',
                                value: `\`\`\`js\n${err.stack}\`\`\``,
                                inline: false
                            }
                        ]
                    })
                ]
            })
        }
    }
}