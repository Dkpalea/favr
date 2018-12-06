import React, {Component} from 'react';
import ProfileFeed from './profileFeed';
import Navbar from "./Navbar";
import { getFavr, getProfileInformation } from '../stateStoreAndFunctions';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = { feedFavrsState: storeState.feedFavrs,
                    profileSymbol: "\ud83d\ude01",
                    userName: "Joe"
                 };
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
      <div className="profile-page-container">
      <div className="profile-page-symbol">
            {this.state.profileSymbol}
      </div>
      <div className="profile-page-name">
            {this.state.userName}
      </div>
        <div className="profile-feed-container">
          <ProfileFeed feedFavrs={this.state.feedFavrsState} />
        </div>
      </div>
    );
  }
}

export default ProfilePage;
