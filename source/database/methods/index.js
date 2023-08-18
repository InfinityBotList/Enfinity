module.exports = {
    init: require('../client/index'),
    enfinityUser: {
        upsert: require('../query/guildUser/insert'),
        select: require('../query/guildUser/select'),
    },
    staffCase: {
        upsert: require('../query/staffCase/insert'),
        select: require('../query/staffCase/select')
    }
}