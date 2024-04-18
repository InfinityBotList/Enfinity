import * as CommandTypes from '../types/cmd.types';
import { Collection, HexColorString } from 'discord.js';
import { EnfinityClient } from '../client/enfinity';

export interface IConfig {
    rest: '10';
    client: {
        token: string;
    }
    guild: {
        id: string;
        logs: string;
    }
    colors: {
        base: HexColorString;
        error: HexColorString;
        success: HexColorString;
        warning: HexColorString;
        info: HexColorString;
    }
}

export interface IPermsConfig {
    devs: string[]
}

/**
 * Interface for the Command Handler
 * @property {EnfinityClient} client - The client instance
 * @property {Collection<string, CommandTypes.ICommand>} commands - The collection of commands
 * @method {get} - Get a command by name
 * @method {all} - Get all commands
 * @method {category} - Get all commands in a category
 * @method {load_public} - Load all public commands
 * @method {load_private} - Load all private (guild only) commands
 */
export interface ICommandHandler {
    client: EnfinityClient;
    commands: Collection<string, CommandTypes.ICommand>
    get(name: string, type: 'guild' | 'global'): Promise<CommandTypes.ICommand>;
    all(type: 'guild' | 'global'): Collection<string, CommandTypes.ICommand>;
    category(category: string): Collection<string, CommandTypes.ICommand>;
    loadCommands(dir: string, type: 'guild' | 'global'): void;
}

export interface IError extends Error {
    id?: string;
    name: 'ENFINITY_ERROR';
    message: string;
    state: 'OPEN' | 'INVESTIGATING' | 'INFO_NEEDED' | 'CLOSED';
    type: 'BOT' | 'USER' | 'GUILD' | 'DATABASE' | 'UNKNOWN';
    info: string;
    stack: any;
}

export interface IThrowError {
    message: string;
    opts: {
        state: IError['state'];
        type: IError['type'];
        info: IError['info'];
        stack?: IError['stack'];
    }
}

