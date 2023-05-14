import { toast } from "react-toastify";
import {
 
  FORM_DELETED_FAIL,
  FORM_DELETED_REQUEST,
  FORM_DELETED_SUCCESS,
  FORM_LOAD_ALL_FAIL,
  FORM_LOAD_ALL_REQUEST,
  FORM_LOAD_ALL_SUCCESS,
  FORM_LOAD_SINGLE_FAIL,
  FORM_LOAD_SINGLE_REQUEST,
  FORM_LOAD_SINGLE_SUCCESS,
} from "../constants/FormConstants";
import axios from "axios";

// export const formLoadAction =
//   (pageNumber, keyword = "", tagFilter = "", location = "") =>
//   async (dispatch) => {
//     dispatch({ type: FORM_LOAD_REQUEST });
//     try {
//       const { data } = await axios.get(
//         `/api/jobs/jobs/show/?pageNumber=${pageNumber}&keyword=${keyword}&tag=${tagFilter}&location=${location}`
//       );
//       dispatch({
//         type: FORM_LOAD_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       dispatch({
//         type: FORM_LOAD_FAIL,
//         payload: error.response.data.error,
//       });
//     }
//     };


  //single form
//     export const formLoadSingledAction =
//   (id) =>
//   async (dispatch) => {
//     dispatch({ type: FORM_LOAD_SINGLE_REQUEST });
//     try {
//       const { data } = await axios.get(
//         `/api/admin/form/forms/${id}`
//       );
//       dispatch({
//         type: FORM_LOAD_SINGLE_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       dispatch({
//         type: FORM_LOAD_SINGLE_FAIL,
//         payload: error.response.data.error,
//       });
//     }
//   };

  export const formLoadallAction = () => async (dispatch) => {
    dispatch({ type: FORM_LOAD_ALL_REQUEST });
    try {
      const { data } = await axios.get(
        `/api/admin/form/forms`
      );
      dispatch({
        type: FORM_LOAD_ALL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FORM_LOAD_ALL_FAIL,
        payload: error.response.data.error,
      });
    }
    };

  
export const FormDeleteAction = (id) => async(dispatch)=> {
  dispatch({ type: FORM_DELETED_REQUEST });
  try {
    const { data } = await axios.delete(`/api/admin/form/${id}`)
    dispatch({
      type: FORM_DELETED_SUCCESS ,
        payload : data
    });
    toast.success("FORM Deleted Successfully")

  } catch (error) {
    dispatch({
      type: FORM_DELETED_FAIL,
      payload: error.response.data.errorMessage
  });
  toast.error(error.response.data.errorMessage)
  }

}

export const formLoadsingleAction = (id) => async (dispatch) => {
  dispatch({ type: FORM_LOAD_SINGLE_REQUEST });
  try {
    const { data } = await axios.get(
      `/api/admin/form/${id}`
    );
    dispatch({
      type: FORM_LOAD_SINGLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FORM_LOAD_SINGLE_FAIL,
      payload: error.response.data.error,
    });
  }
  };

// export const FormCreateAction = (form) => async(dispatch)=> {
//   dispatch({ type: FORM_CREATED_REQUEST});
//   try {
//     const { data } = await axios.post(`/api/forms/`,form)
//     dispatch({
//       type: FORM_CREATED_SUCCESS ,
//         payload : data
//     });
//     toast.success("FORM CREATED Successfully")

//   } catch (error) {
//     dispatch({
//       type: FORM_CREATED_FAIL,
//       payload: error.response.data.errorMessage
//   });
//   toast.error(error.response.data.errorMessage)
//   }

// }



