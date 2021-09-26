import React from 'react'
import { useCookies } from 'react-cookie';
import {format} from "timeago.js"

const Messages = ({sender , text, date}) => {
    const [cookies , setCookies] = useCookies(['user']);
    let contact = "";
    if(cookies.username === sender){
        contact = "you";
    }else{
        contact = sender;
    }
    if(sender)
    return (
        <div>
            <p>{contact} : {text}   {format(date)}</p>
        </div>
    )
}

export default Messages
