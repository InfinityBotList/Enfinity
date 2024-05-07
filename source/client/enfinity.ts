import { join } from 'node:path';
import * as ClientTypes from '../types/client.types';
import { Client, ClientOptions, Collection } from 'discord.js';
import { MessageEmbed } from '../utils/embed';
import { DatabaseHandler } from '../handlers/db.handler';
import { ErrorHandler } from '../handlers/err.handler';
import { CommandHandler } from '../handlers/cmd.handler';
import { EventHandler } from '../handlers/event.handler';
import { DiscordAPI } from '../handlers/rest.handler';
import { Spider } from '../handlers/perm.handler';
import { Utils } from '../utils/client';
import { Logger } from '../utils/logger';
import { config } from '../config/main';

export class EnfinityClient extends Client {

    public config: ClientTypes.IConfig = config;
    public cooldown = new Collection<string, Collection<string, number>>();

    public MessageEmbed: any = MessageEmbed;
    public error = new ErrorHandler(this);
    public rest_api = new DiscordAPI(this);
    public commands = new CommandHandler(this);
    public events = new EventHandler(this);
    public db = new DatabaseHandler(this);
    public perms = new Spider(this);
    public utils = new Utils(this);

    public logger = new Logger('[CLIENT]');
    public types = ClientTypes;

    constructor(options: ClientOptions) {
        super(options);

        this.init();
        this.handleErrors();
    }

    public async connect(token: string): Promise<void> {
        try {
            await this.login(token)
        } catch (e: any) {
            this.logger.error(`Error initializing client: ${e.stack}`);
        }
    }

    private init(): void {
        this.events.load(join(__dirname, './listeners/'));
        this.commands.load(join(__dirname, './commands/'));
    }

    private handleErrors(): void {
        /**
         * Handle uncaught exceptions
         * @param {Error} err - The error that was thrown
         * @returns {void}
         */
        process.on('unhandledRejection', (err: Error | ClientTypes.IError) => {
            this.error.throw(err.message, {
                state: 'OPEN',
                type: 'BOT',
                info: 'Unhandled Promise Rejection',
                stack: {
                    info: err.name,
                    trace: new Error().stack,
                    stack: err.stack
                }
            })
        })
        /**
         * Promise rejections that were handled in some form
         * @param {Promise<any>} promise - The promise that was rejected
         * @returns {void}
         */
        process.on('rejectionHandled', (promise: Promise<any>) => {
            this.logger.warn(`Promise rejection handled: ${promise}`);
            this.logger.info('This event is emitted when a promise is rejected, but there is an attached handler for the rejection.')
            this.logger.info('In most cases, this warning can safely be ignored.')
        })

        /**
         * Handle uncaught exceptions
         * @param {Error} err - The error that was thrown
         * @returns {void}
         */
        process.on('uncaughtException', (err: Error) => {
            this.error.throw(err.message, {
                state: 'OPEN',
                type: 'BOT',
                info: 'Uncaught Exception',
                stack: {
                    info: err.name,
                    trace: new Error().stack,
                    stack: err.stack
                }
            })
        })
        /**
         * Handle warnings
         * @param {Error} warning - The warning that was thrown
         * @returns {void}
         */
        process.on('warning', (warning: Error) => {
            this.logger.warn(`Warning: ${warning.message}`);
            this.logger.info('This event is emitted when Node.js prints a warning to stderr or stdout.');
            this.logger.info('In most cases, this warning can safely be ignored.')
        })

        /**
         * Handle uncaught exceptions
         * @param {Error} err - The error that was thrown
         * @returns {void}
         */
        process.on('uncaughtExceptionMonitor', (err: Error) => {
            this.error.throw(err.message, {
                state: 'OPEN',
                type: 'BOT',
                info: 'Uncaught Exception Monitor',
                stack: {
                    info: err.name,
                    trace: new Error().stack,
                    stack: err.stack
                }
            })
        })
    }
}