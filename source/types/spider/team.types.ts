export interface Team {
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

export type Permissions = 'owner' | 'human_resources' | 'lead_developer' | 'developer' | 'bot_reviewer';