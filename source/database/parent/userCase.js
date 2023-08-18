const { log } = require('@plugins/logger/client')

module.exports = async () => {
    const userCaseCheck = await global.pool.query(
        'SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = $1)',
        ['usercase']
    )

    if (!userCaseCheck.rows[0].exists) {
        log('[EnfinityDB]: creating table for `userCase`', {
            header: 'DATABASE_CLIENT',
            type: 'start'
        })

        try {
            await global.pool.query(
                `CREATE TABLE IF NOT EXISTS userCase(
                userId TEXT NOT NULL REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
                guildId TEXT NOT NULL,
                reason TEXT NOT NULL DEFAULT 'No reason provided',
                moderator TEXT NOT NULL,
                action TEXT NOT NULL,
                duration INTERVAL NOT NULL DEFAULT interval '10 minutes',
                case_number INTEGER NOT NULL DEFAULT 0,
                time TIMESTAMPTZ NOT NULL DEFAULT NOW()
    
            )`
            )

            return log('[EnfinityDB]: table `userCase` created successfully!', {
                header: 'DATABASE_CLIENT',
                type: 'ready'
            })
        } catch (e) {
            await log('[EnfinityDB]: failed to create table for `userCase`', {
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
