import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import AddNode from './FirebaseTestComponent';

class Favr extends Component {

  render() {

    return (
      <div>hello</div>
    );
  }
}

export default Favr;

