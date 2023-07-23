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
app.use(express.static(__dirname + '/public'))

// Get the index page...
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Set up an object to store user information. 

// On init of a socket, notify the connetion in the console.
io.on('connection', (socket) => {
    // When a new user connects, they are assigned a name in that socket, which will be the id of that socket....
    console.log('A user connected!')

    // socket.on('new user', name => {
    // .... here. define that user's name as the socket id
    // users[socket.id] = name
    // Tell every socket but the sending one who the user is.
    // socket.emit('user connected', name)

    // connect to the socket
    socket.on('chat message', (msg) => {
        // console log the message 
        console.log('message :' + msg)
        //... and send the message to everyone connected.
        io.emit('chat message', msg)
        // socket.on('chat message', msg)
        // Consider changing so that sender does not see the message. Don't think that's very useful, though. 
    })
});

// A notification of a user disconnect.
io.on('disconnect', (socket) => {
    socket.on('disconnect', () => {
        console.log('...a user disconnected.')
    })
});


// Tell the server that Socekt will connect to which port to listen for requests on
server.listen(PORT, () => {
    console.log(`Listening on port 3000`)
})
