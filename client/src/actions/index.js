import axios from "axios";
import { FETCH_USER } from "./types";

//if redus-thunk sees that we returned a function
//it will call this function by basing by daspach() as an argument .
//check chapter 78
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};
