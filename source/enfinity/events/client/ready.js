const database = require('@database/methods/index');

module.exports = {
    name: 'ready',
    once: true,

    async execute(enfinity) {

        await database.init()
        .then(() => {
            enfinity.logger('[Client]: database connection established', {
                header: 'CLIENT_DATABASE_STARTUP',
                type: 'ready'
            })
        })
        .catch((e) => {
            enfinity.logger(`[Client]: database connection failed: ${e.stack}`, {
                header: 'CLIENT_DATABASE_FAILURE',
                type: 'error'
            })
        });

        await enfinity.logger('[Client]: connecting to the discord api', {
            header: 'CLIENT_STARTUP',
            type: 'start'
        });

        try {

            await enfinity.presence.setClientPresence(enfinity);

            return enfinity.logger('[Client]: discord api connection established successfully', {
                header: 'CLIENT_STARTUP_SUCCESS',
                type: 'ready'
            });
        } catch (e) {

            return enfinity.logger(e.stack, {
                header: 'CLIENT_STARTUP_FAILED',
                type: 'error'
            })
        }
    }
}