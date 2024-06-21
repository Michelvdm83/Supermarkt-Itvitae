import axios from "axios";
import Banner from "../../components/Banner/Banner";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function register() {
    axios
      .post("http://localhost:8080/api/v1/customers/register", {
        email: email,
        password: password,
        name: name,
      })
      .then((response) => navigate("/login"))
      .catch((error) => {
        alert(error.response.data.detail);
      });
  }

  return (
    <div className="w-1/3 flex flex-col justify-center">
      <div>
        <Banner bannerText={"Registreren"} />
      </div>
      <RegistrationForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        name={name}
        setName={setName}
        register={register}
      />
    </div>
  );
}
