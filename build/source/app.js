"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const discord_js_1 = require("discord.js");
const enfinity_1 = require("./client/enfinity");
(0, dotenv_1.config)();
const client = new enfinity_1.EnfinityClient({
    intents: [
        discord_js_1.IntentsBitField.Flags.AutoModerationConfiguration,
        discord_js_1.IntentsBitField.Flags.AutoModerationExecution,
        discord_js_1.IntentsBitField.Flags.DirectMessages,
        discord_js_1.IntentsBitField.Flags.DirectMessageReactions,
        discord_js_1.IntentsBitField.Flags.DirectMessageTyping,
        discord_js_1.IntentsBitField.Flags.Guilds,
        discord_js_1.IntentsBitField.Flags.GuildIntegrations,
        discord_js_1.IntentsBitField.Flags.GuildMembers,
        discord_js_1.IntentsBitField.Flags.GuildMessages,
        discord_js_1.IntentsBitField.Flags.GuildMessageReactions,
        discord_js_1.IntentsBitField.Flags.GuildMessageTyping,
        discord_js_1.IntentsBitField.Flags.GuildModeration,
        discord_js_1.IntentsBitField.Flags.GuildPresences,
        discord_js_1.IntentsBitField.Flags.MessageContent,
    ],
    partials: [
        discord_js_1.Partials.User,
        discord_js_1.Partials.Message,
        discord_js_1.Partials.Channel,
        discord_js_1.Partials.GuildMember,
        discord_js_1.Partials.GuildScheduledEvent,
        discord_js_1.Partials.ThreadMember,
        discord_js_1.Partials.Reaction,
    ],
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true,
    }
});
client.connect(process.env.TOKEN);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc291cmNlL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUE2QztBQUM3QywyQ0FBdUQ7QUFDdkQsZ0RBQW1EO0FBRW5ELElBQUEsZUFBUyxHQUFFLENBQUM7QUFFWixNQUFNLE1BQU0sR0FBRyxJQUFJLHlCQUFjLENBQUM7SUFDOUIsT0FBTyxFQUFFO1FBQ0wsNEJBQWUsQ0FBQyxLQUFLLENBQUMsMkJBQTJCO1FBQ2pELDRCQUFlLENBQUMsS0FBSyxDQUFDLHVCQUF1QjtRQUM3Qyw0QkFBZSxDQUFDLEtBQUssQ0FBQyxjQUFjO1FBQ3BDLDRCQUFlLENBQUMsS0FBSyxDQUFDLHNCQUFzQjtRQUM1Qyw0QkFBZSxDQUFDLEtBQUssQ0FBQyxtQkFBbUI7UUFDekMsNEJBQWUsQ0FBQyxLQUFLLENBQUMsTUFBTTtRQUM1Qiw0QkFBZSxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7UUFDdkMsNEJBQWUsQ0FBQyxLQUFLLENBQUMsWUFBWTtRQUNsQyw0QkFBZSxDQUFDLEtBQUssQ0FBQyxhQUFhO1FBQ25DLDRCQUFlLENBQUMsS0FBSyxDQUFDLHFCQUFxQjtRQUMzQyw0QkFBZSxDQUFDLEtBQUssQ0FBQyxrQkFBa0I7UUFDeEMsNEJBQWUsQ0FBQyxLQUFLLENBQUMsZUFBZTtRQUNyQyw0QkFBZSxDQUFDLEtBQUssQ0FBQyxjQUFjO1FBQ3BDLDRCQUFlLENBQUMsS0FBSyxDQUFDLGNBQWM7S0FDdkM7SUFDRCxRQUFRLEVBQUU7UUFDTixxQkFBUSxDQUFDLElBQUk7UUFDYixxQkFBUSxDQUFDLE9BQU87UUFDaEIscUJBQVEsQ0FBQyxPQUFPO1FBQ2hCLHFCQUFRLENBQUMsV0FBVztRQUNwQixxQkFBUSxDQUFDLG1CQUFtQjtRQUM1QixxQkFBUSxDQUFDLFlBQVk7UUFDckIscUJBQVEsQ0FBQyxRQUFRO0tBQ3BCO0lBQ0QsZUFBZSxFQUFFO1FBQ2IsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztRQUN6QixXQUFXLEVBQUUsSUFBSTtLQUNwQjtDQUNKLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFNLENBQUMsQ0FBQyJ9