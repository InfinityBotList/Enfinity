import type { EnfinityClient } from '../../enfinity';
import { EventTemplate } from '../../../temp/event.temp';

/**
 * This event should handle any errors that occur within the bot.
 * @class ErrorEvent
 * @extends EventTemplate
 * @param {EnfinityClient} bot The bot client.
 * @method exec The method that will be executed when the event is triggered.
 * @return {Promise<void>}
 */
export default class ErrorEvent extends EventTemplate {
    constructor() {
        super({ name: 'error' });
    }

    public async exec(bot: EnfinityClient, err: Error): Promise<void> {
        await bot.error.throw(err.message, {
            state: 'OPEN',
            type: 'BOT',
            info: 'An error has occurred within the bot.',
            stack: {
                info: err.message,
                err_stack: err.stack,
                file_trace: new Error().stack
            }
        })

        return bot.logger.error(`An error has occurred: ${err.message}`);
    }
}
