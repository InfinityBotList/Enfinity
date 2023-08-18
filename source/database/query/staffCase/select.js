module.exports = async ({ userId, caseNumber }) => {

    const query = {
        text: 'SELECT * FROM staffCase WHERE userId = $1 AND case_number = $2',
        values: [userId, caseNumber]
    }

   await enfinity.pool.query(query);
}