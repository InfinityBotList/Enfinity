import { Collection, ApplicationCommandOptionType } from "discord.js"
import type { CacheType, Interaction, BaseInteraction } from "discord.js"
import type { EnfinityClient } from '../../enfinity';
import { EventTemplate } from '../../../temp/event.temp';

export default class ReadyEvent extends EventTemplate {
    constructor() {
        super({ name: 'interactionCreate' });
    }

    public async exec(bot: EnfinityClient, interaction: Interaction<CacheType>, int: BaseInteraction): Promise<any> {

        if (!interaction.isCommand()) return;

        const command = await bot.commands.get(interaction.commandName);

        if (!command) return;

        if (command.props.permissions?.user && !interaction.memberPermissions?.has(command.props.permissions.user)) {
            return interaction.reply({
                ephemeral: true,
                embeds: [
                    new bot.MessageEmbed({
                        title: 'Error: missing permissions',
                        description: `You need the following permissions to run this command: \`${command.props.permissions.user.join('`, `')}\``,
                        color: bot.config.colors.error
                    })
                ]
            })
        }

        if (bot && bot.user && command.props.permissions?.bot) {
            const botMember = interaction?.guild?.members.cache.get(bot.user.id);
            if (botMember && !botMember.permissions.has(command.props.permissions.bot)) {
                return interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new bot.MessageEmbed({
                            title: 'Error: missing permissions',
                            description: `I need the following permissions to run this command: \`${command.props.permissions.bot.join('`, `')}\``,
                            color: bot.config.colors.error
                        })
                    ]
                })
            }
        }

        if (command.props.cooldown > 0) {
            if (!bot.cooldown.has(command.props.name)) {
                bot.cooldown.set(command.props.name, new Collection());
            }

            const now = Date.now();

            const timestamp = bot.cooldown.get(command.props.name);
            const cooldownTime = command.props.cooldown * 1000;

            if (timestamp?.has(interaction.user.id)) {
                const cooldown = timestamp.get(interaction.user.id);

                if (cooldown) {
                    const expires = cooldown + cooldownTime;

                    if (now < expires) {
                        const remaining = (expires - now) / 1000;

                        return interaction.reply({
                            ephemeral: true,
                            content: 'Slow down chief! You need to wait another ' + remaining.toFixed(1) + ' seconds before you can use this command again!'
                        })
                    }
                }
            }

            timestamp?.set(interaction.user.id, now);

            setTimeout(() => timestamp?.delete(interaction.user.id), cooldownTime);
        }

        const args: any = [];

        for (let option of interaction.options.data) {
            if (option.type === ApplicationCommandOptionType.Subcommand) {
                if (option.name) args.push(option.name);

                option.options?.forEach((x: any) => {
                    if (x.value) args.push(x.value);
                })
            } else if (option.value) args.push(option.value);
        }

        try {
            command.exec(bot, interaction, args);
        } catch (err: any) {
            await bot.error.throw(err.message, {
                state: 'OPEN',
                type: 'BOT',
                info: 'Command execution failed',
                stack: {
                    message: err.message,
                    trace: new Error().stack,
                    stack: err.stack
                }
            })

            return interaction.reply({
                ephemeral: true,
                content: 'Whoops, something went wrong while executing this command! Please try again later!'
            })
        }
    }
}
