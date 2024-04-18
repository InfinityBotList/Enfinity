"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const logger_1 = require("../utils/logger");
class EventHandler {
    client;
    logger;
    constructor(client) {
        this.client = client;
        this.logger = new logger_1.Logger('[Event Handler]');
    }
    /**
     * Load the client events/listeners
     * @param {string} dir - The directory to load events from
     * @returns {void}
     */
    loadEvents(dir) {
        (0, node_fs_1.readdirSync)(dir).forEach(async (subDir) => {
            const events = (0, node_fs_1.readdirSync)(`${dir}${node_path_1.sep}${subDir}${node_path_1.sep}`);
            for (const file of events) {
                const instance = await Promise.resolve(`${(0, node_path_1.join)(dir, subDir, file)}`).then(s => __importStar(require(s)));
                const event = new instance.default();
                if (!event.props.name)
                    return this.logger.error(`Event ${file} is missing a name property.`);
                if (!event.exec)
                    return this.logger.error(`Event ${file} is missing an exec property.`);
                if (typeof event.exec !== 'function')
                    return this.logger.error(`Event: ${file} exec property must be a function.`);
                if (event.props.once) {
                    this.client.once(event.props.name, (...args) => event.exec(this.client, ...args));
                    return;
                }
                this.client.on(event.props.name, (...args) => event.exec(this.client, ...args));
            }
        });
    }
}
exports.EventHandler = EventHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQuaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9oYW5kbGVycy9ldmVudC5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFzQztBQUN0Qyx5Q0FBc0M7QUFJdEMsNENBQXlDO0FBRXpDLE1BQWEsWUFBWTtJQUNkLE1BQU0sQ0FBaUI7SUFDdEIsTUFBTSxDQUFTO0lBRXZCLFlBQVksTUFBc0I7UUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksVUFBVSxDQUFDLEdBQVc7UUFDekIsSUFBQSxxQkFBVyxFQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBYyxFQUFpQixFQUFFO1lBQzdELE1BQU0sTUFBTSxHQUFHLElBQUEscUJBQVcsRUFBQyxHQUFHLEdBQUcsR0FBRyxlQUFHLEdBQUcsTUFBTSxHQUFHLGVBQUcsRUFBRSxDQUFDLENBQUM7WUFFMUQsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLEVBQUUsQ0FBQztnQkFDeEIsTUFBTSxRQUFRLEdBQUcseUJBQWEsSUFBQSxnQkFBSSxFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLHVDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sS0FBSyxHQUFXLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUU3QyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJO29CQUFFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLDhCQUE4QixDQUFDLENBQUM7Z0JBQzdGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtvQkFBRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSwrQkFBK0IsQ0FBQyxDQUFDO2dCQUN4RixJQUFJLE9BQU8sS0FBSyxDQUFDLElBQUksS0FBSyxVQUFVO29CQUFFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLG9DQUFvQyxDQUFDLENBQUM7Z0JBRW5ILElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDbEYsT0FBTztnQkFDWCxDQUFDO2dCQUVELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEYsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNKO0FBbkNELG9DQW1DQyJ9