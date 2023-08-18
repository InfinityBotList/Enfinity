module.exports = async ({ userId }) => {

    const query = {
        text: 'SELECT * FROM enfinityUser WHERE userId = $1',
        values: [userId]
    }

   await enfinity.pool.query(query);
}