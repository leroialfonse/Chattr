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
const io = require("socket.io")(server)




// For the static files.
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Set up an object to store user information. 
const users = {}


// On init of a socket, notify the connetion in the console.
io.on('connection', socket => {
    socket.on('new user', userName => {
        // Notify of connection to socket and socket id as name
        users[socket.id] = userName || "User"
        socket.broadcast.emit('user connected', users[socket.id])
        console.log(`${userName} connected!`)
    })
    socket.on('send chat message', message => {
        // Send everyone but the sending socket the message
        socket.broadcast.emit('chat message', { message: message, userName: users[socket.id] })
    })



    // A notification of a user disconnect.
    socket.on('disconnect', () => {
        // tell all users connected to the socket that a certain user has disconnected.
        socket.broadcast.emit('user disconnected', users[socket.id])
        console.log(`...${users[socket.id]} disconnected.`)
        // Remove a user
        delete users[socket.id]
    })

    // Someone is typing
    socket.on(
        'typing', function (data) {
            socket.broadcast.emit('typing', data)
        })
});


// Tell the server that Socekt will connect to which port to listen for requests on
server.listen(PORT, () => {
    console.log(`Listening on port 3000`)
})
