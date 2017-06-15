import React, { Component } from 'react';
import Auth from '../modules/Auth'

class Dash extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // TODO: fetch on something other than the auth token in the URL
    fetch(`/users/${Auth.getToken()}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token=${Auth.getToken()}`
      }
    }).then(res => res.json()).then((jsonRes) => {
      console.log(jsonRes);
    });
  }

  render() {
    return (
      <div>
        <span 
          className="logout" 
          onClick={() => this.props.logOut()}>Log Out</span>
        <span 
          className="api" 
          onClick={() => this.props.makeApiCall()}>Make API call</span>
      </div>
    )
  }
}

export default Dash;
