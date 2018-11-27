import React from 'react';
import PropTypes from 'prop-types';
//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

const AcceptButton = props => {
  const {
  } = props;
  if (false) {
    return null;
  }
  if (true) {
    return (
      <div>
        <button
          type="submit"
          onClick={
              () => console.log("hi there")
          }
        >
          Display Button
        </button>
      </div>
    );
  }
  return (
    <button
      type="submit"
      style={{ width: `20rem` }}
      onClick={() => logout()}
    >
      Logout
    </button>
  );
};



export default AcceptButton;
