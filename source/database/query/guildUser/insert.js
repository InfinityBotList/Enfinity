module.exports = async ({ userId, globalName, displayName, cmdBlacklist }) => {
   const count = await global.pool.query({
	text: 'SELECT COUNT(*) FROM enfinityUser WHERE userId = $1',
        values: [userId]
   })

   if(count?.rows[0]?.count != 0) {
	console.log(`EnfinityUser: row found, updating: ${JSON.stringify(count.rows)}`)
	
	await global.pool.query({
		text: 'UPDATE enfinityUser SET globalName = $1, cmd_blacklist = $2 WHERE userId = $3',
		values: [globalName, cmdBlacklist, userId]
	})

   } else {
   	const query = {
        	text: 'INSERT INTO enfinityUser (userId, globalName, displayName, cmd_blacklist) VALUES ($1, $2, $3, $4)',
        	values: [userId, globalName, displayName, cmdBlacklist]
    	}

    	await global.pool.query(query)
   }
}
