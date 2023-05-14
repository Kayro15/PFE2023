import { ALL_CANDIDATS_LOAD_FAIL, ALL_CANDIDATS_LOAD_REQUEST, ALL_CANDIDATS_LOAD_SUCCESS, ALL_JOBSEEKER_CANDIDATS_LOAD_FAIL, ALL_JOBSEEKER_CANDIDATS_LOAD_REQUEST, ALL_JOBSEEKER_CANDIDATS_LOAD_SUCCESS, ALL_RECRUITER_CANDIDATS_LOAD_FAIL, ALL_RECRUITER_CANDIDATS_LOAD_REQUEST, ALL_RECRUITER_CANDIDATS_LOAD_SUCCESS, CANDIDAT_ADDED_FAIL, CANDIDAT_ADDED_REQUEST, CANDIDAT_ADDED_SUCCESS, CANDIDAT_DELETED_FAIL, CANDIDAT_DELETED_REQUEST, CANDIDAT_DELETED_SUCCESS, CANDIDAT_LOAD_SINGLE_FAIL, CANDIDAT_LOAD_SINGLE_REQUEST, CANDIDAT_LOAD_SINGLE_SUCCESS, CANDIDAT_UPDATED_FAIL, CANDIDAT_UPDATED_REQUEST, CANDIDAT_UPDATED_SUCCESS } from "../constants/CandidatsConstant";
import axios from "axios";
import {toast} from 'react-toastify'
import { JOB_DELETED_REQUEST } from "../constants/jobConstant";
export const CandidatAddAction = (id,candidat) => async (dispatch) => {
    dispatch({ type: CANDIDAT_ADDED_REQUEST });
    try {
        const { data } = await axios.post(`/api/candidats/${id}`, candidat);

        dispatch({
            type: CANDIDAT_ADDED_SUCCESS,
            payload: data
        });
        toast.success("Candidature créé avec succès !");
    } catch (error) {
        dispatch({
            type: CANDIDAT_ADDED_FAIL,
            payload: error.response.data.errorMessage
        });
        toast.error("Candidature existant pour cette offre d'emploi.");
    }
}



export const allCandidatsaction = (pageNumber , pageSize) => async (dispatch) => {
    dispatch({ type: ALL_CANDIDATS_LOAD_REQUEST });
    try {
        const { data } = await axios.get( `/api/admin/Can/candidats/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        dispatch({
            type: ALL_CANDIDATS_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_CANDIDATS_LOAD_FAIL,
            payload: error.response.data.message
        });
    }
}



export const candidatDeleteAction = (idUser , idJob) => async (dispatch) => {
    dispatch({ type: CANDIDAT_DELETED_REQUEST });
    try {
        const { data } = await axios.delete(`/api/admin/candidat/${idUser}/jobid/${idJob}`);
        dispatch({
            type: CANDIDAT_DELETED_SUCCESS,
            payload: data
        });
        toast.success("Candidature supprimé avec succès")
    } catch (error) {
        dispatch({
            type: CANDIDAT_DELETED_FAIL,
            payload: error.response.data.errorMessage
        });
        toast.error(error.response.data.errorMessage)
    }
}
export const candidatDeleterecruiterAction = (idUser , idJob) => async (dispatch) => {
    dispatch({ type: CANDIDAT_DELETED_REQUEST });
    try {
        const { data } = await axios.delete(`/api/candidats/delete/${idUser}/jobid/${idJob}`);
        dispatch({
            type: CANDIDAT_DELETED_SUCCESS,
            payload: data
        });
        toast.success("Candidature supprimé avec succès")
    } catch (error) {
        dispatch({
            type: CANDIDAT_DELETED_FAIL,
            payload: error.response.data.errorMessage
        });
        toast.error(error.response.data.errorMessage)
    }
}
export const candidatLoadSingledAction =
(idUser,idJob) =>
async (dispatch) => {
  dispatch({ type: CANDIDAT_LOAD_SINGLE_REQUEST });
  try {
    const { data } = await axios.get(`/api/candidats/candidat/${idUser}/jobid/${idJob}`
    );
    dispatch({
      type: CANDIDAT_LOAD_SINGLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CANDIDAT_LOAD_SINGLE_FAIL,
      payload: error.response.data.error,
    });
  }
        };

        export const candidatUpdateAction = (idUser,idJob,candidat) => async (dispatch) => {
            dispatch({ type: CANDIDAT_UPDATED_REQUEST });
            try {
                const { data } = await axios.put(`/api/candidats/${idUser}/jobid/${idJob}`, candidat);
        
                dispatch({
                    type: CANDIDAT_UPDATED_SUCCESS,
                    payload: data
                });
                toast.success("Candidature mise à jour avec succès !");
            } catch (error) {
                dispatch({
                    type: CANDIDAT_UPDATED_FAIL,
                    payload: error.response.data.errorMessage,
                });
                toast.error(error.response.data.errorMessage);
            }
}

export const allrecruiterCandidatsaction = (idJob,pageNumber , pageSize) => async (dispatch) => {
    dispatch({ type: ALL_RECRUITER_CANDIDATS_LOAD_REQUEST });
    try {
        const { data } = await axios.get( `/api/candidats/score/job_id/${idJob}/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        dispatch({
            type: ALL_RECRUITER_CANDIDATS_LOAD_SUCCESS,
            payload: data
        });

 
    } catch (error) {
        dispatch({
            type: ALL_RECRUITER_CANDIDATS_LOAD_FAIL,
            payload: error.response.data.message
        });
    }
}

export const alljobseekerCandidatsaction = (pageNumber , pageSize) => async (dispatch) => {
    dispatch({ type: ALL_JOBSEEKER_CANDIDATS_LOAD_REQUEST });
    try {
        const { data } = await axios.get( `/api/candidats/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        dispatch({
            type: ALL_JOBSEEKER_CANDIDATS_LOAD_SUCCESS,
            payload: data
        });

 
    } catch (error) {
        dispatch({
            type: ALL_JOBSEEKER_CANDIDATS_LOAD_FAIL,
            payload: error.response.data.message
        });
    }
}

export const jobseekercandidatDeleteAction = ( idJob) => async (dispatch) => {
    dispatch({ type: CANDIDAT_DELETED_REQUEST });
    try {
        const { data } = await axios.delete(`/api/candidats/delete/job_id/${idJob}`);
        dispatch({
            type: CANDIDAT_DELETED_SUCCESS,
            payload: data
        });
        toast.success("Candidature supprimé avec succès")
    } catch (error) {
        dispatch({
            type: CANDIDAT_DELETED_FAIL,
            payload: error.response.data.errorMessage
        });
        toast.error(error.response.data.errorMessage)
    }
}