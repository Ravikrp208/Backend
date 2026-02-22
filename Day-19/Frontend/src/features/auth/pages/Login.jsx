import React from "react";
import "../style/form.scss"

const Login = () => {

    const handleSubmit = (e) =>{
        e.preventDefault()
    }



  return (

    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter password"
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
          />

          <button className="button primary-button">Login</button>
        </form>

      </div>
    </main>
  );
};

export default Login;
