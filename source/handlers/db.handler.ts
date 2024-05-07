import { IError } from "../types/client.types";
import type { EnfinityClient } from "../client/enfinity";
import { ErrorHandler } from "../handlers/err.handler";
import { PrismaClient, cases } from "@prisma/client";
import { Logger } from "../utils/logger";
import { user } from '@prisma/client';
import { CreateStaffCase } from "../types/prisma.types";
import { ResponseStructure } from "../types/prisma.types";

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

    /**
     * DATABASE HANDLER FOR CASES
     */
    public get case() {
        return {

            get: async (id: string, user: string) => {
                const data = await this.prisma.cases.findMany({ where: { target: user } });

                const res = data.find(c => c.id.startsWith(id));

                if (!data || !res) return { state: false, message: 'Unable to locate a user case with that ID' };

                return {
                    state: true,
                    data: res
                }
            },
            list: async (user: string) => {
                const data = await this.prisma.cases.findMany({ where: { target: user } });

                if (!data || data.length === 0) return { state: false, message: 'No cases found for the provided user' };

                return {
                    state: true,
                    data
                }
            },
            create: async ({ target, guild, state, level, reason, moderator, duration }: CreateStaffCase): Promise<ResponseStructure> => {

                const data = await this.prisma.cases.create({
                    data: { target, guild, state, level, reason, moderator, duration }
                }).catch((err: Error) => {
                    this.logger.error('Failed to create a case:  ' + err.message);
                    this.logger.debug('Stack trace: ' + err.stack);

                    return { state: false, message: `Failed to create case: ${err.message}` }
                });

                if (!data) return { state: false, message: 'Failed to create case' };

                return {
                    state: true,
                    message: `Case created successfully for ${target} with the reason: ${reason}`,
                    case: data
                }
            },
            delete: async (id: string, user: string) => {
                const data = await this.prisma.cases.findMany({ where: { target: user } });

                const res = data.find(c => c.id.startsWith(id));

                if (!data || !res) return { state: false, message: 'Unable to locate a user case with that ID' };

                await this.prisma.cases.delete({ where: { id: res.id } });

                return {
                    state: true,
                    message: 'Case deleted successfully'
                }
            },
            expire: async (id: string, user: string) => {

                const c = await this.prisma.cases.findMany({ where: { target: user } });
                const res = c.find(c => c.id.startsWith(id));

                if (!res || !c) return { state: false, message: 'Unable to locate a user case with that ID' };

                if (res.duration && res.duration * 1000 < Date.now()) {
                    await this.prisma.cases.update({ where: { id: res.id }, data: { state: 'EXPIRED' } });

                    return { state: true, message: 'Case expired successfully' }
                }

                return { state: false, message: 'Case has not expired yet' }
            },
            check: async (): Promise<void> => {
                const data = await this.prisma.cases.findMany({ where: { state: 'OPEN' } });
                this.logger.info(`Checking ${data.length} cases for expiration`);

                for (const res of data) {
                    if (res.duration && res.duration * 1000 < Date.now()) {
                        await this.prisma.cases.update({ where: { id: res.id }, data: { state: 'EXPIRED' } });

                        this.logger.info(`Case ${res.id} has expired`);
                    }
                }
            }
        }
    }

    public get user() {
        return {
            create: async ({ id, name, avatar }: user): Promise<void> => {
                try {

                    await this.prisma.user.create({ data: { id, name, avatar, banned: false } });

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
            },
            exists: async (id: string): Promise<boolean> => {

                const data = await this.prisma.user.findUnique({ where: { id } });

                if (!data) return false;

                return true;
            }
        }
    }
}