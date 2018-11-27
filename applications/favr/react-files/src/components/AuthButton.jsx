import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

const AuthButton = props => {
  const {
    auth,
    firebase: {
      login,
      logout,
    },
  } = props;
  if (!isLoaded(auth)) {
    return null;
  }
  if (isEmpty(auth)) {
    return (
      <div>
        <button
          type="submit"
          onClick={
            () => login({ provider: `google`, type: `popup` })
          }
        >
          Log in with Google
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

AuthButton.propTypes = {
  auth: PropTypes.object.isRequired,
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => {
  return { auth: state.firebase.auth };
};

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect()
)(AuthButton);
