export default function LoginForm( {email, setEmail, password, setPassword, login} ) {
    return (
    <form className="flex flex-col justify-center items-center w-full h-full m-1 gap-1">
        <input 
            className="border-2 border-black"
            type="email"
            placeholder="emailadres"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
        />
        <input 
            className="border-2 border-black"
            type="password"
            placeholder="wachtwoord"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            />
        <button onClick={login}>log in</button>
    </form>
    );
}