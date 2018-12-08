import React, {Component} from 'react';
import Navbar from "./Navbar";
import Feed from "./Feed";
import { getFavr, getProfileInformation } from '../stateStoreAndFunctions';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {  feedFavrsState: storeState.feedFavrs,
                    requestedFavrState: storeState.myRequested,
                    profileSymbol: "\ud83d\ude01",
                    firstName: "mercy",
                    lastName: "pls",
                 };
  }

  componentWillMount() {
    getFavr(`myRequested`, this);
    getFavr(`myAccepted`, this);
    getFavr(`feedFavr`, this);
    getProfileInformation();
  }


  componentWillReceiveProps(nextProps, nextContext) {
    //console.log(storeState.feedFavrs);
  }

  render() {
    //console.log(this.state.feedFavrsState);
    this.state.feedFavrsState = this.state.feedFavrsState.filter(function(el) {
        return  el.REFrequestedBy.email == loggedInUserEmail ||
                el.REFfulfilledBy.email == loggedInUserEmail
    })
    storeState.feedComponentHandle = this;
    // const now = new Date(Date.now() + 100000);
    return (
      <div className="profile-page-container">
        <div className="profile-page-card">
            <div className="profile-page-symbol">
                {this.state.profileSymbol}
            </div>
            <div className="profile-page-name">
                {this.state.firstName}
                {this.state.lastName}
            </div>
        </div>
        <div className="profile-feed-container">
          <Feed feedFavrs={this.state.feedFavrsState} mode="profile" />
        </div>
      </div>
    );
  }
}

export default ProfilePage;
