const { ActivityType } = require('discord.js')

module.exports.setClientPresence = async client => {
    const presences = [
        {
            name: process.env.PGHOST === 'localhost' ? 'Help: <<<help' : 'Help: <<help',
            type: ActivityType.Custom
        },
        {
            name: 'Playing with our support panel',
            type: ActivityType.Custom
        },
        {
            name: 'Moderating the infinity servers',
            type: ActivityType.Custom
        }
    ]

    await client.user.setStatus('idle')

    setInterval(async function () {
        const presence = presences[Math.floor(Math.random() * presences.length)]

        await client.user.setActivity({
            name: presence.name,
            type: presence.type
        })
    }, 10000)
}
