// // // Tell the app what to use when it sees "socket".
// // const socket = io('http://localhost:4040');

// // Create variables to affect the form and input client side.
// // The chat messages
// const messages = document.getElementById('messages')
// // The input where users interract with the app...
// const form = document.getElementById('form')
// // ...and the input where they type messages.
// const input = document.getElementById('input')
// // Where the 'user is typing' message lives.
// let typingBlock = document.getElementById('typingBlock')
// // Address the room conatiner.
// const roomContainer = document.getElementById('room-container')



// // Check to see if the user has already entered a name.
// if (form != null) {
//     // Supply the user's name.
//     const name = prompt('what is your name?')

//     // Alert that the user has joined
//     appendMessage('You joined the chat!')
//     console.log(roomName)
//     socket.emit('new-user', roomName, name)

//     // An event listener to respond the teh send button being clicked to send a message.
//     form.addEventListener('submit', e => {
//         // Stops the input button from inputting immediately on page load
//         e.preventDefault()
//         // Pull the message from the input
//         const message = input.value
//         // Put that value into the chat.
//         appendMessage(`You: ${message}`)

//         // Show that message to all connected users
//         // This displays the message in my screen for now...
//         socket.emit("send-chat-message", roomName, message)
//         console.log(name, message)

//         //  clear out the input after each submit fires.
//         input.value = ''
//         window.scrollTo(0, 9999)
//     })
// }



// // Alert when a room is connected, will take the name of the room as a param.
// socket.on('room-created', room => {

//     // will create a room using this format. 
//     // <div> <%= room %> </div>
//     // <a href="/<%= room %>">Join</a>

//     const roomElement = document.createElement('div')

//     // Trying to welcome to the specific room.
//     // roomElement.innerText = `Welcome to the ${room} room!`

//     // Just display the room name 
//     roomElement.innerText = room

//     //  A link to the created room.
//     const roomLink = document.createElement('a')
//     //  Sends a user to that room.
//     roomLink.href = `/${room}`
//     roomLink.innerText = 'Join'

//     // Add this code to the page
//     roomContainer.append(roomElement)
//     roomContainer.append(roomLink)
// })




// // When a chat message event fires, client side captures, 
// socket.on('chat-message', data => {
//     // ... and creates a li element in the ul that displays that message..
//     appendMessage(`${data.name}: ${data.message}`)
//     // and console.logs it 
//     console.log(`${data.name}:  ${data.message}`)
//     // Clear the typing element when a user finishes typing.
//     typing.innerHTML = ''
//     // continue scrolling the screen to keep the chat in focus. Still considering that part. 
//     // window.scrollTo(0, document.body.scrollHeight);
// })

// // // Alert when someone is typing
// // socket.on('typing', function (data) {
// //     // Display the user typing message in the "typing " element.
// //     typing.innerHTML = '<p>' + data + ' is typing...</p>'

// // })


// // Alert the chat when a user connects, and who they are 
// socket.on('user-connected', name => {
//     console.log(`${name} connected!`)
//     appendMessage(`${name} connected!`)
// })

// // And when they disconnect.
// socket.on('user-disconnected', name => {
//     appendMessage(`...${name} disconnected.`)
// })




// // Will listen to the form for keypress, and pop the user is typing message
// // input.addEventListener('keypress', function (name) {
// //     socket.emit('typing', name)
// // })

// // create the message bubbles that contain messages. 
// function appendMessage(message) {
//     const messageElement = document.createElement('div')
//     messageElement.innerText = message
//     messages.append(messageElement)
// }


const socket = io('http://localhost:8500')

const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')

if (messageForm != null) {
    const name = prompt('What is your name??')
    appendMessage('You joined the chat!')
    // Sends this message to the server, and emits whenever a new user is signed up.
    socket.emit('new-user', roomName, name)

    messageForm.addEventListener('submit', e => {
        e.preventDefault()
        const message = messageInput.value
        // call the append message event inside of the event to display the message on screen.

        appendMessage(`You: ${message}`)

        socket.emit('send-chat-message', roomName, message)

        messageInput.value = ''
    })
}

socket.on('room-created', room => {
    const roomElement = document.createElement('div')
    roomElement.innerText = room
    const roomLink = document.createElement('a')
    roomLink.href = `/${room}`
    roomLink.innerText = 'join'
    roomContainer.append(roomElement)
    roomContainer.append(roomLink)
})

socket.on('chat-message', data => {
    // Appends our message element with the user's name and their message.
    appendMessage(`${data.name}: ${data.message}`)
})


// Alerts a user has connected by their name in the chat window.
socket.on('user-connected', name => {
    appendMessage(`${name} has connected! `)
})

// Alerts when a user disconnects.
socket.on('user-disconnected', name => {
    appendMessage(`....${name} disconnected.`)

})





function appendMessage(message) {

    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(message)
}