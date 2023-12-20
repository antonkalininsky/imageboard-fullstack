import { v4 as uuidv4, validate as uuidValidate, validate } from 'uuid'

class UserIdentificator {
    getUserId() {
        const currentKey = localStorage.getItem('userId')
        if (!currentKey || !validate(currentKey)) {
            const newKey = uuidv4()
            localStorage.setItem('userId', newKey)
            return newKey
        }
        return currentKey
    }
}

export default new UserIdentificator()