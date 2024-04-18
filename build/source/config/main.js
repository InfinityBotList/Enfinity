"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
/**
 * The main configuration object
 * @type {IConfig}
 * @property {string} rest - The Discord API version
 * @property {object} client - The client configuration
 * @property {string} client.id - The client ID
 * @property {string} client.token - The client token
 * @property {object} guild - The guild configuration
 * @property {string} guild.id - The guild ID
 * @property {string} guild.logs - The guild logs channel ID
 * @property {object} colors - Color configuration for embeds
 * @property {string} colors.base - The base color
 * @property {string} colors.error - The error color
 * @property {string} colors.success - The success color
 * @property {string} colors.warning - The warning color
 * @property {string} colors.info - The info color
 */
exports.config = {
    rest: '10',
    client: {
        id: '',
        token: process.env.TOKEN
    },
    guild: {
        id: '870950609291972618',
        logs: '1092343797582667826'
    },
    colors: {
        base: '#2F3136',
        error: '#FF0000',
        success: '#00FF00',
        warning: '#FFFF00',
        info: '#00FFFF'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9jb25maWcvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxtQ0FBaUQ7QUFFakQsSUFBQSxlQUFhLEdBQUUsQ0FBQztBQUVoQjs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNVLFFBQUEsTUFBTSxHQUFZO0lBQzNCLElBQUksRUFBRSxJQUFJO0lBQ1YsTUFBTSxFQUFFO1FBQ0osRUFBRSxFQUFFLEVBQUU7UUFDTixLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFlO0tBQ3JDO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsRUFBRSxFQUFFLG9CQUFvQjtRQUN4QixJQUFJLEVBQUUscUJBQXFCO0tBQzlCO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsU0FBUztRQUNoQixPQUFPLEVBQUUsU0FBUztRQUNsQixPQUFPLEVBQUUsU0FBUztRQUNsQixJQUFJLEVBQUUsU0FBUztLQUNsQjtDQUNKLENBQUEifQ==