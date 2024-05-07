import * as CommandTypes from '../types/cmd.types';
import { Collection, HexColorString, StringSelectMenuBuilder } from 'discord.js';
import { EnfinityClient } from '../client/enfinity';

export interface IConfig {
    rest: '10';
    client: {
        token: string;
    }
    guild: {
        id: string;
        channels: {
            audits: '1237300039987101697';
            errors: '1092343797582667826';
            system: '1090417512862191676';
        }
        roles: {
            management: '922837596063821835';
            human_resources: '1223895841736101948';
            lead_dev: '870950609317150732';
            developer: '870950609291972625';
            staff: '870950609291972622';
            intern: '1227731480541921330';
        }
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
    get(name: string): Promise<CommandTypes.ICommand | undefined>;
    all(): Collection<string, CommandTypes.ICommand>;
    category(category: string): Collection<string, CommandTypes.ICommand>;
    load(dir: string): void;
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

