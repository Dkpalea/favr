import $ from 'jquery';

// let storeState = {
//   feedFavrs: [], // not complete && not posted/requested by logged in user
//   myRequested: [], // all favrs requested by logged in user
//   myAccepted: [], // all favrs accepted by logged in user
// };

let favrObjectSchema = {
  isShowingDetails: false,
  title: ``,
  details: ``,
  pickupLocation: ``,
  dropoffLocation: ``,
  expirationTime: null,
  startTime: null,
  __requestedBy: {
    firstName: ``,
    lastName: ``,
  },
  __fulFilledBy: {
    firstName: ``,
    lastName: ``,
  },
  requestTime: null,
  requestAmount: 5,
  isComplete: false,
};

// API Call Methods

// Add favr
const addFavr = () => {};

// Get favr
const getFavr = () => {};

// Remove favr
const removeFavr = () => {};

// Update favr
const updateFavr = () => {};

// Accept favr
const acceptFavr = () => {};

// Cancel Accepted favr (both as a requester and a fulfiller)
const cancelAcceptedFavr = () => {};


export { storeState, favrObjectSchema, addFavr, removeFavr, updateFavr, acceptFavr, cancelAcceptedFavr };
