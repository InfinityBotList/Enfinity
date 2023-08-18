module.exports = async ({ userId, userName, cmdBlacklist }) => {

    const query = {
        text: 'INSERT INTO enfinityUser(userId, userName, cmdBlacklist) VALUES($1, $2, $3)',
        values: [userId, userName, cmdBlacklist]
    }

   await enfinity.pool.query(query);
}