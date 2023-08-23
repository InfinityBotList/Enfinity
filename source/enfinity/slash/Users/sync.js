module.exports = {
    name: 'sync',
    category: 'Users',
    description: 'Sync your information in our database',
    userPerms: ['none'],
    basePerms: ['none'],

    run: async enfinity => {
        const user = await enfinity.db.enfinityUser.select({
            userId: enfinity.interaction.user.id
        })

        if (!user) {
            await enfinity.interaction.reply({
                embeds: [
                    new enfinity.Gateway.EmbedBuilder()
                        .setTitle('Action: sync user')
                        .setColor(enfinity.colors.error)
                        .setThumbnail(enfinity.loading)
                        .setDescription('attempting to locate user information, please wait!')
                        .setTimestamp()
                        .setFooter({
                            text: enfinity.footer,
                            iconURL: enfinity.logo
                        })
                ]
            })

            await enfinity.db.enfinityUser
                .upsert({
                    userId: `${enfinity.interaction.user.id}`,
                    globalName: `${enfinity.interaction.user.globalName}`,
                    displayName: `${enfinity.interaction.user.displayName}`,
                    cmd_blacklist: false
                })
                .then(async () => {
                    await enfinity.interaction.editReply({
                        embeds: [
                            new enfinity.Gateway.EmbedBuilder()
                                .setTitle('Success: user created')
                                .setColor(enfinity.colors.error)
                                .setThumbnail(enfinity.loading)
                                .setDescription('information not found, creating user now....')
                                .setTimestamp()
                                .setFooter({
                                    text: enfinity.footer,
                                    iconURL: enfinity.logo
                                })
                        ]
                    })

                    setTimeout(async () => {
                        return enfinity.interaction.editReply({
                            embeds: [
                                new enfinity.Gateway.EmbedBuilder()
                                    .setTitle('Action: sync complete')
                                    .setColor(enfinity.colors.error)
                                    .setThumbnail(enfinity.interaction.user.displayAvatarURL({ dynamic: true }))
                                    .setDescription('alright, im all done here!')
                                    .setTimestamp()
                                    .setFooter({
                                        text: enfinity.footer,
                                        iconURL: enfinity.logo
                                    })
                            ]
                        })
                    }, 8000)
                })
                .catch(e => {
                    setTimeout(() => {
                        return enfinity.interaction.editReply({
                            embeds: [
                                new enfinity.Gateway.EmbedBuilder()
                                    .setTitle('Error: sync failed')
                                    .setColor(enfinity.colors.error)
                                    .setThumbnail(enfinity.logo)
                                    .setDescription('If this issue persists please let my dev team know')
                                    .addFields({
                                        name: 'Error',
                                        value: `${e.message}`
                                    })
                                    .setTimestamp()
                                    .setFooter({
                                        text: enfinity.footer,
                                        iconURL: enfinity.logo
                                    })
                            ]
                        })
                    }, 8000)
                })
        } else if (user) {
            await enfinity.interaction.editReply({
                embeds: [
                    new enfinity.Gateway.EmbedBuilder()
                        .setTitle('Action: sync user')
                        .setColor(enfinity.colors.error)
                        .setThumbnail(enfinity.loading)
                        .setDescription('locating user information, please wait...')
                        .setTimestamp()
                        .setFooter({
                            text: enfinity.footer,
                            iconURL: enfinity.logo
                        })
                ]
            })

            await enfinity.db.enfinityUser
                .upsert({
                    userId: enfinity.interaction.user.id,
                    globalName: enfinity.interaction.user.globalName,
                    displayName: enfinity.interaction.user.displayName,
                    cmd_blacklist: user.cmd_blacklist
                })
                .then(async () => {
                    await enfinity.interaction.editReply({
                        embeds: [
                            new enfinity.Gateway.EmbedBuilder()
                                .setTitle('Success: user found')
                                .setColor(enfinity.colors.error)
                                .setThumbnail(enfinity.loading)
                                .setDescription('user found, updating information now...')
                                .setTimestamp()
                                .setFooter({
                                    text: enfinity.footer,
                                    iconURL: enfinity.logo
                                })
                        ]
                    })

                    setTimeout(() => {
                        return enfinity.interaction.editReply({
                            embeds: [
                                new enfinity.Gateway.EmbedBuilder()
                                    .setTitle('Success: user created')
                                    .setColor(enfinity.colors.error)
                                    .setThumbnail(enfinity.interaction.user.displayAvatarURL({ dynamic: true }))
                                    .setDescription('your information has been saved successfully')
                                    .setTimestamp()
                                    .setFooter({
                                        text: enfinity.footer,
                                        iconURL: enfinity.logo
                                    })
                            ]
                        })
                    }, 8000)
                })
                .catch(e => {
                    setTimeout(() => {
                        return enfinity.interaction.editReply({
                            embeds: [
                                new enfinity.Gateway.EmbedBuilder()
                                    .setTitle('Error: sync failed')
                                    .setColor(enfinity.colors.error)
                                    .setThumbnail(enfinity.logo)
                                    .setDescription('If this issue persists please let my dev team know')
                                    .addFields({
                                        name: 'Error',
                                        value: `${e.message}`
                                    })
                                    .setTimestamp()
                                    .setFooter({
                                        text: enfinity.footer,
                                        iconURL: enfinity.logo
                                    })
                            ]
                        })
                    }, 8000)
                })
        }
    }
}
