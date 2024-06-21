import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginForm from "../../components/LoginForm/LoginForm";
import Banner from "../../components/Banner/Banner";

export default function Login({ role, getShoppingCart }) {
  const navigate = useNavigate();
  const title = (role === "manager" ? "Manager" : "Klant") + " login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const USERNAME_STORAGE_LOCATION = "USERNAME";
  const TOKEN_STORAGE_LOCATION = "JWT";
  const ROLE_STORAGE_LOCATION = "ROLE";
  const MAIN_URL_PART = "http://localhost:8080/api/v1/";

  const jwt = sessionStorage.getItem("JWT");

  useEffect(() => {
    if (jwt != null) {
      navigate("/");
    }
  }, []);

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
        sessionStorage.setItem(ROLE_STORAGE_LOCATION, response.data.role);
        if (response.data.role === "customer") {
          getShoppingCart();
        }
        navigate("/account");
      })
      .catch((error) => {
        alert(error.response.data.detail);
      });
  }

  return (
    <div className=" w-1/2 flex flex-col mt-8 justify-center content-center items-center gap-4 border-2 rounded-2xl shadow-xl">
      <div className="w-1/4 mb-4">
        <Banner bannerText={title} />
      </div>
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        login={login}
      />
      {role === "customer" && (
        <p>
          Klik
          <span
            className="cursor-pointer text-nn-green"
            onClick={() => navigate("/register")}
          >
            {} hier {}
            {/*haakjes om een spatie te houden na opslaan met prettier*/}
          </span>
          om als nieuwe klant te registreren
        </p>
      )}
      {role === "customer" && (
        <p className="mb-4">
          Klik
          <span
            className="cursor-pointer text-nn-green"
            onClick={() => navigate("/login-manager")}
          >
            {} hier {}
          </span>
          voor Manager login
        </p>
      )}
    </div>
  );
}
