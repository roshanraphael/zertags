import { SET_ITEMS } from '../actions/types';

const initialState = {
    items: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ITEMS:
            return {
                ...state,
                items: action.payload
            }
        case 'FETCH_POSTS_SUCCESS':
            return action.payload.posts
        default:
            return state;
    }
}