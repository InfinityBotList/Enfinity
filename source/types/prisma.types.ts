import { cases } from "@prisma/client";

export interface ResponseStructure {
    state: boolean;
    message: string;
    data?: any;
    case?: any;
}

export interface CreateStaffCase {
    id?: string;
    userId: string;
    guild: string;
    type: cases['type'];
    action: cases['action'];
    reason: string;
    moderator: string;
    level: cases['level'];
    duration: number;
}