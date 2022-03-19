import { SET_ITEMS } from '../actions/types';

const initialState = {
    items: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_ITEMS: () => {
            const newState = {
                ...state,
                items: action.payload
            }
            console.log("newstate: ", newState);
            return newState;
        }
        default:
            return state;
    }
}