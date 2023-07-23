// // Tell the app what to use when it sees "socket".
var socket = io();

// Create variables to affect the form and input client side.
// var messages = document.getElementById('messages')
var form = document.getElementById('form')
var input = document.getElementById('input')

// Ask for user name.
// const userName = prompt('what is your name?')
// // Attach the name to the messasger
// appendMessage('You joined the chat!')
// // Display that name to everyone in the chat.
// socket.emit('Welcome, ', userName)

// socket.on('chat message', data => {
//     appendMessage(`${data.name}: ${data.message}`)
// })

// An event listener to respond the teh send button being clicked to send a message.
form.addEventListener('submit', function (e) {
    // Stops the input button from inputting immediately on page load
    e.preventDefault();
    // Get the user input and consider it a message.
    if (input.value) {
        socket.emit("chat message", input.value)
        //  clear out the input after each submit fires.
        input.value = ''
    }
})

// When a chat message event fires, client side captures, 
// May not neeed this//// use socket once, to only call this listener once. Prevents multiple messages.
socket.on('chat message', function (msg) {
    // ... and creates a li element in the ul that displays that message..
    console.log(msg)
    var item = document.createElement('li')
    // ..here
    item.textContent = msg
    // ... by just tacking it on to the end of the ul.
    messages.appendChild(item);
    // use socket.on again, to re-register the listener for the next message.
    // socket.on('chat message', arguments.callee)
    // scrolls the window to the latest message.
    window.scrollTo(0, document.body.scrollHeight)
})



