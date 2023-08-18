module.exports = {
    name: 'disconnect',

    async execute(message, enfinity) {
        await enfinity.logger('[Client]: disconnect event triggered, see below for details!', {
            header: 'CLIENT_DISCONNECT',
            type: 'warning'
        })

        return enfinity.logger(message, {
            header: 'CLIENT_DISCONNECT',
            type: 'warning'
        })
    }
}
