import { Permissions } from './team.types';
import { EnfinityClient } from '../../client/enfinity';

export interface SpiderAPI {
    client: EnfinityClient;
    user: {
        has(opts: HasParams): Promise<boolean>;
        exists(user: string): Promise<boolean>;
        validate(opts: Params): Promise<Response>;
    }
}

export interface Params {
    user: string;
    perm: Permissions[];
}

export interface HasParams {
    user: string;
    perm: string;
}

export interface Response {
    success?: boolean;
    state?: 'lockdown';
    message: string;
    missing?: string;
    data?: any;
}