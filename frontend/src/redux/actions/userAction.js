import axios from "axios";
import {toast} from 'react-toastify'
import { ALL_USER_LOAD_FAIL, ALL_USER_LOAD_REQUEST, ALL_USER_LOAD_SUCCESS, EMAIL_CHECKED_FAIL, EMAIL_CHECKED_REQUEST, EMAIL_CHECKED_SUCCESS, USER_ADDED_FAIL, USER_ADDED_REQUEST, USER_ADDED_SUCCESS, USER_DELETED_FAIL, USER_DELETED_REQUEST, USER_DELETED_SUCCESS, USER_LOAD_PDF_SINGLE_FAIL, USER_LOAD_PDF_SINGLE_REQUEST, USER_LOAD_PDF_SINGLE_SUCCESS, USER_LOAD_SINGLE_FAIL, USER_LOAD_SINGLE_REQUEST, USER_LOAD_SINGLE_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_UPDATED_FAIL, USER_UPDATED_REQUEST, USER_UPDATED_SUCCESS } from "../constants/userConstant";
export const userSignInAction = (user) => async (dispatch) => {
    
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
        const { data } = await axios.post("/api/auth/login", user);
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        toast.success("Connexion réussie !");
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.message
        });
        toast.error(error.response.data.message);
    }
}

export const userLogoutAction = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });
    try {
        const { data } = await axios.get("/api/auth/logout");
        localStorage.removeItem('userInfo');
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Déconnexion réussie !");
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.message
        });
        toast.error(error.response.data.message);
    }
}

export const allUserAction = (pageNumber , pageSize) => async (dispatch) => {
    dispatch({ type: ALL_USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get( `/api/users/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        dispatch({
            type: ALL_USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_USER_LOAD_FAIL,
            payload: error.response.data.message
        });
    }
}

export const userSignUpAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST });
    try {
        const { data } = await axios.post("/api/auth/register", user);

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("Inscription réussie !");
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.message
        });
        toast.error(error.response.data.message);
    }
}

export const userDeleteAction = (id) => async (dispatch) => {
    dispatch({ type: USER_DELETED_REQUEST });
    try {
        const { data } = await axios.delete(`/api/admin/${id}`);
        dispatch({
            type: USER_DELETED_SUCCESS,
            payload: data
        });
        toast.success("Utilisateur supprimé avec succès.")
    } catch (error) {
        dispatch({
            type: USER_DELETED_FAIL,
            payload: error.response.data.errorMessage
        });
        toast.error(error.response.data.errorMessage)
    }
}


export const userAddAction = (user) => async (dispatch) => {
    dispatch({ type: USER_ADDED_REQUEST });
    try {
        const { data } = await axios.post("/api/users", user);

        dispatch({
            type: USER_ADDED_SUCCESS,
            payload: data
        });
        toast.success("Utilisateur ajouté avec succès !");
    } catch (error) {
        dispatch({
            type: USER_ADDED_FAIL,
            payload: error.response.data.message
        });
        toast.error(error.response.data.message);
    }
}

export const userUpdateAction = (id,user) => async (dispatch) => {
    dispatch({ type: USER_UPDATED_REQUEST });
    try {
        const { data } = await axios.put(`/api/admin/${id}`, user);

        dispatch({
            type: USER_UPDATED_SUCCESS,
            payload: data
        });
        toast.success("Utilisateur modifié avec succès !");
    } catch (error) {
        dispatch({
            type: USER_UPDATED_FAIL,
            payload: error.response.data.errorMessage,
        });
        toast.error(error.response.data.errorMessage);
    }
}

export const EmailCheckAction = (email) => async (dispatch) => {
    dispatch({ type: EMAIL_CHECKED_REQUEST });
    try {
        const { data } = await axios.post(`/api/users/check`, { email });

        dispatch({
            type: EMAIL_CHECKED_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: EMAIL_CHECKED_FAIL,
            payload: error.response.data.message
        });
    }
}
export const userLoadSingledAction =
(id) =>
async (dispatch) => {
  dispatch({ type: USER_LOAD_SINGLE_REQUEST });
  try {
    const { data } = await axios.get( `/api/users/${id}`
    );
    dispatch({
      type: USER_LOAD_SINGLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOAD_SINGLE_FAIL,
      payload: error.response.data.error,
    });
  }
        };

        export const userLoadSinglepdfdAction =
(id) =>
async (dispatch) => {
  dispatch({ type: USER_LOAD_PDF_SINGLE_REQUEST });
  try {
    const { data } = await axios.get( `/api/users/pdf/${id}`
    );
    dispatch({
      type: USER_LOAD_PDF_SINGLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOAD_PDF_SINGLE_FAIL,
      payload: error.response.data.error,
    });
  }
};

        

