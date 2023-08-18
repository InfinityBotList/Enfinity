module.exports = {
    name: 'reconnect',

    async execute(enfinity) {
        enfinity.logger('[Client]: successfully reconnected', {
            header: 'CLIENT_CONNECTION',
            type: 'ready'
        })
    }
}
