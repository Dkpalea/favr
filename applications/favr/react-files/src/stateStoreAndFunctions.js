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
    firstName: ``,
    lastName: ``,
  },
  REFfulFilledBy: {
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
  }, (data) => {
    console.log(data.favrId);
  })
};








// self.add_post = function () {
//   // We disable the button, to prevent double submission.
//   $.web2py.disableElement($("#add-post"));
//   var sent_title = self.vue.form_title; // Makes a copy
//   var sent_content = self.vue.form_content; //
//   $.post(add_post_url,
//     // Data we are sending.
//     {
//       post_title: self.vue.form_title,
//       post_content: self.vue.form_content
//     },
//     // What do we do when the post succeeds?
//     function (data) {
//       // Re-enable the button.
//       $.web2py.enableElement($("#add-post"));
//       // Clears the form.
//       self.vue.form_title = "";
//       self.vue.form_content = "";
//       // Adds the post to the list of posts.
//       //TODO: match post object from api
//       var new_post = {
//         id: data.post_id,
//         post_author: logged_in_user_email,
//         post_title: sent_title,
//         post_content: sent_content,
//         thumb_state: null,
//         count_u: 0,
//         count_d: 0,
//         count: 0,
//         hover_state: false,
//         replies: [],
//         show_edit_form: false,
//         show_replies: false,
//         temp_reply: {
//           content: '',
//           post_id: -1,
//           author: ''
//         },
//         show_reply_form: false
//       };
//       self.vue.post_list.unshift(new_post);
//       // We re-enumerate the array.
//       self.process_posts();
//     });
//   // If you put code here, it is run BEFORE the call comes back.
// };










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
