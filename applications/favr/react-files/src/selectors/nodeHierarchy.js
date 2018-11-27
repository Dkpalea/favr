import { createSelector } from 'reselect';

const getNodesFromStore = state => state.firestore.data.nodes;

export const getVisibleTodos = createSelector(
  [getNodesFromStore],
  (activeTopicID, nodes) => {
    let outputObj = {};
    let parentKey = ``;
    Object.keys(nodes).map(key => {
      // get all nodes for the active topic and put them at the root level of
      //   the outputObj
      if (nodes[key].topicId === activeTopicID) {
        outputObj[key] = nodes[key];
        // find and set the parent key
        if (nodes[key].parent === true) {
          parentKey = key;
        }
      }
    });
    // outputObj now contains all the nodes it needs

    // TODO: need to create parent array in outputObj and follow d3 defined structure before using recursive function below

    const recursiveHierarchyBuild = (currentObj) => {
      // iterate through objects contained by currentObj
      //   if contained object has parent equal to currentParentKey
      //   then place it inside of currentObj.children[]

      // for each node in global root outputObj
      //  if node.parent == currentObj.parent
      //    let currentNode = node; Grabs reference to node before we append it
      //    append node to currentObj.children array
      //    recursiveHierarchy(currentNode)
    };

    recursiveHierarchyBuild(outputObj[parentKey]);
  }
);
