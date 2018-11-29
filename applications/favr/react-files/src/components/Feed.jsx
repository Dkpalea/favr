import React, { Component } from 'react';
import PropTypes from "prop-types";
import Favr from './Favr';
import { getFavr } from '../stateStoreAndFunctions';

class Feed extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    getFavr(`feedFavr`);

    const {feedFavrs} = this.props;

    const favrComponents = feedFavrs.map(favr => {
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
      <div className="main-feed">
        {favrComponents}
      </div>
    );
  }
}

Feed.propTypes = {
  feedFavrs: PropTypes.arrayOf(PropTypes.shape({
    favrId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    pickupLocation: PropTypes.string.isRequired,
    dropoffLocation: PropTypes.string.isRequired,
    expirationTime: PropTypes.number.isRequired,
    REFrequestedBy: PropTypes.shape({
      email: PropTypes.string.isRequired,
      profilePicCode: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
    REFfulFilledBy: PropTypes.shape({
      email: PropTypes.string.isRequired,
      profilePicCode: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
    requestAmount: PropTypes.number.isRequired,
  })),
};

Feed.defaultProps = {
  feedFavrs: [],
};

export default Feed;
