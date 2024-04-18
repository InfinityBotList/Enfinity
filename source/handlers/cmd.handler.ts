import { readdirSync } from 'node:fs';
import { join, sep } from 'node:path';
import { Collection } from 'discord.js';

import { ICommandHandler } from '../types/client.types';
import type { ICommand } from '../types/cmd.types';
import { EnfinityClient } from '../client/enfinity';
import { Logger } from '../utils/logger';

export class CommandHandler implements ICommandHandler {
    public client: EnfinityClient;
    public gcommands: Collection<string, ICommand> = new Collection();
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
    public async get(name: string, type: 'guild' | 'global'): Promise<ICommand> {
        const command = type === 'guild' ? this.gcommands.get(name) : this.commands.get(name);

        if (!command) throw new Error(`Command: ${name} does not exist!`);

        return command;
    }

    /**
     * Get all commands
     * @returns {Collection<string, ICommand>}
     */
    public all(type: 'guild' | 'global'): Collection<string, ICommand> {
        return type === 'guild' ? this.gcommands : this.commands;
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
     * Load all commands (guild or global)
     * @param {string} dir - The directory to load commands from
     * @returns {void}
     */
    public loadCommands(dir: string, type: 'guild' | 'global'): void {
        readdirSync(dir).forEach(async (subDir: string): Promise<void> => {
            const commands = readdirSync(`${dir}${sep}${subDir}${sep}`)

            for (const file of commands) {
                const instance = await import(join(dir, subDir, file));
                const command: ICommand = new instance.default();

                if (typeof command.props.name !== 'string') return this.logger.error(`Command: ${file} does not have a valid name!`);
                if (typeof command.exec !== 'function') return this.logger.error(`Command: ${file} does not have a valid execute function!`);

                if (type === 'guild') {
                    if (this.gcommands.has(command.props.name)) return this.logger.error(`Command: ${command.props.name} already exists!`);

                    this.gcommands.set(command.props.name, command);

                    this.logger.info(`Loaded ${type} command: ${command.props.name}`);
                } else {
                    if (this.commands.has(command.props.name)) return this.logger.error(`Command: ${command.props.name} already exists!`);

                    this.commands.set(command.props.name, command);

                    this.logger.info(`Loaded ${type} command: ${command.props.name}`);
                }
            }
        })
    }
}