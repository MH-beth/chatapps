const express = require("express");
const http = require("http");
const app = express();
const server =  http.createServer(app)
const io = require("socket.io")(server, {
    cors : {
        origin : "http://localhost:3000",
        methods : ['GET', 'POST']
    }
});
const PORT = process.env.PORT || 5050;

let users = [];
const addUser = (username , socketId) => {
    !users.some(user => user.username === username) &&
        users.push({username , socketId})
}
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (username) => {
    return users.find(user => user.username === username);
}

io.on("connection", socket => {
    console.log(`New Connection ${socket.id}`);
    socket.on("addUser", ({username}) => {
        addUser(username , socket.id);
        console.log(users);
        io.emit("getUsers", users);
    })
    io.emit("getUsers", users);
    socket.on("sendMessage", ({senderUsername , receiverUsername , text}) => {
        const user = getUser(receiverUsername);
        console.log(user);
        console.log(text);
        if(user !== undefined){
            io.to(user.socketId).emit("getMessage",
            {
                senderUsername ,
                receiverUsername,
                text
            })
        }
    })

    socket.on("disconnect", () => {
        console.log("user disconnection");
        removeUser(socket.id);
        io.emit("getUsers", users)
    })
})




//At The end
server.listen(PORT , () => console.log(`Listening On Port ${PORT}`));