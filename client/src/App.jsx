import React, { Component } from 'react';
import './App.css';

import Auth from './modules/Auth';
import LoginForm from './components/LoginForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: Auth.isUserAuthenticated(),
    }
    
    this.loginSubmit = this.loginSubmit.bind(this);
    this.deleteToken = this.deleteToken.bind(this);
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
      if (jsonRes.token !== undefined) {
        Auth.authenticateToken(jsonRes.token);
      }
      this.setState({
        auth: Auth.isUserAuthenticated(),
      });
    }).catch(err => console.log(err));
  }

  deleteToken() {
    Auth.deauthenticateUser();
    this.setState({
      auth: Auth.isUserAuthenticated(),
    });
  }


  render() {
    return (
      <div className="App">
        {(this.state.auth) 
          ? <p>Logged in!</p>
          : <LoginForm loginSubmit={this.loginSubmit} />}
        <span className="logout" onClick={() => this.deleteToken()}>Log Out</span>
      </div>
    );
  }
}

export default App;
