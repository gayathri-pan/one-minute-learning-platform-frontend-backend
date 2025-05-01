import React, { useState } from 'react';
import api from '../utils/api';
import {useNavigate} from 'react-router-dom'
const LoginForm = ({setUser}) =>{
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const handleChange = e => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handleSubmit = async e => {
        e.preventDefault();
        try{
            const response = await api.post('/auth/login', credentials);
            const {token, user} = response.data;
            const {id, email, role} = user;
            //console.log(id)
            console.log(token)
            //console.log(user)
            //console.log(email)
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            setUser(user); 
            
            if (role === "admin"){
              navigate('/admin');
            }else{
              navigate('/dashboard');
              window.location.reload(); // go to dashboard
            }
        }catch(err){
            console.error(err);
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2>Login</h2>
          {error && <p style={styles.error}>{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Log In</button>
        </form>
      );
    };
    
    const styles = {
      form: {
        maxWidth: '400px',
        margin: '50px auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9'
      },
      input: {
        padding: '10px',
        fontSize: '16px'
      },
      button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      },
      error: {
        color: 'red',
        margin: '0'
      }

    

};

export default LoginForm;