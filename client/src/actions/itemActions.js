import axios from "axios";
import { GET_ERRORS, SET_ITEMS } from "./types";


export const addItem = (itemData, history) => dispatch => {
    axios
        .post("http://localhost:5000/api/items/", itemData)
        .then(res => {
            // console.log("Res.data", res.data);
            dispatch(setCurrentItems(res.data))
            history.push("/dashboard")
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        }
        );
}

export const getItems = user => dispatch => {
    // console.log("getItems running");
    axios
        .get("http://localhost:5000/api/items/", {
            email: user.email
        })
        .then(res => {
            console.log("res ", items);
            const items = res.items;
            dispatch(setCurrentItems(items));
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        })
}

const setCurrentItems = items => {
    return {
        type: SET_ITEMS,
        payload: items
    }
}


const fetchPostsSuccess = posts => ({
    type: 'FETCH_POSTS_SUCCESS',
    payload: { posts }
})

/*asynchronous thunk action creator
  calls the api, then dispatches the synchronous action creator
*/
export const fetchPosts =  () => {
    return async dispatch => {
        try {
            let posts = await axios.get('https://jsonplaceholder.typicode.com/posts')
            dispatch(fetchPostsSuccess(posts.data.splice(0, 5))) //store first five posts
        }
        catch(e){
            console.log(e)
        }
    }
}