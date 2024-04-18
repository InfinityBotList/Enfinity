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
     * @returns {Promise<string | null>}
     */
    public async getCommandId(name: string): Promise<any> {
        try {
            this.logger.info(`Fetching command ID for ${name}`);

            if (!this.client.user?.id) return this.logger.error('Client was not resolved while registering commands');

            const commands = (await this.rest_api.get(Routes.applicationCommands(this.client.user.id))) as ApplicationCommand[];

            const command = commands.find((cmd: ApplicationCommand) => cmd.name === name);

            if (!command) throw new Error(`Unable to locate command ID for: ${name}`);

            return command.id;
        } catch (err: any) {
            this.logger.error(`Failed to fetch command ID for ${name}`);
            this.logger.error(err.stack)
            return null;
        }
    }

    /**
     * Register Commands (Guild or Global)
     * @returns {Promise<void>}
     */
    public async register(): Promise<void> {
        try {
            if (!this.client.user?.id) return this.logger.error('Client was not resolved while registering commands');

            await this.rest_api.put(Routes.applicationCommands(this.client.user.id), {
                body: this.client.commands.all().map((cmd: ICommand) => cmd.props)
            })

            return this.logger.success(`Successfully registered ${this.client.commands.all().size} commands`);
        } catch (err: any) {
            this.logger.error(`Failed to register client commands`);
            this.logger.debug(err.stack)
        }
    }

    /**
     * Sync/update a command
     * @param {string} name - The name of the command
     * @returns {Promise<void>}
     */
    public async sync(name: string): Promise<void> {
        try {
            this.logger.info(`Syncing command: ${name}`);

            if (!this.client.user?.id) return this.logger.error(`Client was not resolved while syncing command: ${name}`);

            let cmd = await this.getCommandId(name);

            this.logger.info(`Command ID located for: ${name}`);

            let command = await this.client.commands.get(name);

            await this.rest_api.patch(Routes.applicationCommand(this.client.user.id, cmd), {
                body: command?.props
            });

            this.logger.success(`Successfully synced command: ${name}`);
        } catch (err: any) {
            this.logger.error(`Failed to sync command: ${name}`);
            this.logger.error(err.stack)
        }
    }
} 