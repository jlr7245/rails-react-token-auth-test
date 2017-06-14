import React from 'react';

const LoginForm = (props) => {
  return (
    <form onSubmit={(e) => props.loginSubmit(e)}>
      <input type="email" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <input type="submit" value="Submit" name="submit" />
    </form>
  )
}

export default LoginForm;