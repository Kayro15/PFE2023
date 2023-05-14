import { toast } from "react-toastify";
import {
  JOB_CREATED_FAIL,
  JOB_CREATED_REQUEST,
  JOB_CREATED_SUCCESS,
  JOB_DELETED_FAIL,
  JOB_DELETED_REQUEST,
  JOB_DELETED_SUCCESS,
  JOB_LOAD_ALL_FAIL,
  JOB_LOAD_ALL_REQUEST,
  JOB_LOAD_ALL_SUCCESS,
  JOB_LOAD_FAIL,
  JOB_LOAD_REQUEST,
  JOB_LOAD_SINGLE_FAIL,
  JOB_LOAD_SINGLE_REQUEST,
  JOB_LOAD_SINGLE_SUCCESS,
  JOB_LOAD_SUCCESS,
  JOB_UPDATED_FAIL,
  JOB_UPDATED_REQUEST,
  JOB_UPDATED_SUCCESS,
  JOB_VERIFIED_FAIL,
  JOB_VERIFIED_REQUEST,
  JOB_VERIFIED_SUCCESS,
} from "../constants/jobConstant";
import axios from "axios";
export const jobLoadAction =
  (pageNumber, keyword = "", tagFilter = "", location = "") =>
  async (dispatch) => {
    dispatch({ type: JOB_LOAD_REQUEST });
    try {
      const { data } = await axios.get(
        `/api/jobs/jobs/show/?pageNumber=${pageNumber}&keyword=${keyword}&tag=${tagFilter}&location=${location}`
      );
      dispatch({
        type: JOB_LOAD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: JOB_LOAD_FAIL,
        payload: error.response.data.error,
      });
    }
    };
  //single job
    export const jobLoadSingledAction =
  (id) =>
  async (dispatch) => {
    dispatch({ type: JOB_LOAD_SINGLE_REQUEST });
    try {
      const { data } = await axios.get(
        `/api/jobs/${id}`
      );
      dispatch({
        type: JOB_LOAD_SINGLE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: JOB_LOAD_SINGLE_FAIL,
        payload: error.response.data.error,
      });
    }
  };

  export const jobLoadallAction =
  (pageNumber, pageSize) =>
  async (dispatch) => {
    dispatch({ type: JOB_LOAD_ALL_REQUEST });
    try {
      const { data } = await axios.get(
        `/api/jobs/?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      dispatch({
        type: JOB_LOAD_ALL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: JOB_LOAD_ALL_FAIL,
        payload: error.response.data.error,
      });
    }
    };

    export const JobVerifiedAction = (id) => async (dispatch) => {
      dispatch({ type: JOB_VERIFIED_REQUEST });
      try {
          const { data } = await axios.put(`/api/admin//verifier/${id}`);
          dispatch({
              type: JOB_VERIFIED_SUCCESS,
              payload: data
          });
          toast.success("Offre d'emploi approuvée avec succès")
      } catch (error) {
          dispatch({
              type: JOB_VERIFIED_FAIL,
              payload: error.response.data.errorMessage
          });
          toast.error(error.response.data.errorMessage)
      }
}
  
export const JobDeleteAction = (id) => async(dispatch)=> {
  dispatch({ type: JOB_DELETED_REQUEST });
  try {
    const { data } = await axios.delete(`/api/jobs/${id}`)
    dispatch({
      type: JOB_DELETED_SUCCESS ,
        payload : data
    });
    toast.success("Offre d'emploi supprimée avec succès")

  } catch (error) {
    dispatch({
      type: JOB_DELETED_FAIL,
      payload: error.response.data.errorMessage
  });
  toast.error(error.response.data.errorMessage)
  }

}

export const JobCreateAction = (job) => async(dispatch)=> {
  dispatch({ type: JOB_CREATED_REQUEST});
  try {
    const { data } = await axios.post(`/api/jobs/`,job)
    dispatch({
      type: JOB_CREATED_SUCCESS ,
        payload : data
    });
    toast.success("Offre d'emploi créée avec succès")

  } catch (error) {
    dispatch({
      type: JOB_CREATED_FAIL,
      payload: error.response.data.errorMessage
  });
  toast.error(error.response.data.errorMessage)
  }

}

export const JobUpdateAction = (id,job) => async(dispatch)=> {
  dispatch({ type: JOB_UPDATED_REQUEST});
  try {
    const { data } = await axios.put(`/api/jobs/${id}`,job)
    dispatch({
      type: JOB_UPDATED_SUCCESS ,
        payload : data
    });
    toast.success("Offre d'emploi mise à jour avec succès")

  } catch (error) {
    dispatch({
      type: JOB_UPDATED_FAIL,
      payload: error.response.data.errorMessage
  });
  toast.error(error.response.data.errorMessage)
  }

}