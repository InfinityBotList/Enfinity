const database = require('@database/methods/index')

module.exports = {
    name: 'ready',
    once: true,

    async execute(enfinity) {
        try {
            await database.init()

            enfinity.logger('[Client]: database connection established', {
                header: 'CLIENT_DB_STARTUP',
                type: 'ready'
            })
        } catch (e) {
            enfinity.logger(`[Client]: database connection error: ${e.stack}`, {
                header: 'CLIENT_DB_STARTUP_FAILED',
                type: 'error'
            })
        }

        await enfinity.logger('[Client]: connecting to the discord api', {
            header: 'CLIENT_STARTUP',
            type: 'start'
        })

        try {
            await enfinity.rpc.setClientPresence(enfinity)

            return enfinity.logger('[Client]: discord api connection established successfully', {
                header: 'CLIENT_STARTUP_SUCCESS',
                type: 'ready'
            })
        } catch (e) {
            return enfinity.logger(e.stack, {
                header: 'CLIENT_STARTUP_FAILED',
                type: 'error'
            })
        }
    }
}
