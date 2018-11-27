import React, { Component } from 'react';
import addFavr from '../stateStoreAndFunctions';

class Favr extends Component {

  render() {

    return (
      <div className="favr-container">
        <div className="offer-amount">
          <span className="dollar-sign">$</span>
          14
        </div>
        {/* Upper stuff */}
        <div className="favr-card-upper-info">
          <div className="favr-card-profile-pic" />
          <div className="favr-card-upper-info-text">
            <div className="favr-card-username">Dustin Palea</div>
            <div className="favr-card-upper-info-text-under">
              <span className="favr-card-info-font">
                <span className="favr-card-upper-info-expiration-low">expires in 8m</span>
                {`  |  pickup from Owl's Nest  |  delivery to McHenry`}
              </span>
            </div>
          </div>
        </div>
        {/* Title */}
        <div className="favr-card">
          <div className="favr-title">Can someone get me a burrito from the Owl&#39;s nest?</div>
        </div>
        {/* Lower stuff */}
        <div className="favr-card-lower-info">
          <div className="favr-card-lower-info-container-button-container">
            <div className="flex-container">
              <span className="claimed-label favr-card-info-font">Claimed by: </span>
              <div className="favr-card-lower-info-pic-text-container">
                <div className="favr-card-profile-pic" />
                <div className="favr-card-lower-info-text">
                  <div className="favr-card-username">You!</div>
                  <div className="favr-card-info-font favr-card-lower-info-text-under">started 10min ago</div>
                </div>
              </div>
            </div>
            <button type="submit" className="favr-card-action-button">
              <div>See details</div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Favr;
