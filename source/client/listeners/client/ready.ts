import { ActivityType } from 'discord.js';
import type { EnfinityClient } from '../../enfinity';
import { EventTemplate } from '../../../temp/event.temp';

export default class ReadyEvent extends EventTemplate {
    constructor() {
        super({ name: 'ready', once: true });
    }

    public async exec(bot: EnfinityClient): Promise<void> {

        await bot.rest_api.register();

        bot.logger.success(`${bot.user?.tag} is now online and ready!`);
        bot.logger.info(`[PARTIAL_TOKEN]: ${bot.config.client.token.substring(0, 20)}.********`);

        bot.user?.setStatus('idle');

        bot.user?.setActivity({
            name: 'Streaming: pornhub.com',
            type: ActivityType.Custom
        })
    }
}
