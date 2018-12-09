import React, {Component} from 'react';
import Feed from './Feed';
import Navbar from "./Navbar";
import { getFavr, getProfileInformation, setProfileInformation } from '../stateStoreAndFunctions';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = { feedFavrsState: storeState.feedFavrs,
        profileSymbol: "\ud83d\ude01",
        firstName: "",
        lastName: "", };
  }

  componentWillMount() {
    getFavr(`feedFavr`, this);

    //console.log("reached?");
    setProfileInformation("\ud83d\ude01");
    getProfileInformation(this);
    //console.log("resolved?");
    //console.log(this.state);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log(storeState.feedFavrs);
  }

  render() {
    //console.log(this.state);
    this.state.feedFavrsState = this.state.feedFavrsState.filter(function(el) {
        return  el.REFrequestedBy.email == loggedInUserEmail ||
                el.REFfulfilledBy.email == loggedInUserEmail
    })
    console.log(this.state.feedFavrsState);
    storeState.feedComponentHandle = this;
    // const now = new Date(Date.now() + 100000);
    return (
      <div className="main-page-container">
        <Navbar />
        <div className="profile-page-card">
            <div className="profile-page-symbol">
                {this.state.profileSymbol}
            </div>
            <div className="profile-page-name">
                {this.state.firstName + " "}
                {this.state.lastName}
            </div>
        </div>
        <div className="main-feed-container">
          <Feed feedFavrs={this.state.feedFavrsState} mode="profile" />
        </div>
      </div>

 
    );
  }
}

export default MainPage;
