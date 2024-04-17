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

        await this.create({
            id: reportId,
            name: 'ENFINITY_ERROR',
            message: message,
            state: opts.state,
            type: opts.type,
            info: opts.info,
            stack: opts.stack ? opts.stack : null
        });

        await this.log({
            id: reportId,
            name: 'ENFINITY_ERROR',
            message: message,
            state: opts.state,
            type: opts.type,
            info: opts.info,
            stack: opts.stack
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

    public async fetch(id: string): Promise<IError | null> {
        const error = await this.db.errors.findUnique({ where: { id } });

        if (!error) return null;

        return {
            id: error.id,
            name: 'ENFINITY_ERROR',
            state: error.state as IError['state'],
            type: error.type as IError['type'],
            info: error.info,
            stack: error.stack,
            message: error.message
        }
    }

    private async log({ id, name, state, info }: IError): Promise<void> {
        try {
            await axios.post(process.env.ProxyURL as string, {
                content: `<@!510065483693817867>`,
                embeds: [
                    {
                        title: `Whoops, something went wrong!`,
                        color: 0xff0000,
                        description: `You can use the ID below to view more information about this error.`,
                        fields: [{
                            name: 'ID',
                            value: `${id}`,
                            inline: true
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