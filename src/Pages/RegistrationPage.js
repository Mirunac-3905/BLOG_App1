import {useState} from "react";
import '../CSS/RegistrationPage.css';
import { useNavigate } from "react-router-dom";


export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      setMessage('Registration successful');
      setTimeout(() => {
        navigate('/login'); // Redirect to login page
      }, 2000);
    }else if(response.status===400){
      setMessage('User already exists');
    }
     else {
      setMessage('Registration failed. Please try again.');
    }
  }
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <label>UserName :</label>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}/>
             <br></br>
      <label>Password :</label>
      <input type="password"
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <br></br>
      <button>Register</button>
      {message && <p className="message">{message}</p>} 
    </form>
  );
}