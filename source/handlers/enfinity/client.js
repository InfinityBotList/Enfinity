require('module-alias/register')
require('dotenv').config()

const Discord = require('discord.js')
const { Client, Collection, GatewayIntentBits } = require('discord.js')

const database = require('@database/methods/index')
const { log } = require('@plugins/logger/client')
const events = require('@handlers/events/index')
const config = require('@configs/main.config.js')
const perms = require('@configs/perms.config.js')
const emojis = require('@configs/emoji.config.js')
const rpc = require('@handlers/utils/presence')

const enfinity = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping
    ],
    partials: ['CHANNEL', 'REACTION', 'GUILD_MEMBER', 'MESSAGE', 'USER'],
    allowedMentions: {
        repliedUser: true,
        parse: ['roles', 'users', 'everyone']
    }
})

module.exports = enfinity

enfinity.rpc = rpc
enfinity.db = database
enfinity.Gateway = Discord
enfinity.events = events
enfinity.logger = log
enfinity.config = config
enfinity.perms = perms
enfinity.emojis = emojis
enfinity.colors = config.colors
enfinity.InteractionTypes = perms.InteractionTypes
enfinity.logo = 'https://cdn.discordapp.com/attachments/653733403841134600/1086513475888611410/system.png'
enfinity.loading = 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif'
enfinity.footer = '© Copyright 2020 - Infinity Development'

enfinity.slash = new Collection()
enfinity.commands = new Collection()
enfinity.aliases = new Collection()
enfinity.category = new Collection()
enfinity.limits = new Map()

events.loadEvents(enfinity)
// events.loadBase(enfinity);
events.loadSlash(enfinity)

process.on('uncaughtException', err => {
    log(err.stack, {
        header: 'UNCAUGHT_EXCEPTION',
        type: 'error'
    })
})

process.on('unhandledRejection', reason => {
    log(reason.stack, {
        header: 'UNHANDLED_REJECTION',
        type: 'error'
    })
})

enfinity.login(config.client.token)
