"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseHandler = void 0;
const err_handler_1 = require("../handlers/err.handler");
const client_1 = require("@prisma/client");
const logger_1 = require("../utils/logger");
class DatabaseHandler {
    client;
    logger;
    prisma;
    errors;
    constructor(client) {
        this.client = client;
        this.logger = new logger_1.Logger('[DB]');
        this.prisma = new client_1.PrismaClient();
        this.errors = new err_handler_1.ErrorHandler(client);
    }
    async getUser(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            return { state: false, message: 'Whoops, i couldn\'t seem to find the user you are looking for in our database.' };
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
        };
    }
    async createUser({ id, name, avatar }) {
        try {
            if (!id || !name || !avatar)
                return this.errors.throw('Whoops, something\'s not right here.', {
                    state: 'OPEN',
                    type: 'USER',
                    info: 'Missing required fields',
                    stack: new Error().stack
                });
            const user = await this.prisma.user.findUnique({ where: { id } });
            if (user)
                return { state: false, message: 'User already exists' };
            await this.prisma.user.create({
                data: {
                    id,
                    name,
                    avatar,
                    staff: false,
                    banned: false,
                    total: 0
                }
            });
        }
        catch (err) {
            this.errors.throw('Whoops, something\'s not right here.', {
                state: 'OPEN',
                type: 'DATABASE',
                info: 'Failed to create user',
                stack: {
                    msg: err.message,
                    trace: new Error().stack
                }
            });
        }
    }
}
exports.DatabaseHandler = DatabaseHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9oYW5kbGVycy9kYi5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHlEQUF1RDtBQUN2RCwyQ0FBOEM7QUFDOUMsNENBQXlDO0FBR3pDLE1BQWEsZUFBZTtJQUNqQixNQUFNLENBQWlCO0lBQ3RCLE1BQU0sQ0FBUztJQUNoQixNQUFNLENBQWU7SUFDckIsTUFBTSxDQUFlO0lBRTVCLFlBQVksTUFBc0I7UUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUkscUJBQVksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSwwQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQVU7UUFDM0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFbEUsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsZ0ZBQWdGLEVBQUUsQ0FBQztRQUU5SCxPQUFPO1lBQ0gsS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJLEVBQUU7Z0JBQ0YsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUNYLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7YUFDcEI7U0FDSixDQUFBO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBUTtRQUM5QyxJQUFJLENBQUM7WUFFRCxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTTtnQkFBRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxFQUFFO29CQUMxRixLQUFLLEVBQUUsTUFBTTtvQkFDYixJQUFJLEVBQUUsTUFBTTtvQkFDWixJQUFJLEVBQUUseUJBQXlCO29CQUMvQixLQUFLLEVBQUUsSUFBSSxLQUFLLEVBQUUsQ0FBQyxLQUFLO2lCQUMzQixDQUFDLENBQUM7WUFFSCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVsRSxJQUFJLElBQUk7Z0JBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLENBQUM7WUFFbEUsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQzFCLElBQUksRUFBRTtvQkFDRixFQUFFO29CQUNGLElBQUk7b0JBQ0osTUFBTTtvQkFDTixLQUFLLEVBQUUsS0FBSztvQkFDWixNQUFNLEVBQUUsS0FBSztvQkFDYixLQUFLLEVBQUUsQ0FBQztpQkFDWDthQUNKLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFBQyxPQUFPLEdBQVksRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxFQUFFO2dCQUN0RCxLQUFLLEVBQUUsTUFBTTtnQkFDYixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsSUFBSSxFQUFFLHVCQUF1QjtnQkFDN0IsS0FBSyxFQUFFO29CQUNILEdBQUcsRUFBRyxHQUFhLENBQUMsT0FBTztvQkFDM0IsS0FBSyxFQUFFLElBQUksS0FBSyxFQUFFLENBQUMsS0FBSztpQkFDM0I7YUFDSixDQUFDLENBQUE7UUFDTixDQUFDO0lBQ0wsQ0FBQztDQUNKO0FBbkVELDBDQW1FQyJ9