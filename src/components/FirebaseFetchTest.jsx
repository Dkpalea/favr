import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import AddNode from './FirebaseTestComponent';

class NodeList extends Component {

  constructor(props) {
    super(props);
  }

  renderNode(nodeName) {
    return (
      <div key={nodeName}>
        {nodeName}
      </div>
    );
  }

  render() {
    const {
      nodes,
    } = this.props;
    const nodeItems = nodes.map(
      name => this.renderNode(name)
    );
    return (
      <div>
        <div>
          {nodeItems}
        </div>
        <AddNode />
      </div>
    );
  }
}

NodeList.propTypes = {
  uid: PropTypes.string,
  nodes: PropTypes.arrayOf(PropTypes.string),
};

NodeList.defaultProps = {
  uid: null,
  nodes: [],
};

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
    nodes: state.firestore.ordered.nodes ? state.firestore.ordered.nodes.map(n => n.name) : [],
  };
};
const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect( props => {
    if (!props.uid) return [];
    return [
      {
        collection: `nodes`,
        where: [
          [`uid`, `==`, props.uid],
        ],
      },
    ];
  }
  )
)(NodeList);
