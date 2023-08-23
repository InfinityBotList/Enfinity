const { InteractionTypes } = require('@configs/perms.config.js')

module.exports = {
    name: 'ban',
    category: 'Mods',
    description: 'Ban a member of the server',
    userPerms: [''],
    basePerms: ['BAN_MEMBERS', 'MODERATE_MEMBERS'],
    options: [
        {
            name: 'user',
            description: 'The user you want to ban',
            required: true,
            type: InteractionTypes.USER
        },
        {
            name: 'reason',
            description: 'The reason for the ban',
            required: true,
            type: InteractionTypes.STRING
        },
        {
            name: 'channel',
            description: 'Where should i send the logs',
            required: true,
            type: InteractionTypes.CHANNEL
        }
    ],

    run: async enfinity => {
        const member = await enfinity.interaction.options.getMember('user')
        const reason = await enfinity.interaction.options.getString('reason')
        const logs = await enfinity.interaction.options.getChannel('channel')
        const log = await enfinity.interaction.guild.channels.find(c => c.id === logs.id)

        const modname = enfinity.interaction.user.globalName
            ? enfinity.interaction.user.globalName
            : enfinity.interaction.user.username

        if (!member.manageable) {
            return enfinity.interaction.reply({
                ephemeral: true,
                embeds: [
                    new enfinity.Gateway.EmbedBuilder()
                        .setTitle('Error: invalid hierarchy')
                        .setColor(enfinity.colors.base)
                        .setThumbnail(enfinity.logo)
                        .setDescription(
                            'Whoops, this user is higher in the role hierarchy then i am or they are the guild owner'
                        )
                        .setTimestamp()
                        .setFooter({
                            text: enfinity.footer,
                            iconURL: enfinity.logo
                        })
                ]
            })
        }

        if (!member.moderatable) {
            return enfinity.interaction.reply({
                ephemeral: true,
                embeds: [
                    new enfinity.Gateway.EmbedBuilder()
                        .setTitle('Error: invalid hierarchy')
                        .setColor(enfinity.colors.base)
                        .setThumbnail(enfinity.logo)
                        .setDescription('Whoops, user is unable to be banned due to permissions')
                        .setTimestamp()
                        .setFooter({
                            text: enfinity.footer,
                            iconURL: enfinity.logo
                        })
                ]
            })
        }

        if (member == enfinity.interaction.member) return

        await enfinity.interaction.guild.bans.create(member.user.id, { reason: reason }).then(async banned => {
            await log.send({
                embeds: [
                    new enfinity.Gateway.EmbedBuilder()
                        .setTitle('Action: ban user')
                        .setColor(enfinity.colors.base)
                        .setThumbnail(enfinity.logo)
                        .setDescription('Whoops, someone messed up and got the bean')
                        .addFields(
                            {
                                name: 'User',
                                value: `${banned.globalName ? banned.globalName : banned.username}`,
                                inline: true
                            },
                            {
                                name: 'User ID',
                                value: `${banned.id}`,
                                inline: true
                            },
                            {
                                name: 'Moderator',
                                value: `${modname}`,
                                inline: true
                            },
                            {
                                name: 'Reason',
                                value: `${reason}`,
                                inline: false
                            }
                        )
                        .setTimestamp()
                        .setFooter({
                            text: enfinity.footer,
                            iconURL: enfinity.logo
                        })
                ]
            })
        })
    }
}
