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

/*
const addFavrUrl = `{{=URL('api', 'addFavr', user_signature=True)}}`;
const getFavrUrl = `{{=URL('api', 'getFavr')}}`;
const removeFavrUrl = `{{=URL('api', 'removeFavr')}}`;
const updateFavrUrl = `{{=URL('api', 'updateFavr')}}`;
const acceptFavrUrl = `{{=URL('api', 'acceptFavr')}}`;
const cancelAcceptedFavrUrl = `{{=URL('api', 'cancelAcceptedFavr')}}`;
*/



// Add favr
const addFavr = (favr) => {
    $.post(addFavrUrl,
        {
            title: favr.title,
            details: favr.details,
            pickupLocation: favr.pickupLocation,
            dropoffLocation: favr.dropoffLocation,
            __requestedBy: {
                firstName: favr.__requestedBy.firstName,
                lastName: favr.__requestedBy.lastName
            },
            //want the server to assign time for favr to prevent attack
            requestAmount: favr.requestAmount,
            isComplete: false
        },
    )

};

// Get favr
const getFavr = (favrID) => {
    $.getJSON(getFavrUrl,
        {
            favrID: favrID
        },

    )

};

// Remove favr
const removeFavr = (favrID) => {
    $.post(removeFavrUrl,
        {
            favrID: favrID,
            delete: true
        },

        )

};

// Update favr
const updateFavr = (favrID) => {
    $.post(updateFavrUrl,
        )
};

// Accept favr
const acceptFavr = (favrID) => {
    $.post(acceptFavrUrl,
        )

};

// Cancel Accepted favr (both as a requester and a fulfiller)
const cancelAcceptedFavr = (favrID) => {
    $.post(cancelAcceptedFavrUrl,
        {
            favrID: favrID,
            freeFavr: true
        },
        function (data) {
            storeState.feedFavrs.push(data)
        }
        )

};


export { storeState, favrObjectSchema, addFavr, removeFavr, updateFavr, acceptFavr, cancelAcceptedFavr, getFavr };
