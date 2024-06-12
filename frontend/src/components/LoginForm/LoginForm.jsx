export default function LoginForm( {email, setEmail, password, setPassword, login} ) {

    return (
    <form className="flex flex-col justify-center items-center m-1 gap-1">
        <input 
            className="border-2 focus:outline-none invalid:border-red-700 valid:border-green-700"
            type="email"
            placeholder="emailadres"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="true"
            key="mail"
            
        />
        <input 
            className="border-2 border-black"
            type="password"
            placeholder="wachtwoord"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="false"
            />
        <button onClick={login} >log in</button>
    </form>
    );
}