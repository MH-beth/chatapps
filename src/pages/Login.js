import React from 'react'
import Axios from "axios";
import {API_URL} from "../constants";
import { useCookies } from 'react-cookie';
import { TextField, Button } from '@mui/material';

const Login = () => {
    const [username , setUsername] = React.useState("");
    const [password , setPassword] = React.useState("");
    const [statue , setStatue] = React.useState("");
    const [cookies , setCookies] = useCookies(['user']);
    const handleLogin = (e) => {
        e.preventDefault();
        if(username.length !== 0 && password.length !== 0){
            Axios.post(`${API_URL}/login`, {username : username , password : password})
            .then(response => {
                if(response.data.message){
                    setStatue(response.data.message);
                    sessionStorage.setItem("conn", "Connected");
                    setCookies("username", username , {path : "/"});
                    setCookies("password", password , {path : "/"});
                    setTimeout(() => window.location.href = "/messanger", 2000);
                }else{
                    setStatue(response.data.statue);
                }
            })
        }else{
            setStatue("username and password should be filled")
        }
    }
    const handleRegister = e => {
        e.preventDefault();
        if(username.length !== 0 && password.length !== 0){
            Axios.post(`${API_URL}/register`, {username : username , password : password})
            .then(response => {
                if(response.data.message){
                    setStatue(response.data.message);
                    handleLogin(e);
                }else{
                    setStatue(response.data.sttaue);
                    setPassword("");
                }
            })
        }else{
            setStatue("Username and password should be filled and not empty")
        }
    }
    return (
        <div>
            <h1>Join SafeNetwork : </h1>
            <br/>
            <TextField id = "standart-basic" label = "Username" value = {username} onChange = {e => setUsername(e.target.value)}/>
            <br/>
            <TextField id = "standart-basic" label = "Password" value = {password} onChange = {e => setPassword(e.target.value)}/>
            <br/>
            <div className = "actions">
                <Button variant = "contained" color = "primary" onClick = {e => handleLogin(e)}>Login</Button>
                <Button variant = "contained" color = "primary" onClick = {e => handleRegister(e)}>Register</Button>
            </div>
            <p>{statue}</p>
        </div>
    )
}

export default Login
