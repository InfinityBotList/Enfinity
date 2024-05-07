import { ActivityType, GuildMember } from 'discord.js';
import type { EnfinityClient } from '../../enfinity';
import { EventTemplate } from '../../../temp/event.temp';

export default class GuildMemberAddEvent extends EventTemplate {
    constructor() {
        super({
            name: 'guildMemberAdd',
            once: false
        });
    }

    public async exec(bot: EnfinityClient, member: GuildMember): Promise<any> {

        if (member.guild.id === '870952645811134475') {

            const bot_role = member.guild.roles.cache.get('1228487595483336816');
            const sys_chan = member.guild.channels.cache.get('870952646788390918');
            const user_role = member.guild.roles.cache.get('1129484610653393021');

            if (!bot_role || !sys_chan || !user_role) return;
            if (!sys_chan?.isTextBased()) return;

            if (member.user.bot) {

                await member.roles.add(bot_role);

                return sys_chan.send({
                    content: `<@&870952645811134480>`,
                    embeds: [
                        new bot.MessageEmbed({
                            title: 'Gate: bot joined',
                            description: `${member.user.tag} has slid into the server!`,
                            thumbnail: member.user.displayAvatarURL(),
                            color: bot.config.colors.base
                        })
                    ]
                })
            }

            await member.roles.add(user_role);

            return sys_chan.send({
                content: `<@&870952645811134480>`,
                embeds: [
                    new bot.MessageEmbed({
                        title: 'Gate: user joined',
                        description: `${member.user.globalName} has entered the server!`,
                        thumbnail: member.user.displayAvatarURL(),
                        color: bot.config.colors.base
                    })
                ]
            })
        } else if (member.guild.id === bot.config.guild.id) {

            const sys_chan = member.guild.channels.cache.get(bot.config.guild.channels.system);
            const audits = member.guild.channels.cache.get(bot.config.guild.channels.audits);
            const errors = member.guild.channels.cache.get(bot.config.guild.channels.errors);

            const management = member.guild.roles.cache.get(bot.config.guild.roles.management);
            const human_resources = member.guild.roles.cache.get(bot.config.guild.roles.human_resources);
            const lead_dev = member.guild.roles.cache.get(bot.config.guild.roles.lead_dev);
            const developer = member.guild.roles.cache.get(bot.config.guild.roles.developer);
            const staff = member.guild.roles.cache.get(bot.config.guild.roles.staff);

            const bots = member.guild.roles.cache.get('870950609291972620')

            if (!sys_chan || !audits || !errors || !management || !human_resources || !lead_dev || !developer || !staff || !bots) return;

            if (!sys_chan?.isTextBased() || !audits?.isTextBased() || !errors?.isTextBased()) return;

            if (member.user.bot) {

                await member.roles.add(bots);

                return sys_chan.send({
                    embeds: [
                        new bot.MessageEmbed({
                            title: 'Gate: bot joined',
                            description: `${member.user.tag} has slid into our server.`,
                            thumbnail: member.user.displayAvatarURL(),
                            color: bot.config.colors.base,
                            fields: [{
                                name: 'Is Bot',
                                value: `${member.user.bot ? 'true' : 'false'}`,
                                inline: true
                            }, {
                                name: 'Is Staff',
                                value: `false`,
                                inline: true
                            }, {
                                name: 'Auto Roles',
                                value: `${bots}`,
                                inline: true
                            }]
                        })
                    ]
                })
            }

            const m_check = await bot.perms.user.has({ user: member.id, perm: 'owner' });
            const hr_check = await bot.perms.user.has({ user: member.id, perm: 'human_resources' });
            const ld_check = await bot.perms.user.has({ user: member.id, perm: 'head_developer' });
            const dev_check = await bot.perms.user.has({ user: member.id, perm: 'developer' });
            const br_check = await bot.perms.user.has({ user: member.id, perm: 'bot_reviewer' });

            const added = [];

            if (!m_check && !hr_check && !ld_check && !dev_check && !br_check) {
                await member.kick('User is not a staff member.').catch(() => { });

                await audits.send({
                    embeds: [
                        new bot.MessageEmbed({
                            title: 'User Kicked',
                            description: `${member.user.tag} has been kicked from the server.`,
                            color: bot.config.colors.error,
                            fields: [{
                                name: 'Reason',
                                value: 'User is not a staff member.',
                                inline: true
                            }]
                        })
                    ]
                });

                return sys_chan.send({
                    embeds: [
                        new bot.MessageEmbed({
                            title: 'Gate: user joined',
                            description: `${member.user.tag} has been kicked from the server.`,
                            thumbnail: member.user.displayAvatarURL(),
                            color: bot.config.colors.error,
                            fields: [{
                                name: 'Is Bot',
                                value: `${member.user.bot ? 'true' : 'false'}`,
                                inline: true
                            }, {
                                name: 'Is Staff',
                                value: `false`,
                                inline: true
                            }]
                        })
                    ]
                });
            }

            if (m_check) {
                await member.roles.add(management);
                added.push(`<@&${management.id}>`);
            }

            if (hr_check) {
                await member.roles.add(human_resources);
                added.push(`<@&${human_resources.id}>`);
            }

            if (ld_check) {
                await member.roles.add(lead_dev);
                added.push(`<@&${lead_dev.id}>`);
            }

            if (dev_check) {
                await member.roles.add(developer);
                added.push(`<@&${developer.id}>`);
            }

            if (br_check) {
                await member.roles.add(staff);
                added.push(`<@&${staff.id}>`);
            }

            return sys_chan.send({
                embeds: [
                    new bot.MessageEmbed({
                        title: 'Gate: user joined',
                        description: `${member.user.tag} has entered the server.`,
                        thumbnail: member.user.displayAvatarURL(),
                        color: bot.config.colors.base,
                        fields: [{
                            name: 'Is Bot',
                            value: `${member.user.bot ? 'true' : 'false'}`,
                            inline: true
                        }, {
                            name: 'Is Staff',
                            value: `true`,
                            inline: true
                        }, {
                            name: 'Auto Roles',
                            value: `${added.join(', ') || 'None'}`,
                            inline: true
                        }]
                    })
                ]
            })
        }
    }
}