const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

//databse set
const db = mysql.createConnection(
    {
        user : "sql11440218",
        host : "sql11.freesqldatabase.com",
        password : "KYJvUk533D",
        database : "sql11440218"
    }
)

app.post("/register", (req , res) => {
    const username = req.body.username;
    const password = req.body.password;
    const q = "INSERT INTO users(username , password) VALUES(?,?)";
    db.query(q , [username , password], (err , results) => {
        if(err){
            throw new Error(err);
        }
        if(results){
            res.send({message : "Succesfully Registered"});
        }else{
            res.send({statue : "An Error Have Occured"});
        }
    })
})

app.post("/login", (req , res) => {
    const username = req.body.username;
    const password = req.body.password;
    const q = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(q , [username , password], (err , results) => {
        if(err){
            throw new Error(err);
        }
        if(results[0]){
            res.send({message : "Succesfully Connected"});
        }else{
            res.send({sttaue : "Username or/AND password are wrong"});
        }
    })
})

app.post("/createConv", (req , res) => {
    const id = req.body.id;
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const q = "INSERT INTO conversations(id , sender , receiver) VALUES(?,?,?)";
    db.query(q , [id , sender , receiver], (err , results) => {
        if(err){
            throw new Error(err);
        }
        if(results){
            res.send({message : "All Good"});
        }else{
            res.send({statue : err});
        }
    })
})

app.post("/allConv", (req , res) => {
    const sender = req.body.sender;
    const q = "SELECT * FROM conversations WHERE sender = ? OR receiver = ?";
    db.query(q , [sender, sender], (err , results) => {
        if(err){
            throw new Error(err);
        }
        if(results[0]){
            res.send({message : results});
        }else{
            res.send({statue : "No Conversation Is Available"});
        }
    })
})

app.post("/sendMessage", (req , res) => {
    const sender = req.body.sender;
    const texte = req.body.texte;
    const converId = req.body.converId;
    const date = new Date();
    const q = "INSERT INTO messages(sender , text , converId, date) VALUES (?,?,?,?)";
    db.query(q , [sender , texte , converId , date], (err , results) => {
        if(err){
            throw new Error(err);
        }
        if(results){
            res.send({message : "Succesfully Sent"});
        }else{
            res.send({statue : "An Error Have occured"});
        }
    })
})


app.post("/getAllMessages", (req , res) => {
    const converid = req.body.converId;
    const q = "SELECT * FROM messages WHERE converId = ? ";
    db.query(q , [converid], (err , results) => {
        if(err){
            throw new Error(err);
        }
        if(results[0]){
            res.send({message : results});
            console.log(results);
        }else{
            res.send({statue: "No Message Was Found ! "});
        }
    })
})

app.post("/check", (req , res) => {
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const q = "SELECT * FROM conversations WHERE sender = ? AND receiver = ?";
    db.query(q , [sender , receiver], (err ,results) => {
        if(err){
            throw new Error(err);
        }
        if(results[0]){
            res.send({message : results[0].id});
        }else{
            res.send({statue : "no"})
        }
    } )
})

app.post("/all", (req , res) => {
    const q = "SELECT username FROM users";
    db.query(q , [], (err, results) => {
        if(err){
            throw new Error(err);
        }
        if(results[0]){
            res.send({messages : results});
        }else{
            res.send({statue : "No User IS avaimlabe"})
        }
    })
})




//at the end
app.listen(PORT , () => console.log(`Listening on Port ${PORT}`));