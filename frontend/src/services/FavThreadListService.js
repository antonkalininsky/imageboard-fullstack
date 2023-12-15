class FavThreadListService {
    constructor() {
        this.favThreadList = []
        this.trigger = false
    }

    getFavThreadList() {
        return this.favThreadList
    }

    readFavThreadListFromLocalStorage() {
        this.favThreadList = JSON.parse(localStorage.getItem('favourites')) || []
    }

    writeFavThreadListToLocalStorage() {
        localStorage.setItem('favourites', JSON.stringify(this.favThreadList))
    }

    toggleFavThreadListItem(id) {
        const index = this.favThreadList.findIndex((item) => item === id)
        if (index === -1) {
            this.favThreadList.push(id)
        } else {
            this.favThreadList.splice(index, 1)
        }
        this.writeFavThreadListToLocalStorage()
    }

    checkFavThreadListItemById(id) {
        return this.favThreadList.includes(id)
    }

    overwriteFavThread(data) {
        this.favThreadList = data
        this.writeFavThreadListToLocalStorage()
    }

    touchTrigger() {
        this.trigger = !this.trigger
    }
}

export default new FavThreadListService