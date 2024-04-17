import { join } from 'node:path';
import * as ClientTypes from '@/types/client.types';
import { Client, ClientOptions, Collection } from 'discord.js';
import { CommandHandler } from '@/handlers/cmd.handler';
import { EventHandler } from '@/handlers/event.handler';
import { DiscordAPI } from '@/handlers/rest.handler';
import { Logger } from '@/utils/logger';
import { config } from '@/config/main';

export class EnfinityClient extends Client {

    public config: ClientTypes.IConfig = config;
    public cooldown = new Collection<string, Collection<string, number>>();

    public rest_api = new DiscordAPI(this);
    public commands = new CommandHandler(this);
    public events = new EventHandler(this);

    public logger = new Logger('[CLIENT]');
    public types = ClientTypes;

    constructor(options: ClientOptions) {
        super(options);

        this.init();
    }

    public async connect(token: string): Promise<void> {
        try {
            await this.login(token)
        } catch (e: any) {
            this.logger.error(`Error initializing client: ${e.stack}`);
        }
    }

    private init(): void {
        //this.commands.loadPublicCommands(join(__dirname, './commands/public/'));
        //this.commands.loadPrivateCommands(join(__dirname, './commands/private/'));
        this.events.loadEvents(join(__dirname, './listeners/'));
    }
}