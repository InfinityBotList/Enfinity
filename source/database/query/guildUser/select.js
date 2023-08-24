module.exports = async ({ userId }) => {
    const res = await global.pool.query({
	text: 'SELECT * FROM enfinityUser WHERE userId = $1',
	values: [userId],
    })

    if(res?.rows?.length == 0) {
	return null
    }

    return res.rows[0]
}
