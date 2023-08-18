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
                `CREATE TABLE IF NOT EXISTS enfinityUser(
                    userId TEXT NOT NULL REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
                    userName TEXT NOT NULL,
                    cmdBlacklist BOOLEAN NOT NULL DEFAULT FALSE
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
