const Pool = require('pg').Pool

global.pool = new Pool({
    connectionString: process.env.PROD_PG,
})

global.pool.on('drain', global.pool.end.bind(global.pool));

module.exports = global.pool
