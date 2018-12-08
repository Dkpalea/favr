import React, { Component } from 'react';
import PropTypes from "prop-types";
import * as $ from 'jquery';
import Favr from './Favr';

class ProfileFeed extends Component {

  constructor(props) {
    super(props);
    this.showButtonClicked = this.showButtonClicked.bind(this);
    this.showFeed = false;
    console.log("this_comp");
    console.log(this);
  }

  showButtonClicked() {
    this.showFeed = !this.showFeed;
    console.log(this.showFeed);
    this.forceUpdate();
  }

  render() {
    const favrComponents = this.props.feedFavrs.map(favr => {
      return (
        <div key={`favr-${favr.favrId}`} className="profile-favrs-container">
          <div className="profile-favr-in-feed">
            <Favr favr={favr} />
          </div>
          <hr />
        </div>
      );
    });

    if(this.showFeed){
        return (
        <div className="profile-component">
            <button onClick={() => this.showButtonClicked()} className="show-favr-feed">Show F&#257;vrs</button>
        <div className="profile-feed-container">
            
            <div className="profile-favr-feed">
            {favrComponents}
            </div>
        </div>
        </div>
        );
    } else {
        return(
            <button onClick={() => this.showButtonClicked()} className="show-favr-feed">Show F&#257;vrs</button>
        )
    }
  }
}

ProfileFeed.propTypes = {
  feedFavrs: PropTypes.arrayOf(PropTypes.shape({
    favrId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    pickupLocation: PropTypes.string.isRequired,
    dropoffLocation: PropTypes.string.isRequired,
    expirationTime: PropTypes.number.isRequired,
    REFrequestedBy: PropTypes.shape({
      email: PropTypes.string.isRequired,
      // profilePicCode: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
    REFfulfilledBy: PropTypes.shape({
      email: PropTypes.string,
      // profilePicCode: PropTypes.string.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
    requestAmount: PropTypes.number.isRequired,
  })),
};

ProfileFeed.defaultProps = {
  feedFavrs: [],
};

export default ProfileFeed;
