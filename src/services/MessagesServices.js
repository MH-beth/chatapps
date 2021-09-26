import { API_URL } from "../constants";
import Axios from "axios";

class MessagesServices {
    check(id , sender , receiver, setCh){
        Axios.post(`${API_URL}/check`, {sender : sender , receiver : receiver})
            .then(response => {
                if(response.data.message){
                    setCh(response.data.message);
                }else{
                    this.createConversation(id , sender , receiver, setCh);
                }
            })
    }
    createConversation(id , sender , receiver, setCh){
        Axios.post(`${API_URL}/createConv`, {id : id , sender : sender , receiver : receiver})
            .then(response => {
                if(response.data.statue){
                    window.location.href = "/err";
                }else{
                    setCh(id);
                }
            })
    }
    AllConv(username, setConv){
        Axios.post(`${API_URL}/allConv`, {sender : username})
            .then(response => {
                if(response.data.message){
                    setConv(response.data.message);
                }
            })

    }
    sendMessage(sender , converId , text ){
        Axios.post(`${API_URL}/sendMessage`, {sender : sender, converId : converId , texte : text})
            .then(response => {
                if(response.data.statue){
                    window.location.href = "/err";
                }
            })
    }


    getAllMessages(converId , setMessages){
        Axios.post(`${API_URL}/getAllMessages`, {converId : converId})
            .then(response => {
                if(response.data.message){
                    setMessages(response.data.message);
                }
            })
    }

    allus(setUsers){
        Axios.post(`${API_URL}/all`, {})
            .then(response => {
                if(response.data.messages){
                    setUsers(response.data.messages);
                }
            })
    }

}

export default new MessagesServices();