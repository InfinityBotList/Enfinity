import { cases } from "@prisma/client";

export interface ResponseStructure {
    state: boolean;
    message: string;
    data?: any;
    case?: any;
}

export interface CreateStaffCase {
    id?: string;
    target: string;
    guild: string;
    state: cases['state'];
    reason: string;
    moderator: string;
    level: cases['level'];
    duration: number;
}