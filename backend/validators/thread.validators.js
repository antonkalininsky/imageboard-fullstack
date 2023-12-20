const { param, body } = require('express-validator')
const threadIdCheck = require('./misc/threadIdCheck')
const selectedIdsArrayCheck = require('./misc/selectedIdsArrayCheck')

createValidator = [
    body('content').notEmpty().withMessage('content is required')
]

threadIdValidator = [
    param('id').custom(threadIdCheck)
]

selectedThreadsValidator = [
    body('ids').notEmpty().withMessage('ids is required'),
    body('ids').isArray().withMessage('ids need to be array'),
    body('ids').custom(selectedIdsArrayCheck)
]


module.exports = {
    createValidator,
    threadIdValidator,
    selectedThreadsValidator
}