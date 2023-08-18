module.exports = async ({ userId, guildId, reason, moderator, action, duration, case_number, time }) => {

    const query = {
        text: 'INSERT INTO staffCase (userId, guildId, reason, moderator, action, duration, case_number, time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        values: [userId, guildId, reason, moderator, action, duration, case_number, time]
    }

   await enfinity.pool.query(query);
}