import { readdirSync } from 'node:fs';
import { join, sep } from 'node:path';
import { Collection } from 'discord.js';

import { ICommandHandler } from '../types/client.types';
import type { ICommand } from '../types/cmd.types';
import { EnfinityClient } from '../client/enfinity';
import { Logger } from '../utils/logger';

export class CommandHandler implements ICommandHandler {
    public client: EnfinityClient;
    public commands: Collection<string, ICommand> = new Collection();
    public logger: Logger;

    constructor(client: EnfinityClient) {
        this.client = client;
        this.logger = new Logger('[Cmd Handler]');
    }

    /**
     * Get a command by name
     * @param {string} name - The name of the command
     * @returns {Promise<ICommand>}
     */
    public async get(name: string): Promise<ICommand> {
        const command = this.commands.get(name);

        if (!command) throw new Error(`Command: ${name} does not exist!`);

        return command;
    }

    /**
     * Get all commands
     * @returns {Collection<string, ICommand>}
     */
    public get all(): Collection<string, ICommand> {
        return this.commands;
    }

    /**
     * Get all commands in a category
     * @param {string} category - The category to filter by
     * @returns {Collection<string, ICommand>}
     */
    public category(category: string): Collection<string, ICommand> {
        return this.commands.filter((cmd: ICommand) => cmd.props.category === category);
    }

    /**
     * Load all public commands
     * @param {string} dir - The directory to load commands from
     * @returns {void}
     */
    public loadPublicCommands(dir: string): void {
        readdirSync(dir).forEach(async (subDir: string): Promise<void> => {
            const commands = readdirSync(`${dir}${sep}${subDir}${sep}`)

            if (!dir.startsWith('public')) return this.logger.error(`Invalid command directory: ${dir} - Public commands should be in a folder named 'public'`);

            for (const file of commands) {
                const instance = await import(join(dir, subDir, file));
                const command: ICommand = new instance.default();

                if (typeof command.props.name !== 'string') return this.logger.error(`Command: ${file} does not have a valid name!`);
                if (typeof command.exec !== 'function') return this.logger.error(`Command: ${file} does not have a valid execute function!`);
                if (this.commands.has(command.props.name)) return this.logger.error(`Command: ${command.props.name} already exists!`);

                this.commands.set(command.props.name, command);

                this.logger.info(`Loaded command: ${command.props.name} from ${dir}${sep}${subDir}${sep}${file}`);
            }
        })
    }

    /**
     * Load all private (guild only) commands
     * @param {string} dir - The directory to load commands from
     * @returns {void}
     */
    public loadPrivateCommands(dir: string): void {
        readdirSync(dir).forEach(async (subDir: string): Promise<void> => {
            const commands = readdirSync(`${dir}${sep}${subDir}${sep}`)

            if (!dir.startsWith('private')) return this.logger.error(`Invalid command directory: ${dir} - Private commands should be in a folder named 'private'`);

            for (const file of commands) {
                const instance = await import(join(dir, subDir, file));
                const command: ICommand = new instance.default();

                if (typeof command.props.name !== 'string') return this.logger.error(`Command: ${file} does not have a valid name!`);
                if (typeof command.exec !== 'function') return this.logger.error(`Command: ${file} does not have a valid execute function!`);
                if (this.commands.has(command.props.name)) return this.logger.error(`Command: ${command.props.name} already exists!`);

                this.commands.set(command.props.name, command);

                this.logger.info(`Loaded command: ${command.props.name} from ${dir}${sep}${subDir}${sep}${file}`);
            }
        })
    }
}