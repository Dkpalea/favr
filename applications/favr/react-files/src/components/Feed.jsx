import React, { Component } from "react";
import PropTypes from "prop-types";
import $ from "jquery";
import moment from 'moment';
import {DatetimePicker} from "rc-datetime-picker";
import Modal from "react-modal";
import Favr from './Favr';
import { addFavr } from "../stateStoreAndFunctions";

Modal.setAppElement(`#app`);

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {isEditing: false, moment: null, tempExpirationMoment: moment()};
    this.addButtonCLicked = this.addButtonCLicked.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitAddForm = this.submitAddForm.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  showButtonClicked() {
    this.showFeed = !this.showFeed;
    console.log(this.showFeed);
    this.forceUpdate();
  }

  addButtonCLicked = () => {
    this.setState({isEditing: true});
  };

  afterOpenModal = () => {
    document.body.classList.add(`no-scroll`);
  };

  closeModal = saveStatus => {
    document.body.classList.remove(`no-scroll`);
    this.setState({isEditing: false, tempExpirationMoment: moment()});
    if (saveStatus===`success`) {
      setTimeout(() => {$(`html, body`).animate({ scrollTop: 0 }, `medium`);}, 1000);
    }
    // if (this.state.moment !== this.state.tempExpirationMoment) {
    //   console.log(`__this.state.moment: ${this.state.moment}`);
    //   console.log(`__this.state.tempExpirationMoment: ${this.state.tempExpirationMoment}`);
    //   this.setState({tempExpirationMoment: this.state.moment});
    // }
    // this.setState({favrEditId: null});
  };

  submitAddForm = () => {
    const title = document.getElementById(`add-input-title`).value;
    const requestAmount = Math.floor(parseInt(document.getElementById(`add-input-$`).value, 10));
    const pickupLocation = document.getElementById(`add-input-pickup`).value;
    console.log(requestAmount);
    const dropoffLocation = document.getElementById(`add-input-dropoff`).value;
    const expirationTime = this.state.tempExpirationMoment.valueOf();
    const details = document.getElementById(`add-input-details`).value;
    console.log(title, requestAmount, pickupLocation, dropoffLocation, expirationTime, details);
    addFavr(this, title, requestAmount, pickupLocation, dropoffLocation, expirationTime, details);
  };

  handleChange = moment => {
    console.log(moment);
    // FIXME: rc-datetime-picker does not deselect once user is finished editing so a double click
    //  is required to exit modal. Should check currently selected element.
    document.getElementsByClassName(`edit-title`)[0].click();
    this.setState({tempExpirationMoment: moment});
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
            <div className="edit-title">Add f&#257;vr</div>
            <form>
              <div className="edit-form-top-container">
                <div id="add-form-left" className="edit-form-left">
                  <div className="input-label">Title</div>
                  <input id="add-input-title" className="text-input" type="text" name="title" placeholder="Can someone pickup a burrito from the Owl's Nest?" required />
                  <div className="input-label">$</div>
                  <input id="add-input-$" className="text-input" type="number" name="offer-amount" min="1" max="100" placeholder="12 (whole dollars amounts)" required />
                  <div className="input-label">Pickup Location</div>
                  <input id="add-input-pickup" className="text-input" type="text" name="pickup-location" placeholder="The Owl's Nest Restaurant" required />
                  <div className="input-label">Drop-off Location</div>
                  <input id="add-input-dropoff" className="text-input" type="text" name="drop-off-location" placeholder="Baskin Engineering 2 Room 506" required />
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
              <textarea id="add-input-details" className="text-input" rows="3" name="details" placeholder="Can you please order me the Black Bean and Chicken Burrito, but with no cheese. It should cost about $7 so you get $5 out of the $12. Let me know! scasey@ucsc.edu" />
            </form>
            <div className="button-container">
              <button
                className="accept-cancel-button green-background-button"
                onClick={() => {
                  this.submitAddForm();
                }}
              >
                <div>Post!</div>
              </button>
            </div>
          </Modal>
          <img src={addFavrButtonImageSource} onClick={() => this.addButtonCLicked()} className={`add-favr-button ${userIsLoggedIn?``:`display-none`}`} />
          <div className="favr-feed">
            {favrComponents}
          </div>
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
        return (
            <div className="main-feed-container">
              <div className="favr-feed">{favrComponents}</div>
            </div>
        );
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
