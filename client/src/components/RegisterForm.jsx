import React from 'react';

const RegisterForm = (props) => {
  return (
    <form onSubmit={(e) => props.registerSubmit(e)}>
      <input type="text" placeholder="name" name="name" />
      <input type="email" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <input type="submit" value="Register!" name="register" />
    </form>
  )
}

export default RegisterForm;