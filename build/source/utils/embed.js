"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEmbed = void 0;
const discord_js_1 = require("discord.js");
const main_1 = require("../config/main");
class MessageEmbed extends discord_js_1.EmbedBuilder {
    constructor(data) {
        super();
        this.setTitle(data.title);
        this.setDescription(data.description);
        data.color ? this.setColor(data.color) : this.setColor(main_1.config.colors.base);
        this.setThumbnail('https://cdn.infinitybots.gg//core/enfinity.png');
        data.fields ? this.setFields(data.fields) : null;
        this.setTimestamp();
        this.setFooter({
            text: '© 2023 - Infinity Development',
            iconURL: 'https://cdn.infinitybots.gg//core/enfinity.png'
        });
    }
}
exports.MessageEmbed = MessageEmbed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1iZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvdXRpbHMvZW1iZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXNFO0FBQ3RFLHlDQUF3QztBQUV4QyxNQUFhLFlBQWEsU0FBUSx5QkFBWTtJQUMxQyxZQUFZLElBS1g7UUFDRyxLQUFLLEVBQUUsQ0FBQztRQUVSLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDakQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDWCxJQUFJLEVBQUUsK0JBQStCO1lBQ3JDLE9BQU8sRUFBRSxnREFBZ0Q7U0FDNUQsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNKO0FBcEJELG9DQW9CQyJ9