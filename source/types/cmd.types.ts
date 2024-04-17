import { EnfinityClient } from '@/client/enfinity';

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
    options: ICommandOptions;
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
    examples: ICommandExamples[];
    choices: ICommandChoices[];
    options: ISubCommandOptions;
    required: boolean;
    type: number;
}

export interface ICommandChoices {
    name: string;
    value: string;
}

export interface ISubCommandOptions {
    name: string;
    description: string;
    required: boolean;
    choices: ICommandChoices[];
    type: number;
}

