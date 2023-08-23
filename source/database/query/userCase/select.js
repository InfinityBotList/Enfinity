module.exports = async ({ userId, caseNumber }) => {
    const query = {
        text: 'SELECT * FROM userCase WHERE userId = $1 AND case_number = $2',
        values: [userId, caseNumber]
    }

    await global.pool.query(query)
}
