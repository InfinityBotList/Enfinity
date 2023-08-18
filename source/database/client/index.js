module.exports = async (skip) => {

    process.env.PGHOST === 'localhost' 
    ? require('../pool/devs') 
    : require('../pool/prod');

    if (!skip) {
        
        try {

            await require('../parent/guildUser')();
            await require('../parent/staffCase')();
            await require('../parent/userCase')();

            log ('[EnfinityDB]: tables initialized successfully', {
                header: 'DATABASE_TABLE_INIT',
                type: 'ready'
            });
        
        } catch (e) {

            await log('[EnfinityDB]: failed to initialize tables', {
                header: 'DATABASE_TABLE_INIT',
                type: 'warning'
            });

            return log(e.stack, {
                header: 'DATABASE_TABLE_INIT',
                type: 'error'
            })
        }
    }
}