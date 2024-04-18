"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const event_temp_1 = require("../../../temp/event.temp");
class ReadyEvent extends event_temp_1.EventTemplate {
    constructor() {
        super({ name: 'ready', once: true });
    }
    async exec(bot) {
        await bot.rest_api.registerCommands('global');
        bot.logger.success(`${bot.user?.tag} is now online and ready!`);
        bot.logger.info(`[PARTIAL_TOKEN]: ${bot.config.client.token.substring(0, 20)}.********`);
        bot.user?.setStatus('idle');
        bot.user?.setActivity({
            name: 'Streaming: pornhub.com',
            type: discord_js_1.ActivityType.Custom
        });
    }
}
exports.default = ReadyEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zb3VyY2UvY2xpZW50L2xpc3RlbmVycy9jbGllbnQvcmVhZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBMEM7QUFFMUMseURBQXlEO0FBRXpELE1BQXFCLFVBQVcsU0FBUSwwQkFBYTtJQUNqRDtRQUNJLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBbUI7UUFFakMsTUFBTSxHQUFHLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTlDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLDJCQUEyQixDQUFDLENBQUM7UUFDaEUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV6RixHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1QixHQUFHLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQztZQUNsQixJQUFJLEVBQUUsd0JBQXdCO1lBQzlCLElBQUksRUFBRSx5QkFBWSxDQUFDLE1BQU07U0FDNUIsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNKO0FBbkJELDZCQW1CQyJ9