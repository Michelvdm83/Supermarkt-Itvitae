export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  login,
}) {
  return (
    <form className="flex flex-col justify-center items-center m-1 gap-1 ">
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
      <input
        className="pl-2 border-2 border-nn-green min-w-fit rounded-2xl"
        type="password"
        placeholder="Wachtwoord"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="false"
      />
      <button
        className="text-white bg-nn-green rounded-2xl font-extrabold h-10 w-20 mr-2 mt-6 flex justify-center items-center"
        onClick={login}
      >
        log in
      </button>
    </form>
  );
}
