import { readdirSync } from 'node:fs';
import { join, sep } from 'node:path';

import type { EnfinityClient } from '@/client/enfinity';
import type { IEvent } from '@/types/event.types';
import { Logger } from '@/utils/logger';

export class EventHandler {
    public client: EnfinityClient;
    private logger: Logger;

    constructor(client: EnfinityClient) {
        this.client = client;
        this.logger = new Logger('[Event Handler]');
    }

    /**
     * Load the client events/listeners
     * @param {string} dir - The directory to load events from
     * @returns {void}
     */
    public loadEvents(dir: string): void {
        readdirSync(dir).forEach(async (subDir: string): Promise<void> => {
            const events = readdirSync(`${dir}${sep}${subDir}${sep}`);

            for (const file of events) {
                const instance = await import(join(dir, subDir, file));
                const event: IEvent = new instance.default();

                if (!event.props.name) return this.logger.error(`Event ${file} is missing a name property.`);
                if (!event.exec) return this.logger.error(`Event ${file} is missing an exec property.`);
                if (typeof event.exec !== 'function') return this.logger.error(`Event: ${file} exec property must be a function.`);

                if (event.props.once) {
                    this.client.once(event.props.name, (...args) => event.exec(this.client, ...args));
                    return;
                }

                this.client.on(event.props.name, (...args) => event.exec(this.client, ...args));
            }
        })
    }
}