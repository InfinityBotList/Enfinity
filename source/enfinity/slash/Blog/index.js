const { InteractionTypes } = require('@configs/perms.config.js')
const { SpiderClient } = require('@infinitylist/spider')
const emojis = require('@configs/emoji.config.js')
const moment = require('moment')

module.exports = {
    name: 'blog',
    category: 'Blog',
    description: 'Commands related to our blog',
    userPerms: [''],
    basePerms: [''],
    options: [
        {
            name: 'list',
            description: 'List all blog posts',
            type: InteractionTypes.SUB_COMMAND
        },
        {
            name: 'fetch',
            description: 'Fetch a blog post by slug',
            type: InteractionTypes.SUB_COMMAND,
            options: [
                {
                    name: 'slug',
                    description: 'The slug of the blog post (ex: youtube)',
                    required: true,
                    type: InteractionTypes.STRING
                }
            ]
        }
    ],

    run: async enfinity => {
        const slug = await enfinity.interaction.options.getString('slug')
        const http = 'https://infinitybots.gg/blog/'

        switch (enfinity.interaction.options.getSubcommand()) {
            case 'list':
                const spider_c_1 = await new SpiderClient(process.env.IBL_USER_TOKEN)
                const post_f = await spider_c_1._getBlogList()
                const posts = await post_f.posts.splice(Math.floor(Math.random() * post_f.posts.length), 3)

                const embed = new enfinity.Gateway.EmbedBuilder()
                    .setTitle('Blog: list all posts')
                    .setColor(enfinity.colors.base)
                    .setThumbnail(enfinity.logo)
                    .setDescription('Here is some of our blog posts')
                    .setTimestamp()
                    .setFooter({
                        text: enfinity.footer,
                        iconURL: enfinity.logo
                    })

                await posts.map(async x => {
                    const tags = await x.tags.splice(Math.floor(Math.random() * x.tags.length), 2)

                    embed.addFields({
                        name: `${x.title}`,
                        value: `
                        - ${emojis.slug}: [${x.slug}](${http + x.slug})\n
                        - ${emojis.desc}: ${x.description}\n
                        - ${emojis.author}: ${x.author.display_name}\n
                        - ${emojis.date}: ${moment(x.created_at)}\n
                        - ${emojis.draft}: ${x.draft}\n
                        - ${emojis.tags}: \`${tags}\``,
                        inline: true
                    })
                })

                return enfinity.interaction.reply({
                    embeds: [embed]
                })

            case 'fetch':
                const spider_c_2 = await new SpiderClient(process.env.IBL_USER_TOKEN)
                const post = await spider_c_2._getBlogPost({ slug: slug })
                let status

                if (post.author.status === 'online') {
                    status = `${post.author.display_name} is ${emojis.status.online} ONLINE`
                } else if (post.author.status === 'offline') {
                    status = `${post.author.display_name} is ${emojis.status.offline} OFFLINE`
                } else if (post.author.status === 'idle') {
                    status = `${post.author.display_name} is ${emojis.status.idle} IDLE`
                } else if (post.author.status === 'dnd') {
                    status = `${post.author.display_name} is ${emojis.status.dnd} DND`
                } else {
                    status = `${post.author.display_name} is ${emojis.status.offline} UNKNOWN`
                }

                return enfinity.interaction.reply({
                    embeds: [
                        new enfinity.Gateway.EmbedBuilder()
                            .setTitle(`Post: ${post.title}`)
                            .setAuthor({
                                name: `Author: ${post.author.display_name}`,
                                iconURL: post.author.avatar,
                                url: `https://infinitybots.gg/user/${post.author.id}`
                            })
                            .setColor(enfinity.colors.base)
                            .setThumbnail(enfinity.logo)
                            .setURL(http + slug)
                            .setDescription(
                                post.content.length >= 2000 ? 'content is to long to be shown here' : post.content
                            )
                            .addFields(
                                {
                                    name: 'Author',
                                    value: `\`${post.author.username}\``,
                                    inline: true
                                },
                                {
                                    name: 'Author ID',
                                    value: `\`${post.author.id}\``,
                                    inline: true
                                },
                                {
                                    name: 'Author Status',
                                    value: `${status}`,
                                    inline: true
                                },
                                {
                                    name: `${emojis.desc}: Description`,
                                    value: `\`${post.description}\``,
                                    inline: true
                                },
                                {
                                    name: `${emojis.date}: Created`,
                                    value: `\`${post.created_at}\``,
                                    inline: true
                                },
                                {
                                    name: `${emojis.tags}: Tags`,
                                    value: `\`${post.tags}\``,
                                    inline: true
                                }
                            )
                    ]
                })
        }
    }
}
