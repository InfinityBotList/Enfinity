"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cmds_temp_1 = require("../../../temp/cmds.temp");
class PingCommand extends cmds_temp_1.CommandTemplate {
    constructor() {
        super({
            name: 'ping',
            description: 'View the bots latency and response time',
            category: 'info',
            cooldown: 0,
            permissions: {
                dev: false,
                user: ['SendMessages'],
                bot: ['SendMessages']
            }
        });
    }
    async exec(bot, interaction) {
        try {
            const msg = await interaction.reply('Gathering the ping information...');
            const res = msg.createdTimestamp - interaction.createdTimestamp;
            const embed = new bot.MessageEmbed({
                title: '🏓 Pong!',
                description: `Be honest with me doc, is it bad?`,
                color: bot.config.colors.base,
                fields: [
                    {
                        name: 'Websocket Ping',
                        value: `\`${Math.round(bot.ws.ping)}ms\``,
                        inline: true
                    },
                    {
                        name: 'Response Time',
                        value: `\`${res}ms\``,
                        inline: true
                    },
                    {
                        name: 'API Latency',
                        value: `\`${Date.now() - interaction.createdTimestamp}ms\``,
                        inline: true
                    }
                ]
            });
            await msg.edit({ embeds: [embed] });
        }
        catch (err) {
            return interaction.reply({
                embeds: [
                    new bot.MessageEmbed({
                        title: 'Error: command execution failed',
                        color: bot.config.colors.error,
                        description: `\`${err.message}\``,
                        fields: [
                            {
                                name: 'Error Trace',
                                value: `\`\`\`js\n${err.stack}\`\`\``,
                                inline: false
                            }
                        ]
                    })
                ]
            });
        }
    }
}
exports.default = PingCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NvdXJjZS9jbGllbnQvcHVibGljL2luZm8vcGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHVEQUEwRDtBQUcxRCxNQUFxQixXQUFZLFNBQVEsMkJBQWU7SUFFcEQ7UUFDSSxLQUFLLENBQUM7WUFDRixJQUFJLEVBQUUsTUFBTTtZQUNaLFdBQVcsRUFBRSx5Q0FBeUM7WUFDdEQsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLENBQUM7WUFDWCxXQUFXLEVBQUU7Z0JBQ1QsR0FBRyxFQUFFLEtBQUs7Z0JBQ1YsSUFBSSxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUN0QixHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUM7YUFDeEI7U0FDSixDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFtQixFQUFFLFdBQW1EO1FBQ3RGLElBQUksQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHLE1BQU0sV0FBVyxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1lBQ3pFLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsZ0JBQWdCLENBQUM7WUFFaEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDO2dCQUMvQixLQUFLLEVBQUUsVUFBVTtnQkFDakIsV0FBVyxFQUFFLG1DQUFtQztnQkFDaEQsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUk7Z0JBQzdCLE1BQU0sRUFBRTtvQkFDSjt3QkFDSSxJQUFJLEVBQUUsZ0JBQWdCO3dCQUN0QixLQUFLLEVBQUUsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU07d0JBQ3pDLE1BQU0sRUFBRSxJQUFJO3FCQUNmO29CQUNEO3dCQUNJLElBQUksRUFBRSxlQUFlO3dCQUNyQixLQUFLLEVBQUUsS0FBSyxHQUFHLE1BQU07d0JBQ3JCLE1BQU0sRUFBRSxJQUFJO3FCQUNmO29CQUNEO3dCQUNJLElBQUksRUFBRSxhQUFhO3dCQUNuQixLQUFLLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsV0FBVyxDQUFDLGdCQUFnQixNQUFNO3dCQUMzRCxNQUFNLEVBQUUsSUFBSTtxQkFDZjtpQkFDSjthQUNKLENBQUMsQ0FBQztZQUVILE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUV2QyxDQUFDO1FBQUMsT0FBTyxHQUFRLEVBQUUsQ0FBQztZQUNoQixPQUFPLFdBQVcsQ0FBQyxLQUFLLENBQUM7Z0JBQ3JCLE1BQU0sRUFBRTtvQkFDSixJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUM7d0JBQ2pCLEtBQUssRUFBRSxpQ0FBaUM7d0JBQ3hDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLO3dCQUM5QixXQUFXLEVBQUUsS0FBSyxHQUFHLENBQUMsT0FBTyxJQUFJO3dCQUNqQyxNQUFNLEVBQUU7NEJBQ0o7Z0NBQ0ksSUFBSSxFQUFFLGFBQWE7Z0NBQ25CLEtBQUssRUFBRSxhQUFhLEdBQUcsQ0FBQyxLQUFLLFFBQVE7Z0NBQ3JDLE1BQU0sRUFBRSxLQUFLOzZCQUNoQjt5QkFDSjtxQkFDSixDQUFDO2lCQUNMO2FBQ0osQ0FBQyxDQUFBO1FBQ04sQ0FBQztJQUNMLENBQUM7Q0FDSjtBQWpFRCw4QkFpRUMifQ==