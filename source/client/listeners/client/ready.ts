import { ActivityType } from 'discord.js';
import type { EnfinityClient } from '@/client/enfinity';
import { EventTemplate } from '@/temp/event.temp';

export default class ReadyEvent extends EventTemplate {

    private bot: EnfinityClient;

    constructor(bot: EnfinityClient) {
        super({
            name: 'ready',
            once: true
        });

        this.bot = bot;
    }

    public async exec(): Promise<void> {

        this.bot.logger.success(`${this.bot.user?.tag} is now online and ready!`);
        this.bot.logger.info(`[PARTIAL_TOKEN]: ${this.bot.config.client.token.substring(0, 20)}.********`);

        this.bot.user?.setStatus('idle');

        this.bot.user?.setActivity({
            name: 'Watching over the Infinity Servers',
            type: ActivityType.Custom
        })
    }
}
