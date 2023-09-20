// // Go get express and use 'app' to handle functions...
// const express = require("express");
// const app = express();

// // Set up the server to use http.
// const server = require('http').Server(app)

// // Setting up socket.
// const io = require("socket.io")(server)

// // Define the port.
// const PORT = process.env.PORT || 4040

// // Use http for express to work with server.
// const http = require('http')

// // Define a view engine and set it to use EJS
// app.set('views', './views')
// app.set('view engine', 'ejs')


// // For the static files.
// app.use(express.static('public'))


// // Be able to accept url params
// app.use(express.urlencoded({ extended: true }))


// // Define the rooms object so that you can call/use different rooms.
// const rooms = {}

// // Route to the index page, and pass the render engine all of the rooms, too.
// app.get('/', (req, res) => {
//     res.render('index', { rooms: rooms })
// })

// // // Get a route for the rooms.
// app.post('/room', (req, res) => {
//     // Check that a room is not being assigned the same name as another room. If it is, redirect to the index.
//     if (rooms[req.body.room] != null) {
//         return res.redirect('/')
//     }
//     // Which room are we looking for?
//     rooms[req.body.room] = { users: {} }
//     // Direct the user to the new room after selection.
//     res.redirect(req.body.room)
//     // Send a message that a room was created...

//     io.emit('New room created!', req.body.room)
// })




// // Get a differnt room, with 'room' as a param. SO, a user can select a room to go into.
// app.get('/:room', (req, res) => {
//     // redirect a user back to home if a room name supplied doesn't exist.
//     if (rooms[req.params.room] == null) {
//         return res.redirect('/')
//     }

//     res.render('room', { roomName: req.params.room })
// })

// // Set up an object to store user information. 
// // Won't need this object once I have rooms set up, because I only want to use it inside of rooms.
// const users = {}


// // On init of a socket, notify the connetion in the console.
// io.on('connection', socket => {


//     socket.on('new-user', (room, name) => {
//         // Connects the socket to the room created 
//         socket.join(room)

//         // Sends users to the specific room.
//         // Notify of connection to socket and socket id as name
//         rooms[room].users[socket.id] = name
//         socket.to(room).emit('user connected', name)
//         console.log(`${name} connected!`)
//     })


//     // Original.
//     // socket.on('send chat message', (room, message) => {
//     // Send everyone but the sending socket the message, ut only to users in this current room.
//     //     socket.to(room).broadcast('chat message', { message: message, name: rooms[room].users[socket.id] })
//     // })

//     // Trying

//     socket.on('send chat message', (room, message) => {
//         socket.to(room).emit('chat message', { message: message, name: rooms[room].users[socket.id] });
//     })


//     // A notification of a user disconnect.
//     socket.on('disconnect', () => {
//         // tell all users connected to the socket that a certain user has disconnected.
//         getUserRooms(socket).forEach(room => {
//             socket.to(room).emit('user disconnected', rooms[room].users[socket.id])
//             console.log(`...${users[socket.id]} disconnected.`)
//             // Remove a user
//             delete rooms[room].users[socket.id]
//         })

//     })
// })

// // Someone is typing
// // socket.on(
// //     'typing', function (data, name) {
// //         socket.broadcast.emit('typing', data)
// //     })

// function getUserRooms(socket) {
//     return Object.entries(rooms).reduce((names, [name, room]) => {
//         if (room.users[socket.id] != null) names.push(name)
//         return names
//     }, [])
// }
// // Tell the server that Socekt will connect to which port to listen for requests on
// server.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`)
// })





const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const cors = require('cors')
const PORT = 8500



app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// A variable that is an empty object that stores the rooms.
const rooms = {}


app.get('/', (req, res) => {
    // want to render the indexpage, and pass in all the chat rooms available/existing. This will pass to the view.
    res.render('index', { rooms: rooms })
})

app.post('/room', (req, res) => {
    if (rooms[req.body.room] != null) {
        return res.redirect('/')
    }

    // respond to the room form. 
    rooms[req.body.room] = { users: {} }
    res.redirect(req.body.room)

    // Send a message that the new room was created. 
    io.emit('room-created', req.body.room)
})

// Routing into a specific room. 
app.get('/:room', (req, res) => {
    if (rooms[req.params.room] == null) {
        return res.redirect('/')
    }
    // renders the room based on the req param of the name of the room the user selects.
    res.render('room', { roomName: req.params.room })
})


server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})





io.on('connection', socket => {
    // catch the new user emit from the client side.
    socket.on('new-user', (room, name) => {
        socket.join(room)
        //  Want the key of the users object to be the id of the socket
        rooms[room].users[socket.id] = name
        // Emit a user connected message.
        socket.to(room).broadcast.emit('user-connected', name)
    })

    socket.on('send-chat-message', (room, message) => {
        // Emit the message itself, and the user, by broadcasting the message and name as an object. The first element will be the message, the second will be the user's name.
        socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
    })

    socket.on('disconnect', () => {

        getUserRooms(socket).forEach(room => {
            socket.broadcast.emit('user-disconnected', rooms[room].users[socket.id])
            delete rooms[room].users[socket.id]
        })

    })

})


function getUserRooms(socket) {
    return Object.entries(rooms).reduce((names, [name, room]) => {
        if (room.users[socket.id] != null) names.push(name)
        return names
    }, [])
}