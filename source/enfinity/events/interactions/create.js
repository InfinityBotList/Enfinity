module.exports = {
    name: 'interactionCreate',

    async execute(interaction, enfinity) {
        if (!interaction.isCommand()) return

        enfinity.interaction = interaction

        const command = enfinity.slash.get(interaction.commandName)

        if (!command) return

        if (
            !command.userPerms.includes('') &&
            command.userPerms.includes('BOT_ADMIN') &&
            !enfinity.perms.Admins.includes(interaction.user.id)
        ) {
            return interaction.reply({
                ephemeral: true,
                embeds: [
                    new enfinity.Gateway.EmbedBuilder()
                        .setTitle('Error: invalid permissions')
                        .setColor(enfinity.colors.error)
                        .setThumbnail(enfinity.logo)
                        .setDescription('Hold up, you do not have the necessary permissions to execute this command!')
                        .addFields({
                            name: 'Required permissions',
                            value: `${command.userPerms}`,
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

        if (
            !command.userPerms.includes('') &&
            command.userPerms.includes('BOT_MANAGERS') &&
            !enfinity.perms.Managers.includes(interaction.user.id)
        ) {
            return interaction.reply({
                ephemeral: true,
                embeds: [
                    new enfinity.Gateway.EmbedBuilder()
                        .setTitle('Error: invalid permissions')
                        .setColor(enfinity.colors.error)
                        .setThumbnail(enfinity.logo)
                        .setDescription('Hold up, you do not have the necessary permissions to execute this command!')
                        .addFields({
                            name: 'Required permissions',
                            value: `${command.userPerms}`,
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

        if (
            command.basePerms &&
            !command.basePerms.includes('') &&
            !interaction.member.permissions.has(command.basePerms)
        ) {
            return interaction.reply({
                ephemeral: true,
                embeds: [
                    new enfinity.Gateway.EmbedBuilder()
                        .setTitle('Error: invalid permissions')
                        .setColor(enfinity.colors.error)
                        .setThumbnail(enfinity.logo)
                        .setDescription('Hold up, you do not have the necessary permissions to execute this command!')
                        .addFields({
                            name: 'Required permissions',
                            value: `${command.basePerms}`,
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

        const args = []

        for (const option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name)

                option.options?.forEach(x => {
                    if (x.value) args.push(option.value)
                })
            } else if (option.value) {
                args.push(option.value)
            }
        }

        try {
            command.run(enfinity, interaction, args)
        } catch (e) {
            await interaction.reply({
                ephemeral: true,
                embeds: [
                    new enfinity.Gateway.EmbedBuilder()
                        .setTitle('Error: command execution failed')
                        .setColor(enfinity.colors.error)
                        .setThumbnail(enfinity.logo)
                        .setDescription('Whoops, something went wrong here!')
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

            await enfinity.logger('[CmdError]: slash command failed. See below for details', {
                header: 'CLIENT_SLASH_CMD_FAILURE',
                type: 'warning'
            })

            return enfinity.logger(e.stack, {
                header: 'CLIENT_SLASH_CMD_FAILURE',
                type: 'error'
            })
        }
    }
}
