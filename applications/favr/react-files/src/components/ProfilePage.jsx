import React, {Component} from 'react';
import Feed from './Feed';
import Navbar from "./Navbar";
import { getFavr, getProfileInformation, setProfileInformation } from '../stateStoreAndFunctions';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.showFeedbutton = this.showFeedbutton.bind(this);
    this.state = { feedFavrsState: storeState.feedFavrs,
        profileSymbol: "",
        firstName: "",
        lastName: "", 
        showFeed: false};
  }

  showFeedbutton(){
    this.state.showFeed = !this.state.showFeed;
    console.log(this.state.showFeed);
    this.forceUpdate();

  }

  componentWillMount() {
    getFavr(`feedFavr`, this);

    //console.log("reached?");
    setProfileInformation();
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
      <div className="profile-page-container">
        <Navbar />
        <div className={`profile-page-container_${this.state.showFeed ?`feed`:`main`}`}>

        <div className="profile-card-container">
            <div className="profile-page-symbol">
                {this.state.profileSymbol}
            </div>
            <div className="profile-page-name">
                {this.state.firstName + " "}
                {this.state.lastName}
            </div>
        </div>
            <button className="show-feed" onClick={() => this.showFeedbutton()}>
                <div>Show F&#257;vrs</div>
            </button>
        </div>
        <div className="profile-feed-container">
            <img
            src={addFavrButtonImageSource}
            onClick={() => this.showFeedbutton()}
            className="back-favr-button"
          />
          <Feed feedFavrs={this.state.feedFavrsState} mode="profile" />
        </div>
      </div>

 
    );
  }
}

export default MainPage;
