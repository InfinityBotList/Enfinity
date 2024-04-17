import { REST, Routes, ApplicationCommand } from 'discord.js';

import type { EnfinityClient } from '../client/enfinity';
import type { ICommand } from '../types/cmd.types';
import { Logger } from '../utils/logger';

export class DiscordAPI {
    public client: EnfinityClient;
    private rest_api: REST;
    private logger: Logger;

    constructor(client: EnfinityClient) {
        this.client = client;
        this.rest_api = new REST({ version: this.client.config.rest })
        this.rest_api.setToken(process.env.TOKEN!);
        this.logger = new Logger('[DISCORD API]');
    }

    /**
     * Get a Command ID (Guild or Global)
     * @param {string} name - The name of the command
     * @param {'guild' | 'global'} type - The type of command
     * @returns {Promise<string | null>}
     */
    public async getCommandId(name: string, type: 'guild' | 'global'): Promise<any> {

        let commands: any;

        try {
            this.logger.info(`Fetching command ID for ${name} - ${type}`)

            if (!this.client.user?.id) return this.logger.error('Client was not resolved while registering commands');

            if (type === 'guild') {
                commands = await this.rest_api.get(Routes.applicationGuildCommands(this.client.user.id, this.client.config.guild.id));
            } else {
                commands = await this.rest_api.get(Routes.applicationCommands(this.client.user.id));
            }

            const command = commands.find((cmd: ApplicationCommand) => cmd.name === name);

            if (!command) throw new Error(`Command: ${name} was not found in ${type} commands`);

            return command.id;
        } catch (err: any) {
            this.logger.error(`Failed to fetch command ID for ${name} - ${type}`);
            this.logger.error(err.stack)
            return null;
        }
    }

    /**
     * Register Commands (Guild or Global)
     * @param {'guild' | 'global'} type - The type of command
     * @returns {Promise<void>}
     */
    public async registerCommands(type: 'guild' | 'global'): Promise<void> {
        try {
            this.logger.info(`Registering ${type} commands.`);

            if (!this.client.user?.id) return this.logger.error('Client was not resolved while registering commands');

            if (type === 'guild') {
                await this.rest_api.put(Routes.applicationGuildCommands(this.client.user.id, this.client.config.guild.id), {
                    body: this.client.commands.all.map((cmd: ICommand) => cmd.props)
                })

                this.logger.success(`Successfully registered ${this.client.commands.all.size} guild commands`);
            } else {
                await this.rest_api.put(Routes.applicationCommands(this.client.user.id), {
                    body: this.client.commands.all.map((cmd: ICommand) => cmd.props)
                })

                this.logger.success(`Successfully registered ${this.client.commands.all.size} global commands`);
            }
        } catch (err: any) {
            this.logger.error(`Failed to register ${type} commands`);
            this.logger.error(err.stack)
        }
    }

    /**
     * Sync a Command (Guild or Global)
     * @param {string} name - The name of the command
     * @param {'guild' | 'global'} type - The type of command
     * @returns {Promise<void>}
     */
    public async syncCommand(name: string, type: 'guild' | 'global'): Promise<void> {
        try {
            this.logger.info(`Syncing ${type} command: ${name}`);

            if (!this.client.user?.id) return this.logger.error(`Client was not resolved while syncing command: ${name}`);

            let cmd = await this.getCommandId(name, type);

            this.logger.info(`Command ID located for: ${name}`);

            let command = await this.client.commands.get(name);

            if (type === 'guild') {
                await this.rest_api.put(Routes.applicationGuildCommand(this.client.user.id, this.client.config.guild.id, cmd), {
                    body: command?.props
                })
            } else {
                await this.rest_api.put(Routes.applicationCommand(this.client.user.id, cmd), {
                    body: command?.props
                })
            }

            this.logger.success(`Successfully synced ${type} command: ${name}`);
        } catch (err: any) {
            this.logger.error(`Failed to sync ${type} command: ${name}`);
            this.logger.error(err.stack)
        }
    }
} 