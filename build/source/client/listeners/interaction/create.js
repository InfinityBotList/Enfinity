"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const event_temp_1 = require("../../../temp/event.temp");
class ReadyEvent extends event_temp_1.EventTemplate {
    constructor() {
        super({ name: 'interactionCreate' });
    }
    async exec(bot, interaction, int) {
        if (!interaction.isCommand())
            return;
        const command = await bot.commands.get(interaction.commandName);
        if (!command)
            return;
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
            });
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
                });
            }
        }
        if (command.props.cooldown > 0) {
            if (!bot.cooldown.has(command.props.name)) {
                bot.cooldown.set(command.props.name, new discord_js_1.Collection());
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
                        });
                    }
                }
            }
            timestamp?.set(interaction.user.id, now);
            setTimeout(() => timestamp?.delete(interaction.user.id), cooldownTime);
        }
        const args = [];
        for (let option of interaction.options.data) {
            if (option.type === discord_js_1.ApplicationCommandOptionType.Subcommand) {
                if (option.name)
                    args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value)
                        args.push(x.value);
                });
            }
            else if (option.value)
                args.push(option.value);
        }
        try {
            command.exec(bot, interaction, args);
        }
        catch (err) {
            await bot.error.throw(err.message, {
                state: 'OPEN',
                type: 'BOT',
                info: 'Command execution failed',
                stack: {
                    message: err.message,
                    trace: new Error().stack,
                    stack: err.stack
                }
            });
            return interaction.reply({
                ephemeral: true,
                content: 'Whoops, something went wrong while executing this command! Please try again later!'
            });
        }
    }
}
exports.default = ReadyEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc291cmNlL2NsaWVudC9saXN0ZW5lcnMvaW50ZXJhY3Rpb24vY3JlYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQXFFO0FBR3JFLHlEQUF5RDtBQUV6RCxNQUFxQixVQUFXLFNBQVEsMEJBQWE7SUFDakQ7UUFDSSxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQW1CLEVBQUUsV0FBbUMsRUFBRSxHQUFvQjtRQUU1RixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRTtZQUFFLE9BQU87UUFFckMsTUFBTSxPQUFPLEdBQUcsTUFBTSxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFaEUsSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPO1FBRXJCLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3pHLE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQztnQkFDckIsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsTUFBTSxFQUFFO29CQUNKLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQzt3QkFDakIsS0FBSyxFQUFFLDRCQUE0Qjt3QkFDbkMsV0FBVyxFQUFFLDZEQUE2RCxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJO3dCQUN6SCxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSztxQkFDakMsQ0FBQztpQkFD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