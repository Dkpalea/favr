import React, { Component } from "react";
import PropTypes from "prop-types";
import * as $ from "jquery";
import Favr from "./Favr";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.addButtonCLicked = this.addButtonCLicked.bind(this);
    this.showFeed = true;
  }

  showButtonClicked() {
    this.showFeed = !this.showFeed;
    console.log(this.showFeed);
    this.forceUpdate();
  }

  addButtonCLicked = () => {
    $(`html, body`).animate({ scrollTop: 0 }, `fast`);
  };

  render() {
    if (this.props.mode == "feed") {
      const favrComponents = this.props.feedFavrs.map(favr => {
        return (
          <div key={`favr-${favr.favrId}`} className="favrs-container">
            <div className="favr-in-feed">
              <Favr favr={favr} />
            </div>
            <hr />
          </div>
        );
      });
      return (
        <div className="main-feed-container">
          <img
            src={addFavrButtonImageSource}
            onClick={() => this.addButtonCLicked()}
            className="add-favr-button"
          />
          <div className="favr-feed">{favrComponents}</div>
        </div>
      );
    }
    if (this.props.mode == "profile") {
      const favrComponents = this.props.feedFavrs.map(favr => {
        return (
          <div key={`favr-${favr.favrId}`} className="favrs-container">
            <div className="favr-in-feed">
              <Favr favr={favr} />
            </div>
            <hr />
          </div>
        );
      });
      if (this.showFeed) {
        return (
          <div className="profile-component">
            <button
              onClick={() => this.showButtonClicked()}
              className="show-favr-feed"
            >
              Hide F&#257;vrs
            </button>
            <div className="profile-feed-container">
              <div className="profile-favr-feed">{favrComponents}</div>
            </div>
          </div>
        );
      } else {
        return (
          <button
            onClick={() => this.showButtonClicked()}
            className="show-favr-feed"
          >
            Show F&#257;vrs
          </button>
        );
      }
    }
  }
}

Feed.propTypes = {
  feedFavrs: PropTypes.arrayOf(
    PropTypes.shape({
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
        lastName: PropTypes.string.isRequired
      }).isRequired,
      REFfulfilledBy: PropTypes.shape({
        email: PropTypes.string,
        // profilePicCode: PropTypes.string.isRequired,
        firstName: PropTypes.string,
        lastName: PropTypes.string
      }),
      requestAmount: PropTypes.number.isRequired
    })
  ),
  mode: PropTypes.string
};

Feed.defaultProps = {
  feedFavrs: [],
  mode: "feed"
};

export default Feed;
