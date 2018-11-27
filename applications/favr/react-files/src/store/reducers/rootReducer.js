import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { reducer as nodesReducer, initialState as nodesInitial} from "./nodes";

export const initialState = {
  nodes: nodesInitial,
};

export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  nodes: nodesReducer,
});
