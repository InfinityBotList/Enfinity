import { EnfinityClient } from "../client/enfinity";
import { IError, IThrowError } from '../types/client.types';
import { PrismaClient } from "@prisma/client";
import { Logger } from "../utils/logger";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';


export class ErrorHandler {

    private client: EnfinityClient;
    private db: PrismaClient;
    private logger: Logger;

    constructor(client: EnfinityClient) {
        this.client = client;
        this.logger = new Logger('[ERROR]');
        this.db = new PrismaClient();
    }

    public async throw(message: string, opts: IThrowError['opts']): Promise<IError> {

        const error = new Error(message) as IError;
        const reportId = await uuidv4().toString();
        const maxLength = 191;
        const truncated = message ? message.slice(0, maxLength) : 'Something went wrong here!'

        await this.create({
            id: reportId,
            name: 'ENFINITY_ERROR',
            message: truncated,
            state: opts.state,
            type: opts.type,
            info: opts.info,
            stack: opts.stack ? opts.stack : null
        });

        await this.log({
            id: reportId.split('-')[0],
            name: 'ENFINITY_ERROR',
            type: opts.type
        })

        return error;
    }

    public async create({ id, name, message, state, type, info, stack }: IError): Promise<void> {

        await this.db.errors.create({
            data: {
                id: id,
                name: name,
                message: message,
                state: state,
                type: type,
                info: info,
                stack: stack
            }
        }).catch((err: Error) => {
            this.logger.error(`Failed to create custom error: ${err.message}`);
            this.logger.debug(err.stack as string);
        })
    }

    /**
     * Fetch an error by ID.
     * @param id The ID of the error you want to fetch.
     * @returns The error object.
     */
    public async fetch(id: string): Promise<IError | null> {
        const errors = await this.db.errors.findMany();
        const error = errors.find(error => error.id.startsWith(id));

        if (!error) return null;

        return {
            id: error.id,
            name: 'ENFINITY_ERROR',
            state: error.state,
            type: error.type,
            info: error.info,
            message: error.message,
            stack: error.stack
        }
    }

    private async log({ id, name, type }: any): Promise<void> {
        try {
            await axios.post(process.env.ProxyURL as string, {
                content: `<@&870950609317150732> <@&870950609291972625>`,
                embeds: [
                    {
                        title: `Whoops, something went wrong!`,
                        color: 0xff0000,
                        description: `You can use the ID below to view more information about this error.`,
                        fields: [{
                            name: 'Error ID',
                            value: `${id}`,
                            inline: true
                        }, {
                            name: 'Error Name',
                            value: `${name}`,
                            inline: true
                        }, {
                            name: 'Error Type',
                            value: `${type}`,
                            inline: true
                        }, {
                            name: 'Important Info',
                            value: `Use the ID above with my \`/error\` command to view or update this error.`,
                            inline: false
                        }]
                    }
                ]
            }, {
                headers: {
                    Authorization: process.env.ProxyKey
                }
            })
        } catch (err: any) {
            this.logger.error(`Failed to log error to Discord: ${err.message}`);
            this.logger.debug(err.stack as string);
        }
    }
}