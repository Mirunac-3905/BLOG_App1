import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext.js";
import '../CSS/LoginPage.css';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  function register(e) {
    e.preventDefault();
    navigate("/register");
  }

  async function login(ev) {
    ev.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const userInfo = await response.json();
        setUserInfo(userInfo);
        setMessage("Login Successful");
        setTimeout(() => navigate("/indexPage"), 2000); 
      } else {
        setMessage("Invalid username or password");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setMessage("Login failed. Please try again.");
    }
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      
      <label>UserName  </label>
      <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter your username' />
      <br />
      <label>Password  </label>
      <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your Password' />
      <br />
      
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
      {/* <h4>New to Blogging</h4> */}
      <p>Don't have an Account ? <button onClick={register}>Create New Account</button></p>
    </form>
  );
}