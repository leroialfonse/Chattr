// Go get express and use 'app' to handle functions...
const express = require('express');
// const app = express()
const socket = require("socekt.io")

// Use http protocols.
const http = require('http')

// Set up the server to use http.
// const server = http.createServer(app);

// Give the server socket.io.
const { Server } = require("socket.io")

// const io = new Server(server)



// Get the index page...
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Active users notification
const activeUsers = new Set();

// Trigger  init of a socket, notify the connetion in the console.
io.on('connection', (socket) => {
    console.log('Now connected!')

    // Notify when a new user joins
    socket.on("New User", (msg) => {
        socket.userId = msg
        activeUsers.add(msg)
        io.emit("New user", [...activeUsers])
    })

    // Also notify in the console about disconnects.
    socket.on('disconnect', () => {
        activeUsers.delete(socket.userId);
        console.log("A user has disconnected.")

    })

    // original chat message data....
    // socket.on('chat message', (msg) => {
    //     console.log('message :' + msg);
    //     io.emit('message :' + msg)

    // })


    socket.on('chat message', function (msg) {
        console.log('message :' + msg);
        io.emit('message :' + msg)

    })


    socket.on('typing', function (data) {
        socket.broadcast.emit('typing...', data)
    })
});

// tells a socket what a message is and how to display it
// io.on('connection', (socket) => {
// socket.on('chat message', (msg) => {
//     console.log('message :' + msg);
//     socket.emit(msg)

// })
// })

// sends 'hi' to all users

// io.on('connection', (socket) => {
//     socket.broadcast.emit('hi')
// })


// For the css. 
app.use(express.static(__dirname + '/public'))

// Tell the server that Socekt will connect to which port to listen for requests on
server.listen(3000, () => {
    console.log(`Listening on port 3000`)
})