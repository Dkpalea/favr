export const initialState = { selectedNode: null };

export function reducer(state = initialState, action) {
  if (action.type === `selectNode`) {
    console.log(`ok`);
    return { ...state, selectedNode: action.nodeName };
  }
  return state;
}
