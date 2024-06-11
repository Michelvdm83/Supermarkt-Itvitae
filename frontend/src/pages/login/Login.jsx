import { useState } from "react";
import axios from "axios";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function Login( {role} ) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    const USERNAME_STORAGE_LOCATION = 'USERNAME';
    const TOKEN_STORAGE_LOCATION = 'JWT';
    const MAIN_URL_PART = 'http://localhost:8080/api/v1/';

    function login(event){
        console.log(event);
        
        if(password.length < 1){
            return;
        }

        axios.post(MAIN_URL_PART + role + "s/login", 
                {
                    email: email,
                    password: password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
        ).then(response => {

            sessionStorage.setItem(TOKEN_STORAGE_LOCATION, response.data.token);
            sessionStorage.setItem(USERNAME_STORAGE_LOCATION, response.data.name);
            setLoggedIn(true);
            console.log(response);
        }).catch (error => {
            console.log(error);
            setLoggedIn(false);
        });
    }

    return (
        <LoginForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} login={login}/>
    );
}