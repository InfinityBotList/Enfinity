import type { EnfinityClient } from '../client/enfinity';
import { Logger } from '../utils/logger';

import {
    Params,
    Response,
    Spider,
    SPIDER_TEAM_LIST,
    SPIDER_NOT_OK_MSG,
    IS_A_MEMBER_MSG,
    NOT_A_MEMBER_MSG,
    USER_NOT_FOUND_MSG,
    Positions,
    Members,
    HasParams
} from '../types/perm.types';

export class PermHandler {
    public client: EnfinityClient;
    private logger: Logger;

    constructor(client: EnfinityClient) {
        this.client = client;
        this.logger = new Logger('[Perm Handler]');
    }

    public get user() {
        return {
            validate: async (opts: Params): Promise<Response> => {
                const { user, perm } = opts;
                const spider_res = await fetch(SPIDER_TEAM_LIST);

                if (!spider_res.ok) {
                    return {
                        success: false,
                        message: SPIDER_NOT_OK_MSG(spider_res.status)
                    }
                }

                const spider_data: Spider = await spider_res.json() as Spider;
                const spider = spider_data.members.find((member: Members) => member.user.id === user);

                if (!spider) {
                    return {
                        success: false,
                        message: USER_NOT_FOUND_MSG
                    }
                }

                for (const p of perm) {
                    const has = spider.positions.some((pos: Positions) => pos.name === p);

                    if (has) {
                        return {
                            success: true,
                            message: IS_A_MEMBER_MSG
                        }
                    }
                }

                return {
                    state: 'lockdown',
                    message: NOT_A_MEMBER_MSG,
                    missing: perm.join(', ')
                }
            },
            has: async (opts: HasParams): Promise<boolean> => {

                const { user, perm } = opts;
                const spider_res = await fetch(SPIDER_TEAM_LIST);

                if (!spider_res.ok) return false;

                const spider_data: Spider = await spider_res.json() as Spider;
                const spider = spider_data.members.find((member: Members) => member.user.id === user);

                if (!spider) return false;

                const has = spider.positions.some((pos: Positions) => pos.name === perm);

                if (!has) return false;

                return true
            },
            exists: async (user: string): Promise<boolean> => {
                const spider_res = await fetch(SPIDER_TEAM_LIST);

                if (!spider_res.ok) return false;

                const spider_data: Spider = await spider_res.json() as Spider;
                const spider = spider_data.members.find((member: Members) => member.user.id === user);

                if (!spider) return false;

                return true
            }
        }
    }
}