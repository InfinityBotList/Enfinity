module.exports = async () => {
    await global.pool.query('DROP TABLE enfinityUser;')
}
