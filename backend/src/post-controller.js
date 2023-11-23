const getPosts = (req, res) => {
    const data = {
        hello: 'world'
    }
    res.send(data)
}

module.exports = {
    getPosts
}