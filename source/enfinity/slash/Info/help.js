const { InteractionTypes } = require('@configs/perms.config.js')

module.exports = {
    name: 'help',
    category: 'Info',
    description: 'View my help message or get command info',
    userPerms: [''],
    basePerms: [''],
    options: [
        {
            name: 'command',
            description: 'The name of any command you want info for!',
            type: InteractionTypes.STRING,
            required: false
        }
    ],

    run: async (enfinity, interaction) => {
        const cmd = await interaction.options.getString('command')

        if (cmd && !enfinity.slash.get(cmd)) {
            return interaction.reply({
                embeds: [
                    new enfinity.Gateway.EmbedBuilder()
                        .setTitle('Error: invalid command')
                        .setColor(enfinity.colors.error)
                        .setThumbnail(enfinity.logo)
                        .setDescription(`${cmd} is not a valid command name`)
                        .setTimestamp()
                        .setFooter({
                            text: enfinity.footer,
                            iconURL: enfinity.logo
                        })
                ]
            })
        } else if (cmd && enfinity.slash.get(cmd)) {
            const cmdFetch = await enfinity.slash.get(cmd)
            const cmdName = cmdFetch.name.charAt(0).toUpperCase() + cmdFetch.name.slice(1)

            return interaction.reply({
                embeds: [
                    new enfinity.Gateway.EmbedBuilder()
                        .setTitle('Command Information')
                        .setColor(enfinity.colors.base)
                        .setThumbnail(enfinity.logo)
                        .setDescription(`Here is some info for my ${cmdName} command`)
                        .addFields(
                            {
                                name: 'Description',
                                value: `${cmdFetch.description ? cmdFetch.description : 'No description provided'}`,
                                inline: true
                            },
                            {
                                name: 'Category',
                                value: `${cmdFetch.category ? cmdFetch.category : 'No category provided'}`,
                                inline: true
                            },
                            {
                                name: 'Special Permissions',
                                value: ''
                            }
                        )
                ]
            })
        }
    }
}
