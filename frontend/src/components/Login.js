import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext"; // Update the import path as needed
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const { user } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push("/"); // Redirect to dashboard or some other page
    }
  }, [user, history]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await login(email, password);

    if (result && !result.success) {
      setError(result.message); // Display the error message
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p>{error}</p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
