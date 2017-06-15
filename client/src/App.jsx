import React, { Component } from 'react';
import './App.css';

import Auth from './modules/Auth';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: Auth.isUserAuthenticated(),
      formRequested: null,
    }
    
    this.loginSubmit = this.loginSubmit.bind(this);
    this.registerSubmit = this.registerSubmit.bind(this);
    this.logOut = this.logOut.bind(this);
    this.makeApiCall = this.makeApiCall.bind(this);
    this.setForm = this.setForm.bind(this);
  }

  //============= AUTH METHODS
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

  registerSubmit(e) {
    e.preventDefault();
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          name: e.target.name.value,
          email: e.target.email.value,
          password: e.target.password.value,
        },
      }),
    }).then(res => res.json()).then(jsonRes => {
      if (jsonRes.token !== undefined) {
        Auth.authenticateToken(jsonRes.token);
      }
      this.setState({
        auth: Auth.isUserAuthenticated(),
      });
    }).catch(err => console.log(err));
  }

  logOut() {
    fetch('/logout.json', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token=${Auth.getToken()}`
      }
    }).then(res => res.json()).then(jsonRes => {
      console.log(jsonRes);
      Auth.deauthenticateUser();
      this.setState({
        auth: Auth.isUserAuthenticated(),
      });
    }).catch(err => console.log(err));
  }

  //=========== OTHER METHODS

  // make a simple api call to the backend
  makeApiCall() {
    fetch('/hacker_spots/index', {
      headers: {
        'Authorization': `Token token=${Auth.getToken()}`,
      }
    }).then(res => res.json()).then(jsonRes => console.log(jsonRes));
  }

  // decide which form to render
  renderForm() {
    switch (this.state.formRequested) {
      case 'register':
        return <RegisterForm registerSubmit={this.registerSubmit} />
      case 'login':
        return <LoginForm loginSubmit={this.loginSubmit} />
      default:
        return (
          <div>
            <p>Welcome to my awesome site!</p>
            <span 
              className="register" 
              onClick={() => this.setForm('register')}>Register!</span>
            <span 
              className="submit"
              onClick={() => this.setForm('login')}>Login!</span>
          </div>
        )
    }
  }

  // click handler for which form
  setForm(formRequested) {
    this.setState({ formRequested });
  }


  //============= RENDER

  render() {
    return (
      <div className="App">
        {(this.state.auth) 
          ? <p>Logged in!</p>
          : this.renderForm()}
        <span className="logout" onClick={() => this.logOut()}>Log Out</span>
        <span className="api" onClick={() => this.makeApiCall()}>Make API call</span>
      </div>
    );
  }
}

export default App;
