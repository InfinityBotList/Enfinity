"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const discord_js_1 = require("discord.js");
const logger_1 = require("../utils/logger");
class CommandHandler {
    client;
    commands = new discord_js_1.Collection();
    logger;
    constructor(client) {
        this.client = client;
        this.logger = new logger_1.Logger('[Cmd Handler]');
    }
    /**
     * Get a command by name
     * @param {string} name - The name of the command
     * @returns {Promise<ICommand>}
     */
    async get(name) {
        const command = this.commands.get(name);
        if (!command)
            throw new Error(`Command: ${name} does not exist!`);
        return command;
    }
    /**
     * Get all commands
     * @returns {Collection<string, ICommand>}
     */
    get all() {
        return this.commands;
    }
    /**
     * Get all commands in a category
     * @param {string} category - The category to filter by
     * @returns {Collection<string, ICommand>}
     */
    category(category) {
        return this.commands.filter((cmd) => cmd.props.category === category);
    }
    /**
     * Load all commands (guild or global)
     * @param {string} dir - The directory to load commands from
     * @returns {void}
     */
    loadCommands(dir, type) {
        (0, node_fs_1.readdirSync)(dir).forEach(async (subDir) => {
            const commands = (0, node_fs_1.readdirSync)(`${dir}${node_path_1.sep}${subDir}${node_path_1.sep}`);
            for (const file of commands) {
                const instance = await Promise.resolve(`${(0, node_path_1.join)(dir, subDir, file)}`).then(s => __importStar(require(s)));
                const command = new instance.default();
                if (typeof command.props.name !== 'string')
                    return this.logger.error(`Command: ${file} does not have a valid name!`);
                if (typeof command.exec !== 'function')
                    return this.logger.error(`Command: ${file} does not have a valid execute function!`);
                if (this.commands.has(command.props.name))
                    return this.logger.error(`Command: ${command.props.name} already exists!`);
                this.commands.set(command.props.name, command);
                this.logger.info(`Loaded ${type} command: ${command.props.name}`);
            }
        });
    }
}
exports.CommandHandler = CommandHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21kLmhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvaGFuZGxlcnMvY21kLmhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXNDO0FBQ3RDLHlDQUFzQztBQUN0QywyQ0FBd0M7QUFLeEMsNENBQXlDO0FBRXpDLE1BQWEsY0FBYztJQUNoQixNQUFNLENBQWlCO0lBQ3ZCLFFBQVEsR0FBaUMsSUFBSSx1QkFBVSxFQUFFLENBQUM7SUFDMUQsTUFBTSxDQUFTO0lBRXRCLFlBQVksTUFBc0I7UUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBWTtRQUN6QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsT0FBTztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsWUFBWSxJQUFJLGtCQUFrQixDQUFDLENBQUM7UUFFbEUsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQVcsR0FBRztRQUNWLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFFBQVEsQ0FBQyxRQUFnQjtRQUM1QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBYSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFlBQVksQ0FBQyxHQUFXLEVBQUUsSUFBd0I7UUFDckQsSUFBQSxxQkFBVyxFQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBYyxFQUFpQixFQUFFO1lBQzdELE1BQU0sUUFBUSxHQUFHLElBQUEscUJBQVcsRUFBQyxHQUFHLEdBQUcsR0FBRyxlQUFHLEdBQUcsTUFBTSxHQUFHLGVBQUcsRUFBRSxDQUFDLENBQUE7WUFFM0QsS0FBSyxNQUFNLElBQUksSUFBSSxRQUFRLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxRQUFRLEdBQUcseUJBQWEsSUFBQSxnQkFBSSxFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLHVDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sT0FBTyxHQUFhLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUVqRCxJQUFJLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUTtvQkFBRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSw4QkFBOEIsQ0FBQyxDQUFDO2dCQUNySCxJQUFJLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxVQUFVO29CQUFFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLDBDQUEwQyxDQUFDLENBQUM7Z0JBQzdILElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDO2dCQUV0SCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFFL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLGFBQWEsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3RFLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSjtBQS9ERCx3Q0ErREMifQ==