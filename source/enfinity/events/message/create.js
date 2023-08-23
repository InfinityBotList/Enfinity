module.exports = {
    name: 'messageCreate',

    async execute(message, enfinity) {
        if (message.author.bot) return
        if (!message.guild) return

        const prefix = enfinity.config.client.commands.prefix

        const mention = new RegExp(`^<@!?${enfinity.user.id}>( |)$`)

        if (message.content.match(mention)) {
            return message.reply({
                embeds: [
                    new enfinity.Gateway.EmbedBuilder()
                        .setTitle('Getting started')
                        .setColor(enfinity.colors.base)
                        .setThumbnail(enfinity.logo)
                        .setDescription('Hey there, feeling a little lost?')
                        .addFields(
                            {
                                name: 'My prefix',
                                value: `${prefix}`,
                                inline: true
                            },
                            {
                                name: 'Help Command',
                                value: `${prefix}help`,
                                inline: true
                            },
                            {
                                name: 'Notice',
                                value: 'Enfinity uses both prefixed and slash commands',
                                inline: true
                            }
                        )
                        .setTimestamp()
                        .setFooter({
                            text: enfinity.footer,
                            iconURL: enfinity.logo
                        })
                ]
            })
        }

        const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

        const prefixRegex = new RegExp(`^(${escapeRegex(prefix)})\\s*`)

        if (!prefixRegex.test(message.content)) return

        const [matchedPrefix] = message.content.match(prefixRegex)

        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/)
        const cmdName = args.shift().toLowerCase()

        const command =
            enfinity.commands.get(cmdName) ||
            enfinity.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName))

        if (!command) return

        if (command.args && !args.length) {
            if (command.usage) {
                return message.reply({
                    embeds: [
                        new enfinity.Gateway.EmbedBuilder()
                            .setTitle('Error: command execution failed')
                            .setColor(enfinity.colors.base)
                            .setThumbnail(enfinity.logo)
                            .setDescription('You did not provide any valid command arguments')
                            .addFields({
                                name: 'Command Usage',
                                value: `\`${prefix}/${command.name} ${command.usage}\``,
                                inline: false
                            })
                            .setTimestamp()
                            .setFooter({
                                text: enfinity.footer,
                                iconURL: enfinity.logo
                            })
                    ]
                })
            } else {
                return
            }
        }

        if (
            command.permissions &&
            !command.permissions.includes('') &&
            command.permissions.includes(enfinity.perms.Layout.Admin) &&
            !enfinity.perms.Admins.includes(message.author.id)
        ) {
            return message.reply({
                embeds: [
                    new enfinity.Gateway.EmbedBuilder()
                        .setTitle('Error: invalid permissions')
                        .setColor(enfinity.colors.error)
                        .setThumbnail(enfinity.logo)
                        .setDescription('Hold up chief, only our owners can execute this command')
                        .setTimestamp()
                        .setFooter({
                            text: enfinity.footer,
                            iconURL: enfinity.logo
                        })
                ]
            })
        }

        if (
            command.permissions &&
            !command.permissions.includes('') &&
            !message.member.permissions.has(command.permissions)
        ) {
            return message.reply({
                embeds: [
                    new enfinity.Gateway.EmbedBuilder()
                        .setTitle('Error: invalid permissions')
                        .setColor(enfinity.colors.error)
                        .setThumbnail(enfinity.logo)
                        .setDescription('You do not have the necessary permissions to execute this command')
                        .addFields({
                            name: 'Required perms',
                            value: `${command.permissions}`,
                            inline: false
                        })
                        .setTimestamp()
                        .setFooter({
                            text: enfinity.footer,
                            iconURL: enfinity.logo
                        })
                ]
            })
        }

        if (command.disabled) {
            return message.reply({
                embeds: [
                    new enfinity.Gateway.EmbedBuilder()
                        .setTitle('Error: command unavailable')
                        .setColor(enfinity.colors.error)
                        .setThumbnail(enfinity.logo)
                        .setDescription('Hold up chief, our dev team has disabled this command for the time being!')
                        .setTimestamp()
                        .setFooter({
                            text: enfinity.footer,
                            iconURL: enfinity.logo
                        })
                ]
            })
        }

        try {
            command.run(message, args, enfinity, prefix)
        } catch (e) {
            await enfinity.logger(`[Client]: message failed | ${e.stack}`, {
                header: 'CLIENT_MESSAGE_ERROR',
                type: 'error'
            })

            return message.reply({
                embeds: [
                    new enfinity.Gateway.EmbedBuilder()
                        .setTitle('Error: command failed')
                        .setColor(enfinity.colors.error)
                        .setThumbnail(enfinity.logo)
                        .setDescription('Whoops, something went wrong here and i was unable to execute that command')
                        .addFields({
                            name: 'Error Message',
                            value: `${e.message}`,
                            inline: false
                        })
                        .setTimestamp()
                        .setFooter({
                            text: enfinity.footer,
                            iconURL: enfinity.logo
                        })
                ]
            })
        }
    }
}
