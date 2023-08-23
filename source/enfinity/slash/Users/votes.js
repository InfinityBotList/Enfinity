const { InfinityFetcher } = require('@infinitylist/sdk')
const { InteractionTypes } = require('@configs/perms.config.js')
const moment = require('moment')

module.exports = {
    name: 'vote-check',
    category: 'Users',
    description: 'Check if a user has voted for a bot recently',
    userPerms: ['none'],
    basePerms: ['none'],
    options: [
        {
            name: 'client',
            description: 'Bot/Client to check votes for',
            type: InteractionTypes.USER,
            required: true
        },
        {
            name: 'user',
            description: 'User to check the vote status of',
            type: InteractionTypes.USER,
            required: true
        }
    ],

    run: async (enfinity, interaction) => {
        const member = await interaction.options.getMember('user')
        const client = await interaction.options.getMember('client')

        if (!client.user.bot) {
            return interaction.reply({
                embeds: [
                    new enfinity.Gateway.EmbedBuilder()
                        .setTitle('Error: invalid client type')
                        .setColor(enfinity.colors.error)
                        .setThumbnail(enfinity.logo)
                        .setDescription('`client` param should be a valid discord bot/client!')
                        .setTimestamp()
                        .setFooter({
                            text: enfinity.footer,
                            iconURL: enfinity.logo
                        })
                ]
            })
        }

        if (member.user.bot) {
            return interaction.reply({
                embeds: [
                    new enfinity.Gateway.EmbedBuilder()
                        .setTitle('Error: invalid user type')
                        .setColor(enfinity.colors.error)
                        .setThumbnail(enfinity.logo)
                        .setDescription(
                            '`user` param should be a value discord user that you want to check if they have voted for this bot!'
                        )
                        .setTimestamp()
                        .setFooter({
                            text: enfinity.footer,
                            iconURL: enfinity.logo
                        })
                ]
            })
        }

        const ibl = new InfinityFetcher({ botID: client.user.id })
        const status = await ibl.getUserVotes(member.user.id)

        if (!status.has_voted) {
            const u_name = member.user.globalName ? member.user.globalName : member.user.username
            const b_name = client.user.globalName ? client.user.globalName : client.user.username

            return interaction.reply({
                embeds: [
                    new enfinity.Gateway.EmbedBuilder()
                        .setTitle(`${b_name} | Vote Information`)
                        .setURL(`https://infinitybots.gg/bot/${client.user.id}`)
                        .setAuthor({
                            name: `Vote check for: ${u_name}`,
                            iconURL: member.user.displayAvatarURL({ dynamic: true }),
                            url: `https://infinitybots.gg/user/${member.user.id}`
                        })
                        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                        .setDescription('No vote records found for the provided user!')
                        .addFields(
                            {
                                name: 'Bot',
                                value: `${b_name} (${client.user.id})`,
                                inline: false
                            },
                            {
                                name: 'User',
                                value: `${u_name} (${member.user.id})`,
                                inline: false
                            },
                            {
                                name: 'Has voted',
                                value: 'User has not voted recently',
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
        } else {
            const u_name = member.user.globalName ? member.user.globalName : member.user.username
            const b_name = client.user.globalName ? client.user.globalName : client.user.username

            let weekend_voting
            let premium_status
            let rate_limits

            if (status.vote_info.vote_time == 6) weekend_voting = 'Weekend voting is enabled'
            else if (status.vote_info.vote_time == 12) weekend_voting = 'Weekend voting is disabled'

            if (status.vote_info.vote_time == 4) premium_status = 'Has a active premium subscription'
            else if (status.vote_info.vote_time !== 4) premium_status = 'Does not have a active premium subscription'

            if (status.vote_info.vote_time == 4) rate_limits = '2 votes every 4 hours'
            if (status.vote_info.vote_time == 6) rate_limits = '2 votes every 6 hours'
            if (status.vote_info.vote_time == 12) rate_limits = '1 vote every 12 hours'

            return interaction.reply({
                embeds: [
                    new enfinity.Gateway.EmbedBuilder()
                        .setTitle(`${b_name} | Vote information`)
                        .setURL(`https://infinitybots.gg/bot/${client.user.id}`)
                        .setAuthor({
                            name: `Vote check for: ${u_name}`,
                            iconURL: member.user.displayAvatarURL({ dynamic: true }),
                            url: `https://infinitybots.gg/user/${client.user.id}`
                        })
                        .setColor(enfinity.colors.base)
                        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                        .setDescription(`Total votes applied: ${status.vote_info.per_user}`)
                        .addFields(
                            {
                                name: 'Has voted',
                                value: 'User has voted recently',
                                inline: true
                            },
                            {
                                name: 'Last vote',
                                value: `${moment(status.valid_votes.find(v => v >= v))}`,
                                inline: true
                            },
                            {
                                name: 'Next vote',
                                value: `Available in: ${status.wait.hours}h ${status.wait.minutes}m ${status.wait.seconds}s`,
                                inline: true
                            },
                            {
                                name: 'Premium status',
                                value: `${premium_status}`,
                                inline: true
                            },
                            {
                                name: 'Weekend voting',
                                value: `${weekend_voting}`,
                                inline: true
                            },
                            {
                                name: 'Active rate-limits',
                                value: `${rate_limits}`,
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
    }
}
