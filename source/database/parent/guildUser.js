const { log } = require('@plugins/logger/client');

module.exports = async () => {

    log('[EnfinityDB]: creating table for `enfinityUser`', {
        header: 'DATABASE_CLIENT',
        type: 'start'
    });

    await enfinity.pool.query(
        `CREATE TABLE IF NOT EXISTS enfinityUser(
            userId TEXT NOT NULL REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
            userName TEXT NOT NULL,
            cmdBlacklist BOOLEAN NOT NULL DEFAULT FALSE,
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