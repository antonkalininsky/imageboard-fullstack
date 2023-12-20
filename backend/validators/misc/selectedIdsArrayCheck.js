module.exports = (value) => {
    if (value.length === 0) {
        throw new Error('ids must not be empty')
    }
    if (!value.every((item) => typeof item === 'number')) {
        throw new Error('ids must contain numbers only')
    }
    return true
}