import type { CacheType, ChatInputCommandInteraction } from "discord.js"
import { CommandTemplate } from '../../../temp/cmds.temp';
import { EnfinityClient } from '../../enfinity';

export default class SupportCommand extends CommandTemplate {

    constructor() {
        super({
            name: 'support',
            description: 'Links to our Help Desk/Support Panel',
            category: 'info',
            cooldown: 0,
            permissions: {
                hr: false,
                dev: false,
                staff: false,
                user: ['SendMessages'],
                bot: ['SendMessages']
            }
        })
    }

    public async exec(bot: EnfinityClient, interaction: ChatInputCommandInteraction<CacheType>): Promise<any> {

        return interaction.reply({
            embeds: [
                new bot.MessageEmbed({
                    title: 'Support Panel',
                    description: `So you need some help? Check out the links below!`,
                    color: bot.config.colors.base,
                    fields: [{
                        name: 'Bots',
                        value: `- [Rules](https://infinitybots.gg/help/bots/rules)\n- [Pages](https://infinitybots.gg/help/bots/page-rules)\n- [Links](https://infinitybots.gg/help/bots/extra-links)`,
                        inline: true
                    }, {
                        name: 'Programs',
                        value: `- [Certification](https://infinitybots.gg/help/programs/certification)\n- [Partnership](https://infinitybots.gg/help/programs)\n- [Premium](https://infinitybots.gg/help/programs)`,
                        inline: true
                    }, {
                        name: 'Staff',
                        value: `- [Guide](https://infinitybots.gg/help/staff/guide)\n- [Templates](https://infinitybots.gg/help/staff/templates)\n- [Onboarding](https://infinitybots.gg/help/staff)`,
                        inline: true
                    }]
                })
            ]
        })
    }
}