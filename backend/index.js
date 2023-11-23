
const http = require('http')

const PORT = process.env.PORT || 5000

const server = http.createServer((req, res) => {
    // заголовок респонса, код, контент и кодировка
    res.writeHead(200, {
        'Content-type': 'text/html; charset=utf-8'
    })
    // возвращаемое юзеру сообщение
    res.end('server is working')
})

server.listen(PORT, () => console.log(`server started on PORT ${PORT}`))