// // Tell the app what to use when it sees "socket".
const socket = io('http://localhost:4040');

// Create variables to affect the form and input client side.
// The chat messages
const messages = document.getElementById('messages')
// The input where users interract with the app...
const form = document.getElementById('form')
// ...and the input where they type messages.
const input = document.getElementById('input')
// Where the 'user is typing' message lives.
let typing = document.getElementById('typing')
// Address the room conatiner.
const roomContainer = document.getElementById('room-container')



// Check to see if the user has already entered a name.
if (form != null) {
    // Supply the user's name.
    const name = prompt('what is your name?')

    // Alert that the user has joined
    appendMessage('You joined the chat!')
    console.log(roomName)
    socket.emit('new-user', roomName, name)

    // An event listener to respond the teh send button being clicked to send a message.
    form.addEventListener('submit', e => {
        // Stops the input button from inputting immediately on page load
        e.preventDefault()
        // Pull the message from the input
        const message = input.value
        // Put that value into the chat.
        appendMessage(`You: ${message}`)

        // Show that message to all connected users
        // This displays the message in my screen for now...
        socket.broadcast.emit("send-chat-message", roomName,
            message

            // This doesn't yet display anything.
            // socket.emit("send-chat-message", roomName,
            // message
        )
        console.log(name, message)

        //  clear out the input after each submit fires.
        input.value = ''
        // window.scrollTo(0, 9999)
    })


}



// Alert when a room is connected, will take the name of the room as a param.
socket.on('room-created', room => {

    // will create a room using this format. 
    // <div> <%= room %> </div>
    // <a href="/<%= room %>">Join</a>

    // Some imperative JS to create a room, call out that it's been created, and add notes
    const roomElement = document.createElement('div')

    // Trying to welcome to the specific room.
    // roomElement.innerText = `Welcome to the ${room} room!`

    // Just display the room name 
    roomElement.innerText = room

    //  A link to the created room.
    const roomLink = document.createElement('a')
    //  Sends a user to that room.
    roomLink.href = `/${room}`
    roomLink.innerText = 'Join'

    // Add this code to the page
    roomContainer.append(roomElement)
    roomContainer.append(roomLink)
})




// When a chat message event fires, client side captures, 
socket.on('chat-message', data => {
    // ... and creates a li element in the ul that displays that message..
    appendMessage(`${data.name}: ${data.message}`)
    // and console.logs it 
    console.log(`${data.name}:  ${data.message}`)
    // Clear the typing element when a user finishes typing.
    typing.innerHTML = ''
    // continue scrolling the screen to keep the chat in focus. 
    window.scrollTo(0, document.body.scrollHeight);
})



// Alert the chat when a user connects, and who they are 
socket.on('user-connected', name => {
    console.log(`${name} connected!`)
    appendMessage(`${name} connected!`)
})

// And when they disconnect.
socket.on('user-disconnected', name => {
    appendMessage(`...${name} disconnected.`)
})

// Alert when someone is typing
socket.on('typing', function (name) {
    // Display the user typing message in the "typing " element.
    typing.innerHTML = `<p>${name} is typing</p>`

})


// Will listen to the form for keypress, and pop the user is typing message
input.addEventListener('keypress', function (name) {
    socket.emit('typing', name)
})

// create the message bubbles that contain messages. 
function appendMessage(message) {
    const messageElement = document.createElement('li')
    messageElement.innerText = message
    messages.append(messageElement)
}
