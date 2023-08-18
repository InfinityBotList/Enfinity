const { log } = require('@plugins/logger/client')

module.exports = async skip => {
    process.env.PGHOST === 'localhost' ? require('../pool/devs') : require('../pool/prod')

    if (!skip) {
        try {
            await require('../parent/guildUser')()
            await require('../parent/staffCase')()
            await require('../parent/userCase')()
        } catch (e) {
            await log('[EnfinityDB]: failed to initialize tables', {
                header: 'DATABASE_TABLE_INIT',
                type: 'warning'
            })

            return log(e.stack, {
                header: 'DATABASE_TABLE_INIT',
                type: 'error'
            })
        }
    }
}
