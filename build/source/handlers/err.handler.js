"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const logger_1 = require("../utils/logger");
const uuid_1 = require("uuid");
const axios_1 = tslib_1.__importDefault(require("axios"));
class ErrorHandler {
    client;
    db;
    logger;
    constructor(client) {
        this.client = client;
        this.logger = new logger_1.Logger('[ERROR]');
        this.db = new client_1.PrismaClient();
    }
    async throw(message, opts) {
        const error = new Error(message);
        const reportId = await (0, uuid_1.v4)().toString();
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
        });
        return error;
    }
    async create({ id, name, message, state, type, info, stack }) {
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
        }).catch((err) => {
            this.logger.error(`Failed to create custom error: ${err.message}`);
            this.logger.debug(err.stack);
        });
    }
    async fetch(id) {
        const error = await this.db.errors.findUnique({ where: { id } });
        if (!error)
            return null;
        return {
            id: error.id,
            name: 'ENFINITY_ERROR',
            state: error.state,
            type: error.type,
            info: error.info,
            stack: error.stack,
            message: error.message
        };
    }
    async log({ id, name, state, info }) {
        try {
            await axios_1.default.post(process.env.ProxyURL, {
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
            });
        }
        catch (err) {
            this.logger.error(`Failed to log error to Discord: ${err.message}`);
            this.logger.debug(err.stack);
        }
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyLmhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvaGFuZGxlcnMvZXJyLmhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLDJDQUE4QztBQUM5Qyw0Q0FBeUM7QUFDekMsK0JBQW9DO0FBQ3BDLDBEQUEwQjtBQUcxQixNQUFhLFlBQVk7SUFFYixNQUFNLENBQWlCO0lBQ3ZCLEVBQUUsQ0FBZTtJQUNqQixNQUFNLENBQVM7SUFFdkIsWUFBWSxNQUFzQjtRQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxxQkFBWSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVNLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBZSxFQUFFLElBQXlCO1FBRXpELE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBVyxDQUFDO1FBQzNDLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBQSxTQUFNLEdBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUUzQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDZCxFQUFFLEVBQUUsUUFBUTtZQUNaLElBQUksRUFBRSxnQkFBZ0I7WUFDdEIsT0FBTyxFQUFFLE9BQU87WUFDaEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJO1NBQ3hDLENBQUMsQ0FBQztRQUVILE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNYLEVBQUUsRUFBRSxRQUFR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