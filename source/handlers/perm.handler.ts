import { Logger } from '../utils/logger';
import type { EnfinityClient } from '../client/enfinity';
import { Team, Members, Positions } from '../types/spider/team.types';
import { SpiderAPI, Params, HasParams, Response } from '../types/spider/perm.types';

export class Spider implements SpiderAPI {
    public client: EnfinityClient;
    private logger: Logger;
    private url: string;

    constructor(client: EnfinityClient) {
        this.client = client;
        this.logger = new Logger('[Spider (Permissions)]');
        this.url = 'https://spider.infinitybots.gg/';
    }

    public get user() {
        return {
            has: async (opts: HasParams): Promise<boolean> => {

                const { user, perm } = opts;
                const spider_res = await fetch(this.url + 'list/team');

                this.logger.info(`Checking: ${user} for perm: ${perm}`);

                if (!spider_res.ok) return false;

                const spider_data: Team = await spider_res.json() as Team;
                const spider = spider_data.members.find((member: Members) => member.user.id === user);

                this.logger.info(`Successfully located user in our list of spiders!`);

                if (!spider) return false;

                const has = spider.positions.some((pos: Positions) => pos.name === perm);

                this.logger.info(`User: ${user} has ${perm}: ${has}`);

                if (!has) return false;

                return true
            },
            exists: async (user: string): Promise<boolean> => {
                const spider_res = await fetch(this.url + 'list/team');

                if (!spider_res.ok) return false;

                const spider_data: Team = await spider_res.json() as Team;
                const spider = spider_data.members.find((member: Members) => member.user.id === user);

                if (!spider) return false;

                return true
            },
            validate: async (opts: Params): Promise<Response> => {
                const { user, perm } = opts;
                const spider_res = await fetch(this.url + 'list/team');

                if (!spider_res.ok) {
                    return {
                        success: false,
                        message: `Failed to fetch team list!`
                    }
                }

                const spider_data: Team = await spider_res.json() as Team;
                const spider = spider_data.members.find((member: Members) => member.user.id === user);

                if (!spider) {
                    return {
                        success: false,
                        message: `Unable to locate user: ${user} in our team list!`
                    }
                }

                for (const p of perm) {
                    const has = spider.positions.some((pos: Positions) => pos.name === p);

                    if (has) {
                        return {
                            success: true,
                            message: `User: ${user} has the required permissions!`
                        }
                    }
                }

                return {
                    state: 'lockdown',
                    message: `User: ${user} is missing the following permissions`,
                    missing: perm.join(', ')
                }
            }
        }
    }
}