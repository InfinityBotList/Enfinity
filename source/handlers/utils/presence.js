const { ActivityType } = require('discord.js')

module.exports.setClientPresence = async client => {
    const presences = [
        {
            name: 'Help: <<help',
            type: ActivityType.Playing
        },
        {
            name: 'with the Support Panel',
            type: ActivityType.Playing
        }
    ]

    client.user.setStatus('idle')

    setInterval(function () {
        const presence = presences[Math.floor(Math.random() * presences.length)]

        client.user.setActivity(presence.name, {
            type: presence.type,
            url: presence.url ? presence.url : ''
        })
    }, 10000)
}
