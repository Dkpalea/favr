import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { getProfileInformation } from '../stateStoreAndFunctions';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: ``,
      lastName: ``,
      profileSymbol: ``,
    };
  }

  componentWillMount() {
    if (userIsLoggedIn) {
      getProfileInformation(this);
    }
  }

  render() {
    return (
      <div className="navbar">
        <div className="logo">f&#257;vr</div>
        <span className={`login-signup ${userIsLoggedIn?`display-none`:``}`} onClick={() => {window.location.replace(`/favr/default/user/login/`);}}>Login / Signup</span>
        <span className={`profile ${userIsLoggedIn?``:`display-none`}`}>
          <Link to="/profile" style={{ textDecoration: `none` }}>
            <span className="profile-image">{this.state.profileSymbol} </span>
            <span className="profiles-names">{this.state.firstName} {this.state.lastName}</span>
          </Link>
        </span>
      </div>
    );
  }
}

export default Navbar;
