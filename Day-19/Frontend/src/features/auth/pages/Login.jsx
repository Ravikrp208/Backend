import React, { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/userAuth";



const Login = () => {

  const { user, loading, handleLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPasswoard] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    await handleLogin(username, password)
     console.log("user loggedin")
  };


  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            id="username"
            placeholder="Enter password"
          />

          <input
            onInput={(e) => {
              setPasswoard(e.target.value);
            }}
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
          />

          <button className="button primary-button">Login</button>
        </form>
        <p>
          Don't have an account ? <Link to={"/register"}>Create one.</Link>{" "}
        </p>
      </div>
    </main>
  );
};

export default Login;
