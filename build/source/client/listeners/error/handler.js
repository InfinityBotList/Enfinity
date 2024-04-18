"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_temp_1 = require("../../../temp/event.temp");
/**
 * This event should handle any errors that occur within the bot.
 * @class ErrorEvent
 * @extends EventTemplate
 * @param {EnfinityClient} bot The bot client.
 * @method exec The method that will be executed when the event is triggered.
 * @return {Promise<void>}
 */
class ErrorEvent extends event_temp_1.EventTemplate {
    constructor() {
        super({ name: 'error' });
    }
    async exec(bot, err) {
        await bot.error.throw(err.message, {
            state: 'OPEN',
            type: 'BOT',
            info: 'An error has occurred within the bot.',
            stack: {
                info: err.message,
                err_stack: err.stack,
                file_trace: new Error().stack
            }
        });
        return bot.logger.error(`An error has occurred: ${err.message}`);
    }
}
exports.default = ErrorEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NvdXJjZS9jbGllbnQvbGlzdGVuZXJzL2Vycm9yL2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx5REFBeUQ7QUFFekQ7Ozs7Ozs7R0FPRztBQUNILE1BQXFCLFVBQVcsU0FBUSwwQkFBYTtJQUNqRDtRQUNJLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQW1CLEVBQUUsR0FBVTtRQUM3QyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDL0IsS0FBSyxFQUFFLE1BQU07WUFDYixJQUFJLEVBQUUsS0FBSztZQUNYLElBQUksRUFBRSx1Q0FBdUM7WUFDN0MsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxHQUFHLENBQUMsT0FBTztnQkFDakIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxLQUFLO2dCQUNwQixVQUFVLEVBQUUsSUFBSSxLQUFLLEVBQUUsQ0FBQyxLQUFLO2FBQ2hDO1NBQ0osQ0FBQyxDQUFBO1FBRUYsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywwQkFBMEIsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQztDQUNKO0FBbkJELDZCQW1CQyJ9