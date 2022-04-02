import axios from "axios";
import { GET_ERRORS, SET_ITEMS } from "./types";

export const addItem = (itemData, history) => dispatch => {
    axios
        .post("/api/items/", itemData)
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
        .get("/api/items/", {
            email: user.email
        })
        .then(res => {
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