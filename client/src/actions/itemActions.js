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

const setCurrentItems = items => {
    return {
        type: SET_ITEMS,
        payload: items
    }
}