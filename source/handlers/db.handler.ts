import { IError } from "../types/client.types";
import type { EnfinityClient } from "../client/enfinity";
import { ErrorHandler } from "../handlers/err.handler";
import { PrismaClient } from "@prisma/client";
import { Logger } from "../utils/logger";
import { user } from '@prisma/client';

export class DatabaseHandler {
    public client: EnfinityClient;
    private logger: Logger;
    public prisma: PrismaClient;
    public errors: ErrorHandler;

    constructor(client: EnfinityClient) {
        this.client = client;
        this.logger = new Logger('[DB]');
        this.prisma = new PrismaClient();
        this.errors = new ErrorHandler(client);
    }

    public async getUser(id: string) {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) return { state: false, message: 'Whoops, i couldn\'t seem to find the user you are looking for in our database.' };

        return {
            state: true,
            data: {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                banned: user.banned,
                cases: user.total,
                staff: user.staff,
            }
        }
    }

    public async createUser({ id, name, avatar }: user) {
        try {

            if (!id || !name || !avatar) return this.errors.throw('Whoops, something\'s not right here.', {
                state: 'OPEN',
                type: 'USER',
                info: 'Missing required fields',
                stack: new Error().stack
            });

            const user = await this.prisma.user.findUnique({ where: { id } });

            if (user) return { state: false, message: 'User already exists' };

            await this.prisma.user.create({
                data: {
                    id,
                    name,
                    avatar,
                    staff: false,
                    banned: false,
                    total: 0
                }
            })
        } catch (err: unknown) {
            this.errors.throw('Whoops, something\'s not right here.', {
                state: 'OPEN',
                type: 'DATABASE',
                info: 'Failed to create user',
                stack: {
                    msg: (err as Error).message,
                    trace: new Error().stack
                }
            })
        }
    }
}