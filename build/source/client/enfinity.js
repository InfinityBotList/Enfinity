"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnfinityClient = void 0;
const tslib_1 = require("tslib");
const node_path_1 = require("node:path");
const ClientTypes = tslib_1.__importStar(require("../types/client.types"));
const discord_js_1 = require("discord.js");
const embed_1 = require("../utils/embed");
const err_handler_1 = require("../handlers/err.handler");
const cmd_handler_1 = require("../handlers/cmd.handler");
const event_handler_1 = require("../handlers/event.handler");
const rest_handler_1 = require("../handlers/rest.handler");
const logger_1 = require("../utils/logger");
const main_1 = require("../config/main");
class EnfinityClient extends discord_js_1.Client {
    config = main_1.config;
    cooldown = new discord_js_1.Collection();
    MessageEmbed = embed_1.MessageEmbed;
    error = new err_handler_1.ErrorHandler(this);
    rest_api = new rest_handler_1.DiscordAPI(this);
    commands = new cmd_handler_1.CommandHandler(this);
    events = new event_handler_1.EventHandler(this);
    logger = new logger_1.Logger('[CLIENT]');
    types = ClientTypes;
    constructor(options) {
        super(options);
        this.init();
        this.handleErrors();
    }
    async connect(token) {
        try {
            await this.login(token);
        }
        catch (e) {
            this.logger.error(`Error initializing client: ${e.stack}`);
        }
    }
    init() {
        this.events.loadEvents((0, node_path_1.join)(__dirname, './listeners/'));
        this.commands.loadCommands(`${(0, node_path_1.join)(__dirname, './public/')}`, 'global');
    }
    handleErrors() {
        /**
         * Handle uncaught exceptions
         * @param {Error} err - The error that was thrown
         * @returns {void}
         */
        process.on('unhandledRejection', (err) => {
            this.error.throw(err.message, {
                state: 'OPEN',
                type: 'BOT',
                info: 'Unhandled Promise Rejection',
                stack: {
                    info: err.name,
                    trace: new Error().stack,
                    stack: err.stack
                }
            });
        });
        /**
         * Promise rejections that were handled in some form
         * @param {Promise<any>} promise - The promise that was rejected
         * @returns {void}
         */
        process.on('rejectionHandled', (promise) => {
            this.logger.warn(`Promise rejection handled: ${promise}`);
            this.logger.info('This event is emitted when a promise is rejected, but there is an attached handler for the rejection.');
            this.logger.info('In most cases, this warning can safely be ignored.');
        });
        /**
         * Handle uncaught exceptions
         * @param {Error} err - The error that was thrown
         * @returns {void}
         */
        process.on('uncaughtException', (err) => {
            this.error.throw(err.message, {
                state: 'OPEN',
                type: 'BOT',
                info: 'Uncaught Exception',
                stack: {
                    info: err.name,
                    trace: new Error().stack,
                    stack: err.stack
                }
            });
        });
        /**
         * Handle warnings
         * @param {Error} warning - The warning that was thrown
         * @returns {void}
         */
        process.on('warning', (warning) => {
            this.logger.warn(`Warning: ${warning.message}`);
            this.logger.info('This event is emitted when Node.js prints a warning to stderr or stdout.');
            this.logger.info('In most cases, this warning can safely be ignored.');
        });
        /**
         * Handle uncaught exceptions
         * @param {Error} err - The error that was thrown
         * @returns {void}
         */
        process.on('uncaughtExceptionMonitor', (err) => {
            this.error.throw(err.message, {
                state: 'OPEN',
                type: 'BOT',
                info: 'Uncaught Exception Monitor',
                stack: {
                    info: err.name,
                    trace: new Error().stack,
                    stack: err.stack
                }
            });
        });
    }
}
exports.EnfinityClient = EnfinityClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5maW5pdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvY2xpZW50L2VuZmluaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSx5Q0FBaUM7QUFDakMsMkVBQXFEO0FBQ3JELDJDQUErRDtBQUMvRCwwQ0FBOEM7QUFDOUMseURBQXVEO0FBQ3ZELHlEQUF5RDtBQUN6RCw2REFBeUQ7QUFDekQsMkRBQXNEO0FBQ3RELDRDQUF5QztBQUN6Qyx5Q0FBd0M7QUFFeEMsTUFBYSxjQUFlLFNBQVEsbUJBQU07SUFFL0IsTUFBTSxHQUF3QixhQUFNLENBQUM7SUFDckMsUUFBUSxHQUFHLElBQUksdUJBQVUsRUFBc0MsQ0FBQztJQUVoRSxZQUFZLEdBQVEsb0JBQVksQ0FBQztJQUNqQyxLQUFLLEdBQUcsSUFBSSwwQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLFFBQVEsR0FBRyxJQUFJLHlCQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsUUFBUSxHQUFHLElBQUksNEJBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxNQUFNLEdBQUcsSUFBSSw0QkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWhDLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoQyxLQUFLLEdBQUcsV0FBVyxDQUFDO0lBRTNCLFlBQVksT0FBc0I7UUFDOUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWYsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQWE7UUFDOUIsSUFBSSxDQUFDO1lBQ0QsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzNCLENBQUM7UUFBQyxPQUFPLENBQU0sRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLE1BQU0s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