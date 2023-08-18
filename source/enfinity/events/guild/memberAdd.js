module.exports = {
    name: 'guildMemberAdd',

    async execute(member, enfinity) {
        try {
            if (member.guild.id === enfinity.config.guilds.staff) {
                /**
                 * @default staffRole Staff Center Web Mods
                 * @default BotRole Staff Center Server Bots
                 * @default sys Staff Center System Channel
                 */
                const mainGuild = await enfinity.guilds.cache.get(enfinity.config.guilds.main)
                const guildUser = await mainGuild.members.cache.get(member.user.id)
                const auditLogs = await member.guild.channels.cache.find(
                    c => c.id === enfinity.config.channels.staff_audits
                )
                const mainStaffRole = guildUser.roles.cache.find(r => r.id === enfinity.config.staff_roles.website_mods)
                const staffRole = await member.guild.roles.cache.get('870950609291972622')
                const botRole = await member.guild.roles.cache.get('870950609291972620')
                const sys = await member.guild.channels.cache.find(c => c.id === '1090417512862191676')

                if (guildUser && !mainStaffRole) {
                    const reason =
                        'User attempted to join a staff only server but is not a active member of our staff team'

                    await member.guild.bans
                        .create(member.user.id, { reason: reason })
                        .then(async banned => {
                            return auditLogs.send({
                                embeds: [
                                    new enfinity.Gateway.EmbedBuilder()
                                        .setTitle('ALERT: unauthorized entry prevented')
                                        .setColor(enfinity.colors.warning)
                                        .setThumbnail(banned.displayAvatarURL({ dynamic: true }))
                                        .setDescription(
                                            'Someone who is **not** an active member of our staff team attempted to join'
                                        )
                                        .addFields(
                                            {
                                                name: 'User',
                                                value: `${banned.globalName ? banned.globalName : banned.username}`,
                                                inline: false
                                            },
                                            {
                                                name: 'User ID',
                                                value: `${banned.id}`,
                                                inline: false
                                            },
                                            {
                                                name: 'Action Taken',
                                                value: 'PERMANENT_BAN',
                                                inline: false
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
                        .catch(async e => {
                            await enfinity.logger('[Client]: error banning user, more details below!', {
                                header: 'CLIENT_BAN_ERROR',
                                type: 'error'
                            })

                            return enfinity.logger(e.stack, {
                                header: 'CLIENT_BAN_ERROR',
                                type: 'error'
                            })
                        })
                } else if (!guildUser && !mainStaffRole) {
                    const reason =
                        'User attempted to join a staff only server but is not a active member of our staff team'

                    await member.guild.bans
                        .create(member.user.id, { reason: reason })
                        .then(async banned => {
                            return auditLogs.send({
                                embeds: [
                                    new enfinity.Gateway.EmbedBuilder()
                                        .setTitle('ALERT: unauthorized entry prevented')
                                        .setColor(enfinity.colors.warning)
                                        .setThumbnail(banned.displayAvatarURL({ dynamic: true }))
                                        .setDescription(
                                            'Someone who is **not** an active member of our staff team attempted to join'
                                        )
                                        .addFields(
                                            {
                                                name: 'User',
                                                value: `${banned.globalName ? banned.globalName : banned.username}`,
                                                inline: false
                                            },
                                            {
                                                name: 'User ID',
                                                value: `${banned.id}`,
                                                inline: false
                                            },
                                            {
                                                name: 'Action Taken',
                                                value: 'PERMANENT_BAN',
                                                inline: false
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
                        .catch(async e => {
                            await enfinity.logger('[Client]: error banning user, more details below!', {
                                header: 'CLIENT_BAN_ERROR',
                                type: 'error'
                            })

                            return enfinity.logger(e.stack, {
                                header: 'CLIENT_BAN_ERROR',
                                type: 'error'
                            })
                        })
                } else if (guildUser && mainStaffRole) {
                    await member.roles.add(staffRole)

                    const username = member.user.globalName ? member.user.globalName : member.user.username

                    await auditLogs.send({
                        embeds: [
                            new enfinity.Gateway.EmbedBuilder()
                                .setTitle('Guild Log: new member joined')
                                .setColor(enfinity.colors.base)
                                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                                .setDescription(`${username} has slid into the server, can they be trusted?`)
                                .addFields(
                                    {
                                        name: 'User',
                                        value: `${username}`,
                                        inline: true
                                    },
                                    {
                                        name: 'User ID',
                                        value: `${member.user.id}`,
                                        inline: true
                                    },
                                    {
                                        name: 'Auto Roles',
                                        value: `${staffRole}`
                                    }
                                )
                                .setTimestamp()
                                .setFooter({
                                    text: enfinity.footer,
                                    iconURL: enfinity.logo
                                })
                        ]
                    })

                    return sys.send({
                        embeds: [
                            new enfinity.Gateway.EmbedBuilder()
                                .setTitle('A new member has arrived!')
                                .setColor(enfinity.colors.base)
                                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                                .setDescription(`${username} has slid into the server, can they be trusted?`)
                                .addFields(
                                    {
                                        name: 'User',
                                        value: `${username}`,
                                        inline: true
                                    },
                                    {
                                        name: 'User ID',
                                        value: `${member.user.id}`,
                                        inline: true
                                    },
                                    {
                                        name: 'Auto Roles',
                                        value: `${staffRole}`
                                    }
                                )
                                .setTimestamp()
                                .setFooter({
                                    text: enfinity.footer,
                                    iconURL: enfinity.logo
                                })
                        ]
                    })
                } else if (member.user.bot) {
                    await member.roles.add(botRole)

                    await auditLogs.send({})

                    return sys.send({})
                }
            }
        } catch (e) {
            return enfinity.logger(`Error: ${e.stack}`, {
                header: 'GUILD_MEMBER_ADD_EVENT',
                type: 'error'
            })
        }
    }
}
