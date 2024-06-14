import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function Login({ role }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const USERNAME_STORAGE_LOCATION = "USERNAME";
  const TOKEN_STORAGE_LOCATION = "JWT";
  const MAIN_URL_PART = "http://localhost:8080/api/v1/";

  function login(event) {
    event.preventDefault();

    if (password.length < 1) {
      return;
    }

    axios
      .post(
        MAIN_URL_PART + role + "s/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        sessionStorage.setItem(TOKEN_STORAGE_LOCATION, response.data.token);
        sessionStorage.setItem(USERNAME_STORAGE_LOCATION, response.data.name);
        setLoggedIn(true);
        navigate("/account");
      })
      .catch((error) => {
        console.log(error);
        setLoggedIn(false);
      });
  }

  return (
    <div className="flex flex-col justify-center content-center items-center gap-4 w-full h-full">
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        login={login}
      />
      <span onClick={() => navigate("/register")}>
        Klik hier om als nieuwe klant te registreren
      </span>
    </div>
  );
}
