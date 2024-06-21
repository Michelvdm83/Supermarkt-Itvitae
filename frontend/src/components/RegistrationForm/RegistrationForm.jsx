import { useState } from "react";

export default function RegistrationForm({
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  register,
}) {
  const [passwordCheck, setPasswordCheck] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <div className="border-2 flex flex-col items-center rounded-2xl shadow-xl gap-4 mt-4">
      <form className="flex mt-8 gap-8 justify-center items-center m-1 ">
        <div className="flex flex-col mt-0 gap-4 my-4 ml-4">
          <input
            className="border-2 mt-4 pl-2 border-nn-green min-w-fit rounded-2xl focus:outline-none valid:bg-nn-green-faded"
            type="name"
            placeholder="Voornaam"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
              setName(event.target.value);
            }}
            required
            autoComplete="true"
          />
          <input
            className="border-2 pl-2 border-nn-green min-w-fit rounded-2xl focus:outline-none valid:bg-nn-green-faded"
            type="name"
            placeholder="Achternaam"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
              setName(firstName + " " + event.target.value);
            }}
            required
            autoComplete="true"
          />
          <input
            className="border-2 pl-2 border-nn-green min-w-fit rounded-2xl focus:outline-none valid:bg-nn-green-faded"
            type="email"
            placeholder="E-mailadres"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="true"
            key="mail"
          />
        </div>
        <div className="flex flex-col gap-4 my-4 justify-start">
          <input
            className={
              (password !== passwordCheck
                ? " border-nn-pink "
                : " border-nn-green ") +
              "pl-2 focus:outline-none border-2 min-w-fit rounded-2xl"
            }
            type="password"
            placeholder="Wachtwoord"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="false"
          />
          <input
            className={
              (password !== passwordCheck
                ? " border-nn-pink "
                : " border-nn-green ") +
              "pl-2 focus:outline-none border-2 min-w-fit rounded-2xl"
            }
            type="password"
            placeholder="Herhaal wachtwoord"
            value={passwordCheck}
            onChange={(event) => setPasswordCheck(event.target.value)}
            autoComplete="false"
          />
        </div>
      </form>
      <button
        className={
          (password !== passwordCheck ? " bg-nn-pink " : " bg-nn-green ") +
          "text-white mb-4 rounded-2xl font-extrabold h-10 w-32 mr-2 mt-6 flex justify-center items-center"
        }
        disabled={password !== passwordCheck}
        onClick={register}
      >
        Registreer
      </button>
    </div>
  );
}
