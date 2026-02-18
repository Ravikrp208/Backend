import React from 'react'
import "../style/form.scss"




const Login = () => {
  return (
    <main>
      <div className='form-container'>
        <h1>Login </h1>
        <form >
          <input type="text" name='username' placeholder='Enter usernamae' />
          <input type="text" name="password" placeholder='Enter password'/>

          <button type='submit'>Login</button>
        </form>
      </div>
    </main>
  )
}

export default Login