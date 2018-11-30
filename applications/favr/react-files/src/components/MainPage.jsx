import React, {Component} from 'react';
import Feed from './Feed';
import Navbar from "./Navbar";
import LoginPage from "./LoginPage";

class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="main-page-container">
        <Navbar />
        <div className="main-feed-container">
          <Feed />
        <LoginPage></LoginPage>
        </div>
      </div>
    );
  }
}

export default MainPage;
