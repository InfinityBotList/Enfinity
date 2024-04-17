import type { EnfinityClient } from '@/client/enfinity';
import { EventTemplate } from '@/temp/event.temp';

/**
 * This event should handle any errors that occur within the bot.
 * @class ErrorEvent
 * @extends EventTemplate
 * @param {EnfinityClient} bot The bot client.
 * @method exec The method that will be executed when the event is triggered.
 * @return {Promise<void>}
 */
export default class ErrorEvent extends EventTemplate {

    private bot: EnfinityClient;

    constructor(bot: EnfinityClient) {
        super({ name: 'error' });

        this.bot = bot;
    }

    public async exec(err: Error): Promise<void> {
        this.bot.logger.error(`An error has occurred: ${err.message}`);
        this.bot.logger.debug(err.stack as any)
    }
}
