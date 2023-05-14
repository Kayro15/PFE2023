import {
    USER_JOB_FAIL,
  USER_JOB_REQUEST,
  USER_JOB_RESET,
  USER_JOB_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
} from "../constants/recruiterConstant";
  import axios from "axios";


export const userProfileAction = () => async (dispatch) => {
    dispatch({ type: USER_JOB_REQUEST });
    try {
        const { data } = await axios.get("/api/jobs/jobs");
        dispatch({
            type: USER_JOB_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_JOB_FAIL,
            payload: error.response.data.message
        });
    }
}

export const RecruiterProfileAction = () => async (dispatch) => {
    dispatch({ type: USER_PROFILE_REQUEST });
    try {
        const { data } = await axios.get("/api/users/user");
        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response.data.message
        });
    }
}