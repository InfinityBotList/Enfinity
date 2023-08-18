const { log } = require('@plugins/logger/client');

module.exports = async () => {

    log('[EnfinityDB]: creating table for `enfinityUser`', {
        header: 'DATABASE_CLIENT',
        type: 'start'
    });

    await enfinity.pool.query(
        `CREATE TABLE IF NOT EXISTS userCase(
            userId TEXT NOT NULL REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
            guildId TEXT NOT NULL,
            reason TEXT NOT NULL DEFAULT 'No reason provided',
            moderator TEXT NOT NULL,
            action TEXT NOT NULL,
            duration INTERVAL NOT NULL DEFAULT interval '10 minutes',
            case_number NUMBER NOT NULL DEFAULT 0,
            time TIMESTAMPTZ NOT NULL DEFAULT NOW()

        )`
    )
    .then(() => {

        log('[EnfinityDB]: table `enfinityUser` created successfully!', {
            header: 'DATABASE_CLIENT', 
            type: 'ready'
        })
    })
    .catch(async (e) => {

        await log('[EnfinityDB]: failed to create table for `enfinityUser`', {
            header: 'DATABASE_CLIENT',
            type: 'warning'
        });

        return log(e.stack, {
            header: 'DATABASE_CLIENT_ERROR',
            type: 'error'
        })
    })
}