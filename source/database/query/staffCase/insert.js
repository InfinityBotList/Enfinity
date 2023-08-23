module.exports = async ({ userId, guildId, reason, moderator, action, duration, case_number, level, time }) => {
    const query = {
        text: 'INSERT INTO staffCase (userId, guildId, reason, moderator, action, duration, case_number, level, time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        values: [userId, guildId, reason, moderator, action, duration, case_number, level, time]
    }

    await global.pool.query(query)
}
