const Pool = require('pg').Pool

global.pool = new Pool({
    connectionString: process.env.DEVS_PG,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 10000,
    max: 10
})

global.pool.on('drain', global.pool.end.bind(client));

module.exports = global.pool
