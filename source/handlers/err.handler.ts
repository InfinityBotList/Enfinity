import { EnfinityClient } from "@/client/enfinity";
import { IError, IThrowError } from '@/types/client.types';
import { PrismaClient } from "@prisma/client";
import { Logger } from "@/utils/logger";

export class ErrorHandler {

    private client: EnfinityClient;
    private db: PrismaClient;
    private logger: Logger;

    constructor(client: EnfinityClient) {
        this.client = client;
        this.logger = new Logger('[ERROR]');
        this.db = new PrismaClient();
    }

    public async throw(message: string, opts: IThrowError['opts']): Promise<void> {

        const error = new Error(message) as IError;

        await this.create({
            name: 'ENFINITY_ERROR',
            message: error.message,
            state: opts.state,
            type: opts.type,
            info: opts.info,
            stack: opts.stack ? opts.stack : null
        });

        throw error;
    }

    public async create({ name, message, state, type, info, stack }: IError): Promise<void> {
        await this.db.errors.create({
            data: {
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
}