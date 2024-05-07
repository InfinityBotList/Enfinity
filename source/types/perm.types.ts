export interface Params {
    user: string;
    perm: Permissions[];
}

export interface HasParams {
    user: string;
    perm: string;
}

export interface SyncParams {
    user: string;
}

export interface Response {
    success?: boolean;
    state?: 'lockdown';
    message: string;
    missing?: string;
    data?: any;
}

export type Permissions = 'owner' | 'human_resources' | 'lead_developer' | 'developer' | 'bot_reviewer';

export interface Spider {
    members: Members[];
}

export interface Members {
    user: User;
    positions: Positions[];
}

export interface User {
    id: string;
    username: string;
    display_name: string;
    avatar: string;
    bot: boolean;
    status: string;
}

export interface Positions {
    id: string;
    name: string;
    role_id: string;
    perms: string[];
    created_at: string;
    index: number;
}

export const IS_A_MEMBER_MSG = 'User is a valid member of our team';
export const NOT_A_MEMBER_MSG = 'Whoops, looks like you are missing one or more required staff positions to execute this command';
export const USER_NOT_FOUND_MSG = 'User does not appear to be a valid member of our team';
export const SPIDER_NOT_OK_MSG = (status: number) => `Response from Spider was not OK: ${status}`;
export const SPIDER_TEAM_LIST = 'https://spider.infinitybots.gg/list/team';

