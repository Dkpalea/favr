import React, {Component} from 'react';
import ProfileFeed from './profileFeed';
import Navbar from "./Navbar";
import { getFavr, getProfileInformation } from '../stateStoreAndFunctions';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = { feedFavrsState: storeState.feedFavrs };
  }

  componentWillMount() {
    getFavr(`feedFavr`, this);
    getProfileInformation();
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
        <div className="main-feed-container">
          <ProfileFeed feedFavrs={this.state.feedFavrsState} />
        </div>
      </div>
    );
  }
}

export default ProfilePage;
