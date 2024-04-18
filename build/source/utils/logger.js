"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const COLOR_RED = "\x1b[31m";
const COLOR_GREEN = "\x1b[32m";
const COLOR_YELLOW = "\x1b[33m";
const COLOR_BLUE = "\x1b[34m";
const COLOR_MAGENTA = "\x1b[35m";
const COLOR_RESET = "\x1b[0m";
class Logger {
    prefix;
    constructor(prefix) {
        this.prefix = prefix;
    }
    info(message) {
        console.info(`[${(0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss")}] ${COLOR_BLUE}${this.prefix} | Info${COLOR_RESET} - ${message}`);
    }
    warn(message) {
        console.warn(`[${(0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss")}] ${COLOR_YELLOW}${this.prefix} | Warn${COLOR_RESET} - ${message}`);
    }
    error(message) {
        console.error(`[${(0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss")}] ${COLOR_RED}${this.prefix} | Error${COLOR_RESET} - ${message}`);
    }
    success(message) {
        console.log(`[${(0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss")}] ${COLOR_GREEN}${this.prefix} | Success${COLOR_RESET} - ${message}`);
    }
    debug(message) {
        console.debug(`[${(0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss")}] ${COLOR_MAGENTA}${this.prefix} | Debug${COLOR_RESET} - ${message}`);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL3V0aWxzL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsNERBQTJCO0FBRTNCLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQTtBQUM1QixNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUE7QUFDOUIsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFBO0FBQy9CLE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQTtBQUM3QixNQUFNLGFBQWEsR0FBRyxVQUFVLENBQUE7QUFDaEMsTUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFBO0FBRTdCLE1BQWEsTUFBTTtJQUNSLE1BQU0sQ0FBUztJQUV0QixZQUFZLE1BQWU7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7SUFDeEIsQ0FBQztJQUVNLElBQUksQ0FBQyxPQUF3QjtRQUNoQyxPQUFPLENBQUMsSUFBSSxDQUNSLElBQUksSUFBQSxnQkFBTSxHQUFFLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEtBQUssVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLFVBQVUsV0FBVyxNQUFNLE9BQU8sRUFBRSxDQUM5RyxDQUFBO0lBQ0wsQ0FBQztJQUVNLElBQUksQ0FBQyxPQUF3QjtRQUNoQyxPQUFPLENBQUMsSUFBSSxDQUNSLElBQUksSUFBQSxnQkFBTSxHQUFFLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEtBQUssWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLFVBQVUsV0FBVyxNQUFNLE9BQU8sRUFBRSxDQUNoSCxDQUFBO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUF3QjtRQUNqQyxPQUFPLENBQUMsS0FBSyxDQUNULElBQUksSUFBQSxnQkFBTSxHQUFFLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEtBQUssU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLFdBQVcsV0FBVyxNQUFNLE9BQU8sRUFBRSxDQUM5RyxDQUFBO0lBQ0wsQ0FBQztJQUVNLE9BQU8sQ0FBQyxPQUF3QjtRQUNuQyxPQUFPLENBQUMsR0FBRyxDQUNQLElBQUksSUFBQSxnQkFBTSxHQUFFLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEtBQUssV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLGFBQWEsV0FBVyxNQUFNLE9BQU8sRUFBRSxDQUNsSCxDQUFBO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUF3QjtRQUNqQyxPQUFPLENBQUMsS0FBSyxDQUNULElBQUksSUFBQSxnQkFBTSxHQUFFLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEtBQUssYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLFdBQVcsV0FBVyxNQUFNLE9BQU8sRUFBRSxDQUNsSCxDQUFBO0lBQ0wsQ0FBQztDQUNKO0FBcENELHdCQW9DQyJ9