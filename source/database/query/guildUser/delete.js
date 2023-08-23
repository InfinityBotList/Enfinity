module.exports = async ({ userId }) => {
    const query = {
        text: 'DELETE FROM enfinityUser WHERE userId=$1',
        values: [userId]
    }

    await global.pool.query(query)
}
