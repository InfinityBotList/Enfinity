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
    database: {
        url: devMode ? process.env.DEV_PG : process.env.PROD_PG
    },
    channels: {
        main_audits: '762077915499593738',
        main_modlogs: '911907978926493716',
        staff_audits: '870950610852266006',
        staff_modlogs: '870950610852266006',
        internal_case: '1128467438716067850'
    },
    base_roles: {
        unverifed_bots: '',
        verified_bots: '',
        certified_devs: '',
        bot_developers: ''
    },
    staff_roles: {
        manager: '911918122359988244',
        head_dev: '869527375925370891',
        developer: '815854927719956490',
        head_staff: '869527149118373928',
        staff_manager: '815372072145649674',
        website_mods: '762371586434793472',
        sr_reviewer: '1026937197212991568',
        jr_reviewer: '1037085701415641170'
    }
}