import React, {Component} from 'react';
import Feed from './Feed';
import Navbar from "./Navbar";
import { getFavr } from '../stateStoreAndFunctions';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = { feedFavrsState: storeState.feedFavrs };
  }

  componentWillMount() {
    console.log("reached?");
    getFavr(`feedFavr`, this);
    console.log("resolved?");
    
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log(storeState.feedFavrs);
  }

  render() {
    console.log(this.state.feedFavrsState);
    storeState.feedComponentHandle = this;
    // const now = new Date(Date.now() + 100000);
    return (
      <div className="main-page-container">
        <Navbar />
        {/*<div className="test">123</div>*/}
        <div className="main-feed-container">
          <Feed feedFavrs={this.state.feedFavrsState} />
        </div>
      </div>

 
    );
  }
}

export default MainPage;
