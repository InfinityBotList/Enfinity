module.exports = {
    name: 'error',

    async execute(err, enfinity) {
        await enfinity.logger('[Client]: error event triggered, see below for details!', {
            header: 'CLIENT_ERROR_EVENT',
            type: 'error'
        })

        return enfinity.logger(err.stack, {
            header: 'CLIENT_ERROR_EVENT',
            type: 'error'
        })
    }
}
