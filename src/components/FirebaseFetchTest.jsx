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
    const {
      selectedNode,
      selectNode,
    } = this.props;
    const styles = {
      padding: `1rem`,
      cursor: `pointer`,
    };
    let isSelected = false;
    console.log(nodeName);
    console.log(selectedNode);
    console.log(`--------`);
    if (nodeName === selectedNode) {
      styles.backgroundColor = `#988afe`;
      isSelected = true;
    }
    return (
      <div
        key={nodeName}
        role="option"
        style={styles}
        aria-selected={isSelected}
        onClick={() => selectNode(nodeName)}
      >
        {nodeName}
      </div>
    );
  }

  render() {
    const {
      nodes,
    } = this.props;
    const nodeItems = nodes.map(
      nodeName => this.renderNode(nodeName)
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
  selectedNode: PropTypes.string,
  selectNode: PropTypes.func.isRequired,
};

NodeList.defaultProps = {
  uid: null,
  nodes: [],
  selectedNode: null,
};

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
    nodes: state.firestore.ordered.nodes ? state.firestore.ordered.nodes.map(n => n.name) : [],
    selectedNode: state.nodes.selectedNode,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    selectNode: nodeName => dispatch({ type: `selectNode`, nodeName }),
  };
};

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
