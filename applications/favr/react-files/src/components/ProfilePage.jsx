import React, {Component} from 'react';
import Feed from './Feed';
import Navbar from "./Navbar";
import { getFavr, getProfileInformation, setProfileInformation } from '../stateStoreAndFunctions';
import { Redirect } from 'react-router-dom';
import { withRouter} from 'react-router';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.showFeedbutton = this.showFeedbutton.bind(this);
    this.backToMainFeed = this.backToMainFeed.bind(this);
    
    this.state = { feedFavrsState: storeState.feedFavrs,
        profileSymbol: "",
        firstName: "",
        lastName: "", 
        showFeed: false,
        back: false
    };
  }

  showFeedbutton(){
    this.state.showFeed = !this.state.showFeed;
    console.log(this.state.showFeed);
    this.forceUpdate();

  }

  backToMainFeed(){
      this.state.back = !this.state.back;
      this.forceUpdate();
    //return <Redirect to="/"/>
  }

  logout(){
    window.location.replace("/favr/default/user/logout/");
  }

  componentWillMount() {
    getFavr(`feedFavr`, this);

    //console.log("reached?");
    //setProfileInformation(true);
    //this.randomEmojiClean();
    getProfileInformation(this);
    //console.log("resolved?");
    //console.log(this.state);
  }

  /*functionally unnessasary after db restructure
  randomEmojiClean(){
    this.state.profileSymbol = this.state.profileSymbol.replace("/\\\\/g", "\\");
  }
  */

  componentWillReceiveProps(nextProps, nextContext) {
    console.log(storeState.feedFavrs);
  }

  render() {
    //console.log(this.state);
    this.state.feedFavrsState = this.state.feedFavrsState.filter(function(el) {
        return  el.REFrequestedBy.email == loggedInUserEmail ||
                el.REFfulfilledBy.email == loggedInUserEmail;
    });
    console.log(this.state.feedFavrsState);
    storeState.feedComponentHandle = this;
    // const now = new Date(Date.now() + 100000);
    if(this.state.back){
        return <Redirect to="/"/>
    }
    if(this.state.logout){
        return <Redirect to="/favr/default/user/logout/"/>
    }
    return (
      <div className="profile-page-container">
        <Navbar />
        <div className={`profile-page-container_${this.state.showFeed ?`feed`:`main`}`}>

        <div className="profile-card-container">
            <div className="profile-page-symbol">
                {this.state.profileSymbol}
            </div>
            <div className="profile-page-name">
                Welcome! <br></br>
                {this.state.firstName + " "}
                {this.state.lastName}
            </div>
        </div>
        <div className="profile-page-buttons">
            <button className="show-feed" onClick={() => this.showFeedbutton()}>
                <div>Show F&#257;vrs</div>
            </button>
            <button className="show-feed" onClick={() => this.backToMainFeed()}>
                <div>Back to Main</div>
            </button>
            <button className="show-feed" onClick={() => this.logout()}>
                <div>Logout</div>
            </button>
        </div>
        </div>
        <div className="profile-feed-container">
            <img
            src={backToProfileButtonSource}
            onClick={() => this.showFeedbutton()}
            className="back-favr-button"
          />
          <Feed feedFavrs={this.state.feedFavrsState} mode="profile" />
        </div>
      </div>

 
    );
  }
}

export default ProfilePage;
