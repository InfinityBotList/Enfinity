module.exports = async ({ userId }) => {
    await global.pool.query(`SELECT * FROM enfinityUser WHERE userId='${userId}'`)
}
