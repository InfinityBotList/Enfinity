"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordAPI = void 0;
const discord_js_1 = require("discord.js");
const logger_1 = require("../utils/logger");
class DiscordAPI {
    client;
    rest_api;
    logger;
    constructor(client) {
        this.client = client;
        this.rest_api = new discord_js_1.REST({ version: this.client.config.rest });
        this.rest_api.setToken(process.env.TOKEN);
        this.logger = new logger_1.Logger('[DISCORD API]');
    }
    /**
     * Get a Command ID (Guild or Global)
     * @param {string} name - The name of the command
     * @param {'guild' | 'global'} type - The type of command
     * @returns {Promise<string | null>}
     */
    async getCommandId(name, type) {
        let commands;
        try {
            this.logger.info(`Fetching command ID for ${name} - ${type}`);
            if (!this.client.user?.id)
                return this.logger.error('Client was not resolved while registering commands');
            if (type === 'guild') {
                commands = await this.rest_api.get(discord_js_1.Routes.applicationGuildCommands(this.client.user.id, this.client.config.guild.id));
            }
            else {
                commands = await this.rest_api.get(discord_js_1.Routes.applicationCommands(this.client.user.id));
            }
            const command = commands.find((cmd) => cmd.name === name);
            if (!command)
                throw new Error(`Command: ${name} was not found in ${type} commands`);
            return command.id;
        }
        catch (err) {
            this.logger.error(`Failed to fetch command ID for ${name} - ${type}`);
            this.logger.error(err.stack);
            return null;
        }
    }
    /**
     * Register Commands (Guild or Global)
     * @param {'guild' | 'global'} type - The type of command
     * @returns {Promise<void>}
     */
    async registerCommands(type) {
        try {
            this.logger.info(`Registering ${type} commands.`);
            if (!this.client.user?.id)
                return this.logger.error('Client was not resolved while registering commands');
            if (type === 'guild') {
                await this.rest_api.put(discord_js_1.Routes.applicationGuildCommands(this.client.user.id, this.client.config.guild.id), {
                    body: this.client.commands.all.map((cmd) => cmd.props)
                });
                this.logger.success(`Successfully registered ${this.client.commands.all.size} guild commands`);
            }
            else {
                await this.rest_api.put(discord_js_1.Routes.applicationCommands(this.client.user.id), {
                    body: this.client.commands.all.map((cmd) => cmd.props)
                });
                this.logger.success(`Successfully registered ${this.client.commands.all.size} global commands`);
            }
        }
        catch (err) {
            this.logger.error(`Failed to register ${type} commands`);
            this.logger.error(err.stack);
        }
    }
    /**
     * Sync a Command (Guild or Global)
     * @param {string} name - The name of the command
     * @param {'guild' | 'global'} type - The type of command
     * @returns {Promise<void>}
     */
    async syncCommand(name, type) {
        try {
            this.logger.info(`Syncing ${type} command: ${name}`);
            if (!this.client.user?.id)
                return this.logger.error(`Client was not resolved while syncing command: ${name}`);
            let cmd = await this.getCommandId(name, type);
            this.logger.info(`Command ID located for: ${name}`);
            let command = await this.client.commands.get(name);
            if (type === 'guild') {
                await this.rest_api.put(discord_js_1.Routes.applicationGuildCommand(this.client.user.id, this.client.config.guild.id, cmd), {
                    body: command?.props
                });
            }
            else {
                await this.rest_api.put(discord_js_1.Routes.applicationCommand(this.client.user.id, cmd), {
                    body: command?.props
                });
            }
            this.logger.success(`Successfully synced ${type} command: ${name}`);
        }
        catch (err) {
            this.logger.error(`Failed to sync ${type} command: ${name}`);
            this.logger.error(err.stack);
        }
    }
}
exports.DiscordAPI = DiscordAPI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL2hhbmRsZXJzL3Jlc3QuaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBOEQ7QUFJOUQsNENBQXlDO0FBRXpDLE1BQWEsVUFBVTtJQUNaLE1BQU0sQ0FBaUI7SUFDdEIsUUFBUSxDQUFPO0lBQ2YsTUFBTSxDQUFTO0lBRXZCLFlBQVksTUFBc0I7UUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGlCQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUM5RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFZLEVBQUUsSUFBd0I7UUFFNUQsSUFBSSxRQUFhLENBQUM7UUFFbEIsSUFBSSxDQUFDO1lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLElBQUksTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBRTdELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUFFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQztZQUUxRyxJQUFJLElBQUksS0FBSyxPQUFPLEVBQUUsQ0FBQztnQkFDbkIsUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsbUJBQU0sQ0FBQyx3QkFBd0Is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