module.exports = async ({ userId, case_number }) => {
    const query = {
        text: 'DELETE FROM userCase WHERE userId=$1 AND case_number=$2',
        values: [userId, case_number]
    }

    await global.pool.query(query)
}
