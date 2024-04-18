import { EnfinityClient } from '../client/enfinity';
import type { CacheType, ChatInputCommandInteraction } from "discord.js"

import type {
    ApplicationCommand,
    ApplicationCommandData,
    PermissionResolvable,
    Interaction
} from 'discord.js';

export interface ICommand {
    props: ICommandProps;
    exec: (client: EnfinityClient, interaction: Interaction, args: any) => void;
    rest?: {
        cmd: ApplicationCommand;
        data: ApplicationCommandData;
    }
    types: {
        Cache: CacheType;
        Interaction: ChatInputCommandInteraction
    }
}

export interface ICommandBase {
    props: ICommandProps
}

export interface ICommandProps {
    name: string;
    description: string;
    category: string;
    cooldown: number;
    permissions?: ICommandPerms
    examples?: ICommandExamples[];
    options?: ICommandOptions[];
}

export interface ICommandPerms {
    dev: boolean;
    user: PermissionResolvable[];
    bot: PermissionResolvable[];
}

export interface ICommandExamples {
    usage: string;
    description: string;
}

export interface ICommandOptions {
    name: string;
    description: string;
    examples?: ICommandExamples[];
    choices?: ICommandChoices[];
    options?: ISubCommandOptions[];
    required?: boolean;
    type: number;
}

export interface ICommandChoices {
    name: string;
    value: string;
}

export interface ISubCommandOptions {
    name: string;
    description: string;
    required?: boolean;
    choices?: ICommandChoices[];
    options?: ICommandOptions[];
    type: number;
}

export const OptionTypes = {
    SubCommand: 1,
    SubCommandGroup: 2,
    String: 3,
    Integer: 4,
    Boolean: 5,
    User: 6,
    Channel: 7,
    Role: 8,
    Mentionable: 9,
    Number: 10,
    Attachment: 11,
}

