const Pool = require('pg').Pool;

module.exports = enfinity.pool = new Pool({
    connectionString: process.env.PROD_PG,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 10000,
    max: 10
});