// Tell the app what to use when it sees "socket".
const socket = io();
// const messages = document.getElementById('messagges')
// // Address the form element, and set a variable to manipulate it
// const form = document.getElementById('form')

// // Address the input, and set a variable to manipulate it
// const input = document.getElementById('input')


// // inbox people


// const inboxPeople = document.querySelector(".inbox__people");

// let userName = "";

// const newUserConnected = (user) => {
//     // Display username or random generated user number.
//     userName = user || `User${Math.floor(Math.random() * 1000000)}`
//     socket.emit('New user', userName)
//     addToUsersBox(userName)
// }

// const addToUsersBox = (userName) => {
//     if (!document.querySelector(`.${userName}-userlist`)) {
//         return;
//     }


//     const userBox = `
// <div class="chat_ib ${userName}-userlist">
// <h5>${userName}</h5>
// </div>
// `;
//     inboxPeople.innerHTML += userBox;
// };

// const addNewMesssage = ({ user, message }) => {
//     const time = new Date();
//     const formattedTime = time.toLocaleString("en-US", { hour: 'numeric', minute: 'numeric' })


//     const receivedMessage = `<div class="incoming__message">
// <div class="received__message">
//   <p>${message}</p>
//   <div class="message__info">
//     <span class="message__author">${user}</span>
//     <span class="time_date">${formattedTime}</span>
//   </div>
// </div>
// </div>`;

//     const myMsg = `  <div class="outgoing__message">
// <div class="sent__message">
//   <p>${message}</p>
//   <div class="message__info">
//     <span class="time_date">${formattedTime}</span>
//   </div>
// </div>
// </div>`;


//     messageBox.innerHTML += user === userName ? myMsg : receivedMsg;
// };



// // New user is successfully created. Generate name and emit
// newUserConnected();

// socket.on('new user', (data) => {
//     data.map((user) => addToUsersBox(user))
// })

// socket.on("user disconnected", function (userName) {
//     document.querySelector(`.${userName}-userlist`).remove();
// });


// form.addEventListener('submit', (e) => {
//     // Stops the input button from inputting immediately on page load
//     e.preventDefault();
//     // Get the user input and consider it a message.
//     if (!input.value) {
//         return;
//     }
//     socket.emit("chat message", {
//         message: input.value,
//         nick: userName
//     })

//     //  clear out the input after each submit fires.
//     input.value = ""
// })

// // What I'm trying instead of the form
// // function send() {
// //     var message = document.getElementById("message").value;
// //     socket.emit("send", { "message": message });
// //     document.getElementById("message").value = "";
// // }

// // socket.on("new", function (data) {
// //     console.log("NEW MESSAGE : ", data);
// //     var chatMessage = document.createElement("li");
// //     chatMessage.innerHTML = data.message;
// //     document.getElementById("messages").appendChild(chatMessage)
// // });




// // Creaates a message on the page
// // socket.on('chat message', function (msg) {
// //     var item = document.createElement('li');
// //     item.textContent = msg;
// //     messages.appendChild(item);
// //     window.scrollTo(0, document.body.scrollHeight);

// // });

// // Trying the above codeblock a different way.
// socket.on('chat message', function (data) {
//     addNewMesssage({ user: data.nick, message: data.message })
//     // var item = document.createElement('li');
//     // item.textContent = msg;
//     // messages.appendChild(item);
//     // window.scrollTo(0, document.body.scrollHeight);

// });

// // var socket = io();

// // var messages = document.getElementById('messages')
// // // Address the form element, and set a variable to manipulate it
// // var form = document.getElementById('form')

// // // Address the input, and set a variable to manipulate it
// // var input = document.getElementById('input')


// // form.addEventListener('submit', function (e) {
// //     // Stops the input button from inputting immediately on page load
// //     e.preventDefault();
// //     // Get the user input and consider it a message.
// //     if (input.value) {
// //         socket.emit('chat message', input.value)
// //         //  clear out the input after each submit fires.
// //         input.value = ""
// //     }
// // })

// // // Creates an li element that holds the new message on the page.
// // socket.on('chat message', function (msg) {
// //     var item = document.createElement('li');
// //     item.textContent = msg;
// //     li.appendChild(item);
// //     window.scrollTo(0, document.body.scrollHeight);

// // });