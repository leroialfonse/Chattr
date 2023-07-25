// // Tell the app what to use when it sees "socket".
var socket = io();

// Create variables to affect the form and input client side.
// The chat messages
var messages = document.getElementById('messages')
// The input where users interract with the app...
var form = document.getElementById('form')
// ...and the input where they type messages.
var input = document.getElementById('input')
// Where the 'user is typing' message lives.
typing = document.getElementById('typing')


// Supply the user's name.
const userName = prompt('what is your name?')

// Alert that the user has joined
appendMessage('You joined the chat!')
socket.emit('new user', userName)



// When a chat message event fires, client side captures, 
socket.on('chat message', (data) => {
    // ... and creates a li element in the ul that displays that message..
    appendMessage(`${data.userName}: ${data.message}`)
    // and console.logs it 
    console.log(`${data.userName}: ` + `${data.message}`)
    // Clear the typing element when a user finishes typing.
    typing.innerHTML = ''
    // continue scrolling the screen to keep the chat in focus. 
    window.scrollTo(0, document.body.scrollHeight);
})

// Alert when someone is typing
socket.on('typing', function (data) {
    // Display the user typing message in the "typing " element.
    typing.innerHTML = `<p>${data} is typing...</p>`

})



// Alert the chat when a user connects, and who they are 
socket.on('user connected', userName => {
    appendMessage(`${userName} connected!`)
})

// And when they disconnect.
socket.on('user disconnected', userName => {
    console.log(userName)
    appendMessage(`...${userName} disconnected.`)
})

// An event listener to respond the teh send button being clicked to send a message.
form.addEventListener('submit', function (e) {
    // Stops the input button from inputting immediately on page load
    e.preventDefault()
    // Pull the message from the input
    const message = input.value
    // Put that value into the chat.
    appendMessage(`You: ${message}`)

    // Show that message to all connected users
    socket.emit("send chat message",
        message
    )
    //  clear out the input after each submit fires.
    input.value = ''
    window.scrollTo(0, 9999)
})

// Will listen to the form for keypress, and pop the user is typing message
form.addEventListener('keypress', function () {
    socket.emit('typing', userName)
})

// create the message bubbles that contain messages. 
function appendMessage(message) {
    const messageElement = document.createElement('li')
    messageElement.innerText = message
    messages.append(messageElement)
}
