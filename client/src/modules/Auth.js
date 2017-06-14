class Auth {
  // https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
  static authenticateToken(token) {
    localStorage.setItem('token', token);
  }

  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

}

export default Auth;
