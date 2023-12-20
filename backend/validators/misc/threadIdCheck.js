const db = require('../../db')

module.exports = async (value) => {
    const check = await db.query('SELECT COUNT(*) FROM thread WHERE id = ($1)', [value])
    if (check.rows[0].count == 0) {
        throw new Error('thread with this id does not exist')
    }
    return true
}