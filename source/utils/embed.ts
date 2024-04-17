import { EmbedBuilder, EmbedField, HexColorString } from 'discord.js';
import { config } from '../config/main';

export class MessageEmbed extends EmbedBuilder {
    constructor(data: {
        title: string
        color: HexColorString
        description: string
        fields: EmbedField[]
    }) {
        super();

        this.setTitle(data.title);
        this.setDescription(data.description);
        data.color ? this.setColor(data.color) : this.setColor(config.colors.base);
        this.setThumbnail('https://cdn.infinitybots.gg//core/enfinity.png');
        data.fields ? this.setFields(data.fields) : null;
        this.setTimestamp();
        this.setFooter({
            text: '© 2023 - Infinity Development',
            iconURL: 'https://cdn.infinitybots.gg//core/enfinity.png'
        })
    }
}