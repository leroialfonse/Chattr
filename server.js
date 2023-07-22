// Go get express and use 'app' to handle functions...
const express = require("express");
const app = express()

// Define the port.
const PORT = 3000

// Use http for express to work with server.
const http = require('http')

// Set up the server to use http.
const server = http.createServer(app);

// Give the server access to socket.io.
const { Server } = require("socket.io")

// Setting up socket.
const io = new Server(server)




// For the static files.
app.use(express.static(__dirname + '/public'))

// Get the index page...
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


// On init of a socket, notify the connetion in the console.
io.on('connection', function (socket) {
    console.log('A user connected!')
    // A notification of a user disconnect.
    // socket.once('disconnect', () => {
    //     console.log('...a user disconnected.')
    // })

    io.on('connection', function (socket) {
        socket.on('chat message', (msg) => {
            // console log the message 
            console.log('chat message: ' + msg)
            //... and send the message to everyone connected.
            // io.emit('chat message', msg)
            // Or, send it to everyone except an emitting socket with socket.broadcast.emit
            socket.broadcast.emit('chat message', msg)
        })
    })
});


// Tell the server that Socekt will connect to which port to listen for requests on
server.listen(PORT, () => {
    console.log(`Listening on port 3000`)
})
