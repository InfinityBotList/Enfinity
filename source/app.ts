import { config as insertEnv } from 'dotenv';
import { Partials, IntentsBitField } from 'discord.js';
import { EnfinityClient } from './client/enfinity';

insertEnv();

const client = new EnfinityClient({
    intents: [
        IntentsBitField.Flags.AutoModerationConfiguration,
        IntentsBitField.Flags.AutoModerationExecution,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.DirectMessageReactions,
        IntentsBitField.Flags.DirectMessageTyping,
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildIntegrations,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildMessageTyping,
        IntentsBitField.Flags.GuildModeration,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.MessageContent,
    ],
    partials: [
        Partials.User,
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember,
        Partials.Reaction,
    ],
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true,
    }
});

client.connect(process.env.TOKEN!);