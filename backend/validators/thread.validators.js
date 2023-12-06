const { param, body } = require('express-validator')
const threadIdCheck = require('./misc/threadIdCheck')

createValidator = [
    body('content').notEmpty().withMessage('content is required')
]

threadIdValidator = [
    param('id').custom(threadIdCheck)
]

module.exports = {
    createValidator,
    threadIdValidator
}