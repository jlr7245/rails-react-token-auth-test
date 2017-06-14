import React, { Component } from 'react';
import './App.css';

import Auth from './modules/Auth';
import LoginForm from './components/LoginForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: false,
    }
    
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  loginSubmit(e) {
    e.preventDefault();
    fetch('/login.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    }).then(res => res.json()).then((jsonRes) => {
      Auth.authenticateToken(jsonRes.token);
      this.setState({
        auth: Auth.isUserAuthenticated(),
      });
    }).catch(err => console.log(err));
  }



  render() {
    return (
      <div className="App">
        {(this.state.auth) 
          ? <p>Logged in!</p>
          : <LoginForm loginSubmit={this.loginSubmit} />}
      </div>
    );
  }
}

export default App;
