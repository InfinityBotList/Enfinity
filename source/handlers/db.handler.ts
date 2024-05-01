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
                const data = await this.prisma.cases.findMany({ where: { userId: user } });

                const res = data.find(c => c.id.startsWith(id));

                if (!data || !res) return { state: false, message: 'Unable to locate a user case with that ID' };

                return {
                    state: true,
                    data: res
                }
            },
            list: async (user: string) => {
                const data = await this.prisma.cases.findMany({ where: { userId: user } });

                if (!data || data.length === 0) return { state: false, message: 'No cases found for the provided user' };

                return {
                    state: true,
                    data
                }
            },
            /**
             * Create a new case
             * @param {CreateStaffCase} data - The data to create a new case
             * @returns {Promise<{ state: boolean, message: string, case?: cases }>}
             */
            create: async ({ userId, guild, type, action, reason, moderator, level, duration }: CreateStaffCase): Promise<ResponseStructure> => {

                const required = { userId, guild, type, action, reason, moderator };
                const missing = Object.entries(required).filter(([key, value]) => !value).map(([key]) => key);

                if (missing.length > 0) {
                    return {
                        state: false,
                        message: `Missing required fields: ${missing.join(', ')}`
                    }
                }

                const user = await this.prisma.user.findUnique({ where: { id: userId } });

                if (!user) {

                    const fetch = await this.client.users.fetch(userId);
                    if (!fetch) return { state: false, message: 'Failed to fetch user (this is a big oopsie)' };

                    await this.user.create({
                        id: fetch.id as string,
                        name: fetch.globalName as string,
                        avatar: fetch.avatarURL() as string,
                        banned: false,
                        total: 0
                    })
                }

                const newCase = await this.prisma.cases.create({
                    data: {
                        guild,
                        type,
                        action,
                        reason,
                        moderator,
                        duration,
                        level,
                        user: {
                            connect: {
                                id: userId
                            }
                        }
                    }
                }).catch((err: Error) => {

                    this.logger.error(`Failed to create case: ${err.message}`)
                    this.logger.error(`Stack: ${err.stack}`)

                    return {
                        state: false,
                        message: `Failed to create case: ${err.message}`
                    }
                })

                return {
                    state: true,
                    message: 'Case created successfully',
                    case: newCase
                }
            },
            delete: async (id: string, user: string) => {
                const data = await this.prisma.cases.findMany({ where: { userId: user } });

                const res = data.find(c => c.id.startsWith(id));

                if (!data || !res) return { state: false, message: 'Unable to locate a user case with that ID' };

                await this.prisma.cases.delete({ where: { id: res.id } });

                return {
                    state: true,
                    message: 'Case deleted successfully'
                }
            },
            /**
             * Background task to expire a case
             * @returns void
             */
            expire: async (): Promise<void> => {
                const cases = await this.prisma.cases.findMany();

                for (const c of cases) {

                    if (c.duration !== null) {
                        const created = new Date(c.createdAt);
                        const duration = c.duration * 1000;
                        const expires = new Date(created.getTime() + duration);
                        const current = new Date()

                        if (current > expires) {
                            await this.prisma.cases.update({
                                where: { id: c.id },
                                data: { type: 'EXPIRED' }
                            })
                        }
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
            }
        }
    }
}