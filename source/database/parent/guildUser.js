const { log } = require('@plugins/logger/client')

module.exports = async () => {
    const enfinityUserCheck = await global.pool.query(
        'SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = $1)',
        ['enfinityuser']
    )

    if (!enfinityUserCheck.rows[0].exists) {
        log('[EnfinityDB]: creating table for `enfinityUser`', {
            header: 'DATABASE_CLIENT',
            type: 'start'
        })

        try {
            await global.pool.query(
                `CREATE TABLE enfinityUser(
                    userId TEXT NOT NULL PRIMARY KEY REFERENCES users(user_id),
                    globalName TEXT NOT NULL,
                    displayName TEXT NOT NULL,
                    cmd_blacklist BOOLEAN NOT NULL DEFAULT FALSE
                )`
            )

            return log('[EnfinityDB]: table `enfinityUser` created successfully!', {
                header: 'DATABASE_CLIENT',
                type: 'ready'
            })
        } catch (e) {
            await log('[EnfinityDB]: failed to create table for `enfinityUser`', {
                header: 'DATABASE_CLIENT',
                type: 'warning'
            })

            return log(e.stack, {
                header: 'DATABASE_CLIENT_ERROR',
                type: 'error'
            })
        }
    }
}
