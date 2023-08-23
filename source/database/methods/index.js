module.exports = {
    init: require('../client/index'),
    enfinityUser: {
        upsert: require('../query/guildUser/insert'),
        select: require('../query/guildUser/select'),
        delete: require('../query/guildUser/delete'),
        drop: require('../query/guildUser/drop')
    },
    staffCase: {
        upsert: require('../query/staffCase/insert'),
        select: require('../query/staffCase/select'),
        delete: require('../query/staffCase/delete')
    },
    userCase: {
        upsert: require('../query/userCase/insert'),
        select: require('../query/userCase/select'),
        delete: require('../query/userCase/delete')
    }
}
