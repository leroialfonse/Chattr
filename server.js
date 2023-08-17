// Go get express and use 'app' to handle functions...
const express = require("express");
const app = express();


// Set up the server to use http.
const server = require('http').Server(app)

// Setting up socket.
const io = require("socket.io")(server)

// Define the port.
const PORT = process.env.PORT || 3000

// Use http for express to work with server.
const http = require('http')

// Define a view engine and set it to use EJS
app.set('views', './views')
app.set('view engine', 'ejs')


// For the static files.
app.use(express.static('public'))


// Be able to accept url params]
app.use(express.urlencoded({ extended: true }))


// Define the rooms object so that you can call/use different rooms.
const rooms = {}

// Route to the index page, and pass the render engine all of the rooms, too.
app.get('/', (req, res) => {
    res.render('index', { rooms: rooms })
})

// Get a route for the rooms.
app.post('/room', (req, res) => {
    // Check that a room is not being assigned the same name as another room. If it is, redirect to the index.
    if (rooms[req.body.room] != null) {
        return res.redirect('/')
    }
    // Which room are we looking for?
    rooms[req.body.room] = { users: {} }
    // Direct teh user to the new room after selection.
    res.redirect(req.body.room)
    // Send a message that a room was created...
    // ///////////////////////////////////

    io.emit('room created.', req.body.room)


    // ///////////////
})




// Get a differnt room
app.get('/:room', (req, res) => {
    // redirect a user back to home if a room name supplied doesn't exist.
    if (rooms[req.params.room] == null) {
        res.redirect('/')
    }




    res.render('room', { roomName: req.params.room })
})

// Set up an object to store user information. 
// Won't need this object once I have rooms set up, because I only want to use it inside of rooms.
// const users = {}


// On init of a socket, notify the connetion in the console.
io.on('connection', socket => {
    socket.on('new user', (userName, room) => {
        // Sends users to the specific room.
        socket.join(room)
        // Notify of connection to socket and socket id as name
        rooms[room].users[socket.id] = userName || "User"
        socket.to(room).broadcast.emit('user connected', users[socket.id])
        console.log(`${userName} connected!`)
    })
    socket.on('send chat message', (message, room) => {
        // Send everyone but the sending socket the message, ut only to users in this current room.
        socket.to(room).broadcast.emit('chat message', { message: message, userName: rooms[room].users[socket.id] })
    })



    // A notification of a user disconnect.
    socket.on('disconnect', () => {
        // tell all users connected to the socket that a certain user has disconnected.
        getUserRooms(socket).forEach(room => {
            socket.broadcast.emit('user disconnected', rooms[room].users[socket.id])
            console.log(`...${users[socket.id]} disconnected.`)
            // Remove a user
            delete rooms[room].users[socket.id]
        })

    })

    // Someone is typing
    socket.on(
        'typing', function (data) {
            socket.broadcast.emit('typing', data)
        })
});

function getUserRooms(socket) {
    return Object.entries(rooms).reduce((names, [name, room]) => {
        if (room.users[socket.id] != null) names.push(name)
        return names
    }, [])
}
// Tell the server that Socekt will connect to which port to listen for requests on
server.listen(3000, () => {
    console.log(`Listening on port 3000`)
})
