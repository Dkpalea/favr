import React, { Component } from 'react';
import PropTypes from "prop-types";
import moment from 'moment';
import { DatetimePicker } from 'rc-datetime-picker';
import Modal from 'react-modal';
import {cancelAcceptedFavr, acceptFavr, completeFavr, removeFavr, updateFavr} from '../stateStoreAndFunctions';


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

Modal.setAppElement(`#app`);

const modalStyles = {
  content: {
    top: `50%`,
    left: `50%`,
    right: `auto`,
    bottom: `auto`,
    marginRight: `-50%`,
    transform: `translate(-50%, -50%)`,
    width: `50%`,
    paddingRight: `25px`,
  },
};

class Favr extends Component {

  constructor(props) {
    super(props);
    this.state = {detailsAreShowing: false, timeRemaining: null, isEditing: false, favrEditId: null, tempExpirationMoment: null, moment: null};
    this.showDetails = this.showDetails.bind(this);
    this.showEditButton = this.showEditButton.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.saveEditForm = this.saveEditForm.bind(this);
    this.handleChange = this.handleChange.bind(this);

    const { favr: {expirationTime} } = this.props;
    let remainingTimeInMil = expirationTime - Date.now();
    this.setState({timeRemaining: Math.floor(remainingTimeInMil/60000)});
    const momentFromExpirationTime = moment(this.props.favr.expirationTime).utc();
    console.log(`fdhgfcgcgfch`);
    console.log(momentFromExpirationTime);
    this.setState({moment: momentFromExpirationTime, tempExpirationMoment: momentFromExpirationTime});
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

  // componentWillMount() {
  //   const { favr: {expirationTime} } = this.props;
  //   let remainingTimeInMil = expirationTime - Date.now();
  //   this.setState({timeRemaining: Math.floor(remainingTimeInMil/60000)});
  //   const momentFromExpirationTime = moment(this.props.favr.expirationTime).utc();
  //   console.log(`fdhgfcgcgfch`);
  //   console.log(momentFromExpirationTime);
  //   this.setState({moment: momentFromExpirationTime, tempExpirationMoment: momentFromExpirationTime});
  //   const intervalId = setInterval(() => {
  //     // favr expired, clear timer
  //     if (this.state.timeRemaining!==null && this.state.timeRemaining<0) {
  //       clearInterval(intervalId);
  //       this.setState({timeRemaining: -1});
  //       // TODO: alertExpiredFavr()
  //     } else {
  //       remainingTimeInMil = expirationTime - Date.now();
  //       this.setState({timeRemaining: Math.floor(remainingTimeInMil/60000)});
  //     }
  //   }, 1000);
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps) {
      const remainingTimeInMil = nextProps.favr.expirationTime - Date.now();
      if (remainingTimeInMil !== prevState.timeRemaining) {
        return ({timeRemaining: Math.floor(remainingTimeInMil/60000)}); // <- this is setState equivalent
      }

      console.log(nextProps);
      const momentFromExpirationTime = moment(nextProps.favr.expirationTime).utc();
      if (momentFromExpirationTime !== prevState.moment) {
        console.log(`resetting state!`);
        return ({moment: momentFromExpirationTime, tempExpirationMoment: momentFromExpirationTime});
      }
    }
  }

  showDetails = favrId => {
    const momentFromExpirationTime = moment(this.props.favr.expirationTime).utc();
    console.log(`hi`);
    console.log(momentFromExpirationTime);
    this.setState({moment: momentFromExpirationTime, tempExpirationMoment: momentFromExpirationTime});


    let growDiv = document.getElementById(`favr-${favrId}-details`);
    // let growDiv = document.getElementById(`swag`);
    // let growDiv = document.getElementById(`swag`);
    if (this.state.isEditing) {
      growDiv.style.height = `0`;
      this.setState(() => {
        return {isEditing: false};
      });
    } else if (growDiv.clientHeight) {
      growDiv.style.height = `0`;
    } else {
      let container = document.getElementById(`favr-${favrId}-measuring-container`);
      growDiv.style.height = `${container.clientHeight}px`;
    }
    //document.getElementById(`more-button`).value=document.getElementById(`more-button`).value===`Read more`?`Read less`:`Read more`;
    this.setState(state => {
      return {detailsAreShowing: !state.detailsAreShowing};
    });
  };

  showEditForm = favrId => {
    document.body.classList.add(`no-scroll`);
    this.setState(state => {
      return {isEditing: !state.isEditing, favrEditId: favrId};
    });
  };

  showEditButton = (REFrequestedBy, favrId) => {
    if (REFrequestedBy.email===loggedInUserEmail) {
      return (
        <button
          type="submit"
          className="accept-cancel-button yellow-background-button"
          onClick={() => {this.showEditForm(favrId);}}
        >
          <div>Edit</div>
        </button>
      );
    }
    return null;
  };

  closeModal = () => {
    document.body.classList.remove(`no-scroll`);
    this.setState({isEditing: false});
    if (this.state.moment !== this.state.tempExpirationMoment) {
      console.log(`__this.state.moment: ${this.state.moment}`);
      console.log(`__this.state.tempExpirationMoment: ${this.state.tempExpirationMoment}`);
      this.setState({tempExpirationMoment: this.state.moment});
    }
    // this.setState({favrEditId: null});
  };

  afterOpenModal = () => {
    // this.setState({temporaryEditingFavr: storeState.feedFavrs.filter(favrObj => favrObj.favrId===this.state.favrEditId)[0]});
    // this.setState({tempExpirationMoment: this.state.moment});
  };

  saveEditForm = favrId => {
    console.log(`fromFunction: ${favrId}`);
    const title = document.getElementById(`favr-${favrId}-input-title`).value;
    const requestAmount = Math.floor(parseInt(document.getElementById(`favr-${favrId}-input-$`).value, 10));
    const pickupLocation = document.getElementById(`favr-${favrId}-input-pickup`).value;
    const dropoffLocation = document.getElementById(`favr-${favrId}-input-dropoff`).value;
    const expirationTime = this.state.tempExpirationMoment.valueOf();
    const details = document.getElementById(`favr-${favrId}-input-details`).value;
    console.log(title, requestAmount, pickupLocation, dropoffLocation, expirationTime, details);
    updateFavr(this, favrId, title, requestAmount, pickupLocation, dropoffLocation, expirationTime, details);
  };

  handleChange = moment => {
    console.log(moment);
    // FIXME: rc-datetime-picker does not deselect once user is finished editing so a double click
    //  is required to exit modal. Should check currently selected element.
    // document.getElementsByClassName(`ReactModal__Overlay ReactModal__Overlay--after-open overlay`)[0].click();
    this.setState({tempExpirationMoment: moment});
  };

  render() {

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
          <div className="favr-card-profile-pic" > {REFrequestedBy.profilePicCode} </div>
          <div className="favr-card-upper-info-text">
            <div className="favr-card-username">{REFrequestedBy.email===loggedInUserEmail?(`You!`):(`${REFrequestedBy.firstName} ${REFrequestedBy.lastName}`)}</div>
            <div className="favr-card-upper-info-text-under">
              {/* TODO: Hide pickup/dropoff when empty */}
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
              <span className={`claimed-label favr-card-info-font ${REFfulfilledBy.email===null?`visibility-hidden`:``}`}>Claimed by: </span>
              <div className={`favr-card-lower-info-pic-text-container ${REFfulfilledBy.email===null?`visibility-hidden`:``}`}>
                <div className="favr-card-profile-pic" >{REFfulfilledBy.profilePicCode}</div>
                <div className="favr-card-lower-info-text">
                  <div className="favr-card-username">{REFfulfilledBy.email===loggedInUserEmail?(`You!`):(`${REFfulfilledBy.firstName} ${REFfulfilledBy.lastName}`)}</div>
                  {/*<div className="favr-card-info-font favr-card-lower-info-text-under">started 10min ago</div>*/}
                </div>
              </div>
            </div>
            <button type="submit" className={`favr-card-action-button ${REFfulfilledBy.email===loggedInUserEmail||REFrequestedBy.email===loggedInUserEmail?`green-background-button`:`blue-background-button`}`} onClick={() => this.showDetails(favrId)}>
              {/* addFavr(title, details, pickupLocation, dropoffLocation, expirationTime, requestAmount */}
              <div>{detailsAreShowing?`Hide details`:`See details`}</div>
            </button>
          </div>
        </div>
        {/* id={`favr-${favrId}-details`} */}
        <div id={`favr-${favrId}-details`} className="details-container">
          <div id={`favr-${favrId}-measuring-container`}>
            <div className="favr-details green-background-button">
              {details}
              <div className={`button-container ${(REFfulfilledBy.email===loggedInUserEmail||REFfulfilledBy.email===null||REFrequestedBy.email===loggedInUserEmail) && (userIsLoggedIn)?``:`visibility-hidden`}`}>
                {this.showEditButton(REFrequestedBy, favrId)}

                <div id={`favr-${favrId}-edit`} className="details-container">
                  <div id={`favr-${favrId}-edit-measuring-container`}>
                    <div className="favr-details green-background-button">
                      {details}
                    </div>
                  </div>
                </div>


                <button
                  type="submit"
                  className={`accept-cancel-button ${(REFfulfilledBy.email===loggedInUserEmail || (REFrequestedBy.email===loggedInUserEmail && REFfulfilledBy.email===null))?`red-background-button`:`green-background-button`}`}
                  onClick={() => {
                    if (this.state.isEditing) {
                    // update
                      updateFavr(favrId, this);
                    } else if (REFfulfilledBy.email===loggedInUserEmail) {
                    // cancel red
                      cancelAcceptedFavr(favrId);
                    } else if (REFrequestedBy.email===loggedInUserEmail && REFfulfilledBy.email===null) {
                    // remove red
                      removeFavr(favrId);
                    } else if (REFrequestedBy.email!==loggedInUserEmail && REFfulfilledBy.email===null) {
                    // accept green
                      acceptFavr(favrId);
                    } else if (REFrequestedBy.email===loggedInUserEmail && REFfulfilledBy.email!==null) {
                    // complete green
                      completeFavr(favrId);
                    }
                  }}
                >
                  {/*<div>{`${REFfulfilledBy.email===loggedInUserEmail?`Cancel`:REFrequestedBy.email===loggedInUserEmail?`Remove`:`Accept`}`}</div>*/}
                  <div>{`${REFfulfilledBy.email===loggedInUserEmail?`Cancel`:REFrequestedBy.email===loggedInUserEmail && REFfulfilledBy.email===null?`Remove`:REFrequestedBy.email!==loggedInUserEmail && REFfulfilledBy.email===null?`Accept`:REFrequestedBy.email===loggedInUserEmail && REFfulfilledBy.email!==null?`Complete`:`?`}`}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.isEditing}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          // style={modalStyles}
          contentLabel="modal-content"
          // className="Modal"
          className="modal"
          overlayClassName="overlay"
        >
          {/*<h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>*/}
          <div className="edit-title">Edit f&#257;vr</div>
          <form>
            <div className="edit-form-top-container">
              <div id={`favr-${favrId}-edit-form-left`} className="edit-form-left">
                <div className="input-label">Title</div>
                <input id={`favr-${favrId}-input-title`} className="text-input" type="text" name="title" defaultValue={this.props.favr.title} placeholder="Can someone pickup a burrito from the Owl's Nest?" />
                <div className="input-label">$</div>
                <input id={`favr-${favrId}-input-$`} className="text-input" type="number" name="offer-amount" defaultValue={this.props.favr.requestAmount} min="1" max="100" placeholder="12 (whole dollars amounts)" />
                <div className="input-label">Pickup Location</div>
                <input id={`favr-${favrId}-input-pickup`} className="text-input" type="text" name="pickup-location" defaultValue={this.props.favr.pickupLocation} placeholder="The Owl's Nest Restaurant" />
                <div className="input-label">Drop-off Location</div>
                <input id={`favr-${favrId}-input-dropoff`} className="text-input" type="text" name="drop-off-location" defaultValue={this.props.favr.dropoffLocation} placeholder="Baskin Engineering 2 Room 506" />
              </div>
              <div className="edit-form-right">
                <div className="input-label">Expiration Time</div>
                {/*<input id={`favr-${favrId}-input-time`} className="text-input" type="text" name="expiration-time" />*/}
                <DatetimePicker
                  moment={this.state.tempExpirationMoment}
                  onChange={this.handleChange}
                />

              </div>
            </div>
            <div className="input-label">Details</div>
            <textarea id={`favr-${favrId}-input-details`} className="text-input" rows="3" name="details" defaultValue={this.props.favr.details} placeholder="Can you please order me the Black Bean and Chicken Burrito, but with no cheese. It should cost about $7 so you get $5 out of the $12. Let me know! scasey@ucsc.edu" />
          </form>
          <div className="button-container">
            <button
              className="accept-cancel-button green-background-button"
              onClick={() => {
                this.saveEditForm(favrId);
                console.log(`fromFavr: ${favrId}`);
              }}
            >
              <div>Save</div>
            </button>
          </div>
        </Modal>
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
      profilePicCode: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
    REFfulfilledBy: PropTypes.shape({
      email: PropTypes.string,
      profilePicCode: PropTypes.string.isRequired,
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
