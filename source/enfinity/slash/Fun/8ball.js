const { InteractionTypes } = require('@configs/perms.config.js')

module.exports = {
    name: '8ball',
    category: 'Fun',
    description: 'Ask the magic 8ball a question',
    userPerms: [''],
    basePerms: [''],
    options: [
        {
            name: 'question',
            description: 'What you want to ask the 8ball',
            required: true,
            type: InteractionTypes.STRING
        }
    ],

    run: async enfinity => {
        const q = await enfinity.interaction.options.getString('question')

        await fetch('https://api.cordx.lol/v3/client/8ball')
            .then(res => res.json())
            .then(async ball => {
                await enfinity.interaction.reply({
                    embeds: [
                        new enfinity.Gateway.EmbedBuilder()
                            .setTitle('Loading: please wait')
                            .setColor(enfinity.colors.base)
                            .setThumbnail(enfinity.loading)
                            .setDescription('the 8 ball is thinking about your answer!')
                            .setTimestamp()
                            .setFooter({
                                text: enfinity.footer,
                                iconURL: enfinity.logo
                            })
                    ]
                })

                setTimeout(() => {
                    if (ball.error) {
                        return enfinity.interaction.editReply({
                            embeds: [
                                new enfinity.Gateway.EmbedBuilder()
                                    .setTitle('Error: unable to fetch')
                                    .setColor(enfinity.colors.error)
                                    .setThumbnail(enfinity.logo)
                                    .setDescription('Whoops, something went wrong here')
                                    .addFields(
                                        {
                                            name: 'Error',
                                            value: `${ball.message}`,
                                            inline: false
                                        },
                                        {
                                            name: 'Status',
                                            value: `${ball.status}`,
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
                    }

                    return enfinity.interaction.editReply({
                        embeds: [
                            new enfinity.Gateway.EmbedBuilder()
                                .setTitle('Magic 8ball')
                                .setColor(enfinity.colors.base)
                                .setThumbnail(enfinity.logo)
                                .setDescription('Here are your results')
                                .addFields(
                                    {
                                        name: 'You asked',
                                        value: `${q}`,
                                        inline: false
                                    },
                                    {
                                        name: '8Ball says',
                                        value: `${ball.response}`,
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
                }, 5000)
            })
            .catch(async e => {
                await enfinity.logger(`Error: ${e.stack}`, {
                    header: '8BALL_API_ERROR',
                    type: 'error'
                })

                return enfinity.interaction.editReply({
                    ephemeral: true,
                    embeds: [
                        new enfinity.Gateway.EmbedBuilder()
                            .setTitle('Error: unable to fetch response')
                            .setColor(enfinity.colors.error)
                            .setThumbnail(enfinity.logo)
                            .setDescription('Whoops, looks like something went wrong here')
                            .addFields({
                                name: 'Error',
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
            })
    }
}
