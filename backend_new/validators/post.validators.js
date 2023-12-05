const { param, body } = require('express-validator')
const db = require('../db')

createValidator = [
    body('content').notEmpty().withMessage('content is required'),
    body('threadId').notEmpty().withMessage('threadId is required'),
    body('threadId').custom(async (value) => {
        const check = await db.query('SELECT COUNT(*) FROM thread WHERE id = ($1)', [value])
        if (check.rows[0].count == 0) {
            throw new Error()
        }
    }).withMessage('thread with this id does not exist')
]

postIdValidator = [
    param('id').custom(async (value) => {
        const check = await db.query('SELECT COUNT(*) FROM post WHERE id = ($1)', [value])
        if (check.rows[0].count == 0) {
            throw new Error()
        }
    }).withMessage('post with this id does not exist')
]

module.exports = {
    createValidator,
    postIdValidator
}