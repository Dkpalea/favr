import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
      if(!userIsLoggedIn){
          return(
              <div>
                <a href="/favr/default/user/login">Login</a>
                <a href="/favr">Register</a>
              </div>
          );
      }
      else{
          return(
              <div>
              </div>
          )
      }
  }
}