import $ from 'jquery';

// let storeState = {
//   feedFavrs: [], // not complete && not posted/requested by logged in user
//   myRequested: [], // all favrs requested by logged in user
//   myAccepted: [], // all favrs accepted by logged in user
// };

let favrObjectSchema = {
  favrId: ``,
  isShowingDetails: false,
  title: ``,
  details: ``,
  pickupLocation: ``,
  dropoffLocation: ``,
  expirationTime: null,
  startTime: null,
  REFrequestedBy: {
    email: ``,
    firstName: ``,
    lastName: ``,
  },
  REFfulFilledBy: {
    email: ``,
    firstName: ``,
    lastName: ``,
  },
  requestTime: null,
  requestAmount: 5,
  isComplete: false,
};

// API Call Methods

// Add favr
const addFavr = (title, details, pickupLocation, dropoffLocation, expirationTime, requestAmount) => {
  $.post(addFavrUrl, {
    title,
    details,
    pickupLocation,
    dropoffLocation,
    expirationTime,
    requestAmount,
  }, data => {
    console.log(data.favrId);
  });
};

// Get favr
// setCodes: feedFavr, myAccepted, myRequested
const getFavr = (setCode, context) => {
  $.post(getFavrUrl, {
    setCode,
  }, data => {
    console.log(setCode);
    console.log(data);
    if (setCode === `feedFavr`) {
      context.setState({feedFavrsState: data.favrSet});
      storeState.feedFavrs = data.favrSet;
      console.log(`imhere`);
    } else if (setCode === `myRequested`) {
      storeState.myRequested = data.favrSet;
    } else if (setCode === `myAccepted`) {
      storeState.myAccepted = data.favrSet;
    }
  });
};

// Remove favr
const removeFavr = () => {};

// Update favr
const updateFavr = () => {};

// Accept favr
const acceptFavr = favrId => {
  $.post(acceptFavrUrl, {
    favrId,
  }, data => {
    console.log(data);
    if (data.message === `success`) {
      storeState.feedFavrs.map(favrObj => {
        if (favrObj.favrId === favrId) {
          favrObj.REFfulfilledBy = {
            // TODO: add profile pic char
            email: loggedInUserEmail,
            firstName: data.firstName,
            lastName: data.lastName,
          };
        }
      });
      storeState.feedComponentHandle.setState( { feedFavrsState: storeState.feedFavrs } );
    } else {
      alert(`Sorry. We could not complete your request. :(`);
    }
  });
};

// Cancel Accepted favr (both as a requester and a fulfiller)
const cancelAcceptedFavr = favrId => {
  $.post(cancelAcceptedFavrUrl, {
    favrId,
  }, data => {
    console.log(data);
    if (data.message === `success`) {
      storeState.feedFavrs.map(favrObj => {
        if (favrObj.favrId === favrId) {
          favrObj.REFfulfilledBy = {
            // TODO: add profile pic char
            email: null,
            firstName: null,
            lastName: null,
          };
        }
      });
      storeState.feedComponentHandle.setState( { feedFavrsState: storeState.feedFavrs } );
    } else {
      alert(`Sorry. We could not complete your request. :(`);
    }
  });
};

// Alert expired favr
const alertExpiredFavr = () => {};


export { storeState, favrObjectSchema, addFavr, getFavr, removeFavr, updateFavr, acceptFavr, cancelAcceptedFavr, alertExpiredFavr };
