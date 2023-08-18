/**
 * THIS DEFINES IF THE CLIENT SHOULD RUN IN
 * DEVELOPMENT OR PRODUCTION MODE. IF SET TO
 * "true" THE BOT WILL USE THE PRODUCTION BASED
 * CONFIG VALUES SUCH AS: "PROD_TOKEN" IF SET TO
 * FALSE THE BOT WILL USE THE DEVELOPMENT BASED
 * CONFIG VALUES SUCH AS: "DEV_TOKEN".
 */
const dev_mode = true

module.exports = {
    client: {
        id: dev_mode ? process.env.DEV_ID : process.env.PROD_ID,
        token: dev_mode ? process.env.DEV_TOKEN : process.env.PROD_TOKEN,
        commands: {
            prefix: dev_mode ? '>>' : '<<',
            timeout: '10000',
            whitelist: false
        }
    },
    guilds: {
        main: '758641373074423808',
        staff: '870950609291972618',
        test: '870952645811134475'
    },
    channels: {
        main_audits: '762077915499593738',
        main_modlogs: '911907978926493716',
        staff_audits: '870950610852266006',
        staff_modlogs: '870950610852266006',
        internal_case: '1128467438716067850'
    },
    base_roles: {
        unverifed_bots: '815516926780112956',
        verified_bots: '758652296459976715',
        certified_bots: '759468236999491594',
        certified_devs: '759468303344992266',
        bot_developers: '758756147313246209'
    },
    staff_roles: {
        owner: '768197049978978321',
        manager: '911918122359988244',
        head_dev: '869527375925370891',
        web_developer: '815854927719956490',
        lib_developer: '942760891710062602',
        head_staff: '869527149118373928',
        staff_manager: '815372072145649674',
        website_mods: '762371586434793472',
        sr_reviewer: '1026937197212991568',
        jr_reviewer: '1037085701415641170',
        support_team: '805761849601294336'
    },
    colors: {
        base: '#8A6AFD',
        error: '#FF0000',
        success: '#2BBF00',
        warning: '#D4F30E'
    }
}
