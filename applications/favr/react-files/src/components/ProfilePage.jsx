import React, {Component} from 'react';
import Navbar from "./Navbar";
import Feed from "./Feed";
import { getFavr, getProfileInformation } from '../stateStoreAndFunctions';
import { Redirect } from 'react-router';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.showFeedButton = this.showFeedButton.bind(this);
    this.state = {  feedFavrsState: storeState.feedFavrs,
                    requestedFavrState: storeState.myRequested,
                    profileSymbol: "\ud83d\ude01",
                    firstName: "mercy",
                    lastName: "pls",
                    showFeed: false,
                 };
  }

  componentWillMount() {
    getFavr(`feedFavr`, this);
    getProfileInformation();
  }

  showFeedButton(){
    this.state.showFeed = !this.state.showFeed;
    console.log(this.state.showFeed);
    this.forceUpdate();
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
    if (this.state.showFeed){
        return <Redirect to="/profile/feed"></Redirect>;
    }
    else
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
        <button onClick={() => this.showFeedButton()} className="show-favr-feed">Show F&#257;vrs</button>

{/*
        <div className="profile-feed-container">
          <Feed feedFavrs={this.state.feedFavrsState} mode="profile" />
        </div>
*/}

      </div>
    );
  }
}

export default ProfilePage;
