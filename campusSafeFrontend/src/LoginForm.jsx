import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const user = { username, password };
    // Create a request object to send login data to the API
    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (response.status === 200) {
        const data = await response.json();
        const accessToken = data.token;

        // Save the token to local storage or a state management solution.
        // You may want to add token expiration handling and more.
        localStorage.setItem('accessToken', accessToken);
        console.log('Login successful');
        navigate('/dashboard');
        // Redirect the user to another page after successful login.
        // You can use React Router to achieve this.
        // Example: history.push('/dashboard');
      } else {
        // Handle login error, e.g., show an error message.
        console.log('Login failed');
      }
    } catch (error) {
      // Handle network or other errors.
      console.error('Error:', error);
      setError('An error occurred during login.');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;