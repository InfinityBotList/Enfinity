import type { IConfig } from '@/types/client.types';
import { config as load_env_vars } from 'dotenv';

load_env_vars();

/**
 * The main configuration object
 * @type {IConfig}
 * @property {string} rest - The Discord API version
 * @property {object} client - The client configuration
 * @property {string} client.id - The client ID
 * @property {string} client.token - The client token
 * @property {object} guild - The guild configuration
 * @property {string} guild.id - The guild ID
 * @property {string} guild.logs - The guild logs channel ID
 * @property {object} colors - Color configuration for embeds
 * @property {string} colors.base - The base color
 * @property {string} colors.error - The error color
 * @property {string} colors.success - The success color
 * @property {string} colors.warning - The warning color
 * @property {string} colors.info - The info color
 */
export const config: IConfig = {
    rest: '10',
    client: {
        id: '',
        token: process.env.TOKEN as string
    },
    guild: {
        id: '870950609291972618',
        logs: '1092343797582667826'
    },
    colors: {
        base: '#2F3136',
        error: '#FF0000',
        success: '#00FF00',
        warning: '#FFFF00',
        info: '#00FFFF'
    }
}