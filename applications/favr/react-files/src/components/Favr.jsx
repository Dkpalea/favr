import React, { Component } from 'react';
import PropTypes from "prop-types";
import { addFavr } from '../stateStoreAndFunctions';

const favr = {
  favrId: `123`,
  title: `myTitle`,
  details: `myDetails`,
  pickupLocation: `fromHere`,
  dropoffLocation: `toThere`,
  expirationTime: new Date(Date.now()),
  REFrequestedBy: {
    email: `12345@12345.com`,
    profilePicCode: ``,
    firstName: `firstName`,
    lastName: `lastName`,
  },
  REFfulFilledBy: {
    email: `1234@1234.com`,
    profilePicCode: ``,
    firstName: `Dustin`,
    lastName: `Palea`,
  },
  requestAmount: 12,
};

class Favr extends Component {

  constructor(props) {
    super(props);
    this.state = {detailsAreShowing: false, timeRemaining: null};
    this.showDetails = this.showDetails.bind(this);
  }

  componentWillMount() {
    let { timeRemaining } = this.state;
    const { favr: {expirationTime} } = this.props;
    let remainingTimeInMil = expirationTime - Date.now();
    this.setState({timeRemaining: Math.floor(remainingTimeInMil/60000)});
    const intervalId = setInterval(() => {
      // favr expired, clear timer
      if (this.state.timeRemaining!==null && this.state.timeRemaining<0) {
        clearInterval(intervalId);
        this.setState({timeRemaining: -1});
        // TODO: alertExpiredFavr()
      } else {
        remainingTimeInMil = expirationTime - Date.now();
        this.setState({timeRemaining: Math.floor(remainingTimeInMil/60000)});
      }
    }, 1000);
  }

  showDetails = favrId => {
    let growDiv = document.getElementById(`favr-${favrId}-details`);
    // let growDiv = document.getElementById(`swag`);
    console.log(favrId);
    // let growDiv = document.getElementById(`swag`);
    if (growDiv.clientHeight) {
      growDiv.style.height = `0`;
    } else {
      let container = document.querySelector(`.measuring-container`);
      growDiv.style.height = `${container.clientHeight}px`;
    }
    //document.getElementById(`more-button`).value=document.getElementById(`more-button`).value===`Read more`?`Read less`:`Read more`;
    this.setState(state => {
      return {detailsAreShowing: !state.detailsAreShowing};
    });
  };

  render() {

    console.log(this.props.favr);

    const { detailsAreShowing, timeRemaining } = this.state;

    const { favr } = this.props;

    const {
      favrId,
      title,
      details,
      pickupLocation,
      expirationTime,
      dropoffLocation,
      REFrequestedBy,
      REFfulfilledBy,
      requestAmount,
    } = favr;

    return (
      <div className="favr-container">
        <div className="offer-amount">
          <span className="dollar-sign">$</span>
          {requestAmount}
        </div>
        {/* Upper stuff */}
        <div className="favr-card-upper-info">
          <div className="favr-card-profile-pic" />
          <div className="favr-card-upper-info-text">
            <div className="favr-card-username">{REFrequestedBy.email===loggedInUserEmail?(`You!`):(`${REFrequestedBy.firstName} ${REFrequestedBy.lastName}`)}</div>
            <div className="favr-card-upper-info-text-under">
              <span className="favr-card-info-font">
                <span className="favr-card-upper-info-expiration-low">{(timeRemaining!==null && timeRemaining>0)?`expires in ${timeRemaining}m`:`expires in <1m`}</span>
                {`  |  pickup from ${pickupLocation}  |  delivery to ${dropoffLocation}`}
              </span>
            </div>
          </div>
        </div>
        {/* Title */}
        <div className="favr-card">
          <div className="favr-title">{title}</div>
        </div>
        {/* Lower stuff */}
        <div className="favr-card-lower-info">
          <div className="favr-card-lower-info-container-button-container">
            <div className="flex-container">
              <span className="claimed-label favr-card-info-font">Claimed by: </span>
              <div className="favr-card-lower-info-pic-text-container">
                <div className="favr-card-profile-pic" />
                <div className="favr-card-lower-info-text">
                  <div className="favr-card-username">{REFfulfilledBy.email===loggedInUserEmail?(`You!`):(`${REFfulfilledBy.firstName} ${REFfulfilledBy.lastName}`)}</div>
                  <div className="favr-card-info-font favr-card-lower-info-text-under">started 10min ago</div>
                </div>
              </div>
            </div>
            <button type="submit" className="favr-card-action-button" onClick={() => this.showDetails(favrId)}>
              {/* addFavr(title, details, pickupLocation, dropoffLocation, expirationTime, requestAmount */}
              <div>{detailsAreShowing?`Hide details`:`See details`}</div>
            </button>
          </div>
        </div>
        {/* id={`favr-${favrId}-details`} */}
        <div id={`favr-${favrId}-details`} className="details-container">
          <div className="measuring-container">
            <div className="favr-description">{details}</div>
          </div>
        </div>
      </div>
    );
  }
}

Favr.propTypes = {
  favr: PropTypes.shape({
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
  }).isRequired,
};

// Favr.defaultProps = {
//   favr: {
//     REFfulfilledBy:
//       {
//         email: null,
//         // profilePicCode: null,
//         firstName: null,
//         lastName: null,
//       },
//   },
// };

export default Favr;
