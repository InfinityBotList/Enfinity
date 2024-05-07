import { EnfinityClient } from '../client/enfinity';
import { Team, Members, Positions } from '../types/spider/team.types';

export class Utils {
    public client: EnfinityClient;
    private spider: string;
    private acks: string[];
    private list: any;

    constructor(client: EnfinityClient) {
        this.client = client;
        this.spider = 'https://spider.infinitybots.gg/';
        this.acks = [];
        this.list = {
            management: [],
            human_resources: [],
            head_developer: [],
            developer: [],
            reviewer: [],
            support: [],
            moderator: [],
            intern: []
        }
    }

    public get base() {
        return {
            delay: (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms)),
        }
    }

    public get users() {
        return {
            team_acks: async (user: string) => {
                const owner = await this.client.perms.user.has({ user, perm: 'owner' });
                const human_resources = await this.client.perms.user.has({ user, perm: 'human_resources' });
                const head_developer = await this.client.perms.user.has({ user, perm: 'head_developer' });
                const developer = await this.client.perms.user.has({ user, perm: 'developer' });
                const reviewer = await this.client.perms.user.has({ user, perm: 'bot_reviewer' });
                const intern = await this.client.perms.user.has({ user, perm: 'intern' });

                const mUser = this.client.guilds.cache.get('758641373074423808')?.members.cache.get(user);

                if (owner) this.list.management.push(user);
                if (human_resources) this.list.human_resources.push(user);
                if (head_developer) this.list.head_developer.push(user);
                if (developer) this.list.developer.push(user);
                if (reviewer) this.list.reviewer.push(user);
                if (intern) this.list.intern.push(user);

                if (mUser && mUser.roles.cache.has('805761849601294336')) this.list.support.push(user);
                if (mUser && mUser.roles.cache.has('1026937197212991568')) this.list.moderator.push(user);

                this.acks = [];

                if (this.list.management.includes(user)) this.acks.push('Management');
                if (this.list.human_resources.includes(user)) this.acks.push('Human Resources');
                if (this.list.head_developer.includes(user)) this.acks.push('Head Developer');
                if (this.list.developer.includes(user)) this.acks.push('Developer');
                if (this.list.reviewer.includes(user)) this.acks.push('Bot Reviewer');
                if (this.list.intern.includes(user)) this.acks.push('Reviewer in Training');
                if (this.list.support.includes(user)) this.acks.push('Community Support');
                if (this.list.moderator.includes(user)) this.acks.push('Community Moderator');

                return this.acks.length > 0 ? this.acks.join(', ') : 'No team acknowledgements';
            }
        }
    }
}