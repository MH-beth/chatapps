import { Button } from '@mui/material';
import React from 'react'
import { useCookies } from 'react-cookie'
import MessagesServices from '../services/MessagesServices';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

const Contacts = ({sender , receiver , id, setCh, chContact , setMessages, users, setUsernameS, setMessage, set}) => {
    const [cookies , setCookies] = useCookies(['user']);
    let contact;
    if(cookies.username === sender){
        contact = receiver;
    }else{
        contact = sender;
    }
    const getUser = (username) => {
        return users.find(user => user.username === username);
    }
    let user = getUser(contact)
    let online = "";
    if(user){
        online = "true";
    }else{
        online = "false";
    }
    return (
        <div>
            <Button variant = "contained" color = "primary" onClick = {() => {setCh(id);MessagesServices.getAllMessages(id,setMessages);setUsernameS(contact); setMessage([]); set([])}}>{contact} {(online === "true") ? <CheckCircleIcon/> : <NotInterestedIcon/>}</Button>
        </div>
    )
}

export default Contacts
