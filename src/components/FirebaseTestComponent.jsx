import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddNode extends Component {

  constructor(props) {
    super(props);
    this.state = { node: `` };
  }

  addNode = () => {
    const {
      uid,
      firestore: {
        add,
      },
    } = this.props;

    const {
      node,
    } = this.state;

    add(
      { collection: `nodes` },
      {
        uid,
        name: node,
      }
    );

    this.setState({ node: `` });
  };

  render() {
    const {
      uid,
    } = this.props;

    const {
      node,
    } = this.state;

    if (!uid) return null;

    return (
      <div>
        <input
          type="text"
          value={node}
          onChange={event => this.setState({ node: event.target.value })}
        />
        <button type="submit" onClick={this.addNode}>Add Node</button>
      </div>
    );
  }
}

AddNode.propTypes = {
  uid: PropTypes.string,
  firestore: PropTypes.shape({
    add: PropTypes.func.isRequired,
  }).isRequired,
};

AddNode.defaultProps = {
  uid: null,
};

const mapStateToProps = state => {
  return { uid: state.firebase.auth.uid };
};

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(),
)(AddNode);
