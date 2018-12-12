import $ from 'jquery';
import moment from "moment";

// does nothing. just for our reference.
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
const addFavr = (context, title, requestAmount, pickupLocation, dropoffLocation, expirationTime, details) => {
  $.post(addFavrUrl, {
    title,
    requestAmount,
    pickupLocation,
    dropoffLocation,
    expirationTime,
    details,
  }, data => {
    if (data.message === `success`) {
      console.log(data.favrId);
      const newFavrObj = {
        favrId: data.favrId,
        title,
        requestAmount,
        pickupLocation,
        dropoffLocation,
        expirationTime,
        details,
        REFrequestedBy: {
          email: loggedInUserEmail,
          firstName: data.firstName,
          lastName: data.lastName,
          profilePicCode: profileEmoji
        },
        REFfulfilledBy: {
          email: null,
          firstName: null,
          lastName: null,
        },
      };
      storeState.feedFavrs.unshift(newFavrObj);
      context.closeModal(`success`);
    } else {
      alert(`Sorry. We could not complete your request. :(\n\nPlease make sure all fields are ` +
        `filled out and that your request amount is not negative.`);
    }
  });
};

// Get favr
// setCodes: feedFavr, myAccepted, myRequested
const getFavr = (setCode, context) => {
    console.log("getFavrRun")
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
const removeFavr = favrId => {
  $.post(removeFavrUrl, {
    favrId,
  }, data => {
    console.log(data);
    if (data.message === `success`) {
      storeState.feedFavrs.map((favrObj, index) => {
        if (favrObj.favrId === favrId) {
          storeState.feedFavrs.splice(index, 1);
        }
      });
      storeState.feedComponentHandle.setState( { feedFavrsState: storeState.feedFavrs } );
    } else {
      alert(`Sorry. We could not complete your request. :(`);
    }
  });
};

// Update favr
const updateFavr = (context, favrId, title, requestAmount, pickupLocation, dropoffLocation, expirationTime, details) => {
  console.log(favrId, title, requestAmount, pickupLocation, dropoffLocation, expirationTime, details);
  $.post(updateFavrUrl, {
    favrId,
    title,
    requestAmount,
    pickupLocation,
    dropoffLocation,
    expirationTime,
    details,
  }, data => {
    console.log(data);
    if (data.message === `success`) {
      storeState.feedFavrs.map((favrObj, index) => {
        if (favrObj.favrId === favrId) {
          storeState.feedFavrs[index].title = title;
          storeState.feedFavrs[index].requestAmount = parseInt(requestAmount, 10);
          storeState.feedFavrs[index].pickupLocation = pickupLocation;
          storeState.feedFavrs[index].dropoffLocation = dropoffLocation;
          storeState.feedFavrs[index].expirationTime = expirationTime;
          storeState.feedFavrs[index].details = details;
        }
      });
      storeState.feedComponentHandle.setState( { feedFavrsState: storeState.feedFavrs } );
      const newMoment = moment(expirationTime).utc();
      context.setState({moment: newMoment, tempExpirationMoment: newMoment});
    } else {
      alert(`Sorry. We could not complete your request. :(`);
    }
  });
};

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

// Complete Favr
const completeFavr = favrId => {
  $.post(completeFavrUrl, {
    favrId,
  }, data => {
    console.log(data);
    if (data.message === `success`) {
      storeState.feedFavrs.map((favrObj, index) => {
        if (favrObj.favrId === favrId) {
          storeState.feedFavrs.splice(index, 1);
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


const getProfileInformation = (context) => {
    console.log("reached_prof_info");
    $.post(profileUrl,
        {

        },
        function(data) {
            //need to give access to to profile_page
            console.log('profileinformation');
            console.log(data);
            console.log("what in tarnation is going on");
            console.log(data.profile_info[0].profile_symbol);
            //context.setState
            profileEmoji = data.profile_info[0].profile_symbol;
            context.setState({firstName: data.profile_info[0].first_name,
                                lastName: data.profile_info[0].last_name,
                                profileSymbol: data.profile_info[0].profile_symbol});
        }
    );
    //^ added on
}

const setProfileInformation = (symbolSet) => {
    $.post(setProfileUrl,
        {
            symbolSet
        },
        function(data) {
            console.log('setInformation');
            console.log(data);
        }
        );
}

const getAllProfiles = (context) => {
    $.post(getAllProfileUrl,
        {

        },
        function(data) {
            context.setState({
                
            });

        }
        );
}

export { storeState, favrObjectSchema, addFavr, getFavr, removeFavr, updateFavr, acceptFavr, cancelAcceptedFavr, alertExpiredFavr, getProfileInformation, setProfileInformation, getAllProfiles };
