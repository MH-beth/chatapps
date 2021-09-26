import {v4 as uuidv4} from "uuid";
import React, {useState , useEffect} from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import io from "socket.io-client"
import { useCookies } from 'react-cookie';
import SendIcon from '@mui/icons-material/Send';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SOCKET_URL } from "../constants";
import MessagesServices from "../services/MessagesServices";
import Contacts from "../components/Contacts";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import Messages from "../components/Messages";

const Mesenger = () => {
    const [contacts , setContacts] = useState([]);
    const [cookies , setCookies] = useCookies(['user']);
    const [chContact , setChContact] = useState("");
    const [usernameS , setUsernameS] = useState("");
    const [messages , setMessages] = useState([]);
    const [newMessage , setNewMessage] = useState([]);
    const  [message , setMessage] = useState("");
    const [users , setUsers] = useState([]);
    const [allUsers , setAllUsers] = useState([]);
    const socket = React.useRef()

    useEffect(() => {socket.current = io.connect('https://safenetwork-socket.herokuapp.com')}, [])
    useEffect(() => {
        MessagesServices.allus(setAllUsers)
        socket.current.emit("addUser", {username : cookies.username});
        socket.current.on("getUsers", users => setUsers(users));
        socket.current.on("getMessage", data => {
            if(usernameS === data.senderUsername){
                setNewMessage(newMessage.concat({sender : data.senderUsername ,receiver : data.receiverUsername , message : data.text}));
            }
            MessagesServices.AllConv(cookies.username , setContacts);
        });
    }, [cookies, chContact, newMessage, usernameS])
    useEffect(() => {MessagesServices.AllConv(cookies.username , setContacts);},[cookies]);
    console.log(allUsers)
    // console.log(contacts)
    // console.log(chContact);
    // console.log(messages);
    const sendMessage = (e) =>{
        e.preventDefault();
        console.log(message);
        socket.current.emit("sendMessage", {senderUsername : cookies.username , receiverUsername :usernameS , text : message})
        if(usernameS !== "" && chContact === "" && messages.length === 0){
            let id = uuidv4();
            MessagesServices.check(id, cookies.username , usernameS, setChContact);
            MessagesServices.sendMessage(cookies.username , id , message);
        }else{
            MessagesServices.sendMessage(cookies.username , chContact , message);
        }
        setNewMessage(newMessage.concat({sender : "you" , message : message}))
        setMessage("");
        MessagesServices.AllConv(cookies.username , setContacts);
    }
    //{(newMessage !== null && newMessage.sender === usernameS && newMessage !== undefined)? <Messages sender = {newMessage.sender} text = {newMessage.message}/> : null}
    console.log(usernameS);
    console.log(newMessage);
    return (
        <div>
            <div className = "main">
                <h1>Welcome {cookies.username} ! </h1>
                <Button variant = "contained" color = "primary" onClick = {(e) => {
                    sessionStorage.removeItem("conn");
                    window.location.href = "/";
                }}>Disconnect</Button>
            </div>
            <div className = "cm">
                <div className=  "contacts">
                    <h1>Contacts</h1>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">All Users</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={usernameS}
                      label="Username"
                      onChange={e => setUsernameS(e.target.value)}
                    >
                    {(allUsers !== undefined) ? allUsers.map(user => (user.username !== cookies.username) ? <MenuItem value = {user.username}>{user.username}{(users.find(usera => usera.username === user.username)) ?<CheckCircleIcon/> : <NotInterestedIcon/>}</MenuItem>: null ) : <MenuItem>No User Is Connected</MenuItem>  }
                    <br/>
                    </Select>
                  </FormControl>
                  <br/>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Users Connected</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={usernameS}
                      label="Username"
                      onChange={e => setUsernameS(e.target.value)}
                    >
                    {(users.length !== 0 && users !== undefined) ? users.map(user => <MenuItem value = {user.username}>{user.username}</MenuItem>) : <MenuItem value = "">No User Is Curently Connected</MenuItem>}
                    <br/>
                    </Select>
                  </FormControl>
                    {(contacts.length!== 0 && contacts !== undefined) ? contacts.map(contact => <Contacts sender = {contact.sender} receiver = {contact.receiver} id = {contact.id} setCh = {setChContact} chContact = {chContact} setMessages = {setMessages} users = {users} setUsernameS = {setUsernameS} setMessage = {setNewMessage} set = {setMessages}/>) : <p>No contact is available</p>}
                </div>
                <div className = "chat">
                    <h1>Chat</h1>
                    {(messages.length !==0 && messages !== undefined) ? messages.map(message => <Messages sender = {message.sender} text = {message.text} date = {message.date}/>) : <p>No Message Was Send</p>}
                    {(newMessage.length !== 0 && newMessage !== undefined) ? newMessage.map(message =>  <Messages sender = {message.sender} text = {message.message} date = {new Date()}/>) : null}
                    <p>-----------------------------------------</p>
                    <textarea value = {message} onChange = {e => setMessage(e.target.value)}/>
                    <br/>
                    {(message.length !== 0 && usernameS !== 0) ? <Button variant = "contained" color = "primary" onClick = {(e) => sendMessage(e)}><SendIcon/></Button> : <Button variant = "contained" color = "primary" disabled><SendIcon/></Button>}
                </div>
            </div>
        </div>
    )
}

export default Mesenger
