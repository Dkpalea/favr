import React, {Component} from 'react';
import Feed from './Feed';
import Navbar from "./Navbar";

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
        </div>
      </div>
    );
  }
}

export default MainPage;
