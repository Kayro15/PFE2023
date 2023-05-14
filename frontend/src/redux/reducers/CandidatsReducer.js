import { ALL_CANDIDATS_LOAD_FAIL, ALL_CANDIDATS_LOAD_REQUEST, ALL_CANDIDATS_LOAD_RESET, ALL_CANDIDATS_LOAD_SUCCESS, ALL_JOBSEEKER_CANDIDATS_LOAD_FAIL, ALL_JOBSEEKER_CANDIDATS_LOAD_REQUEST, ALL_JOBSEEKER_CANDIDATS_LOAD_RESET, ALL_JOBSEEKER_CANDIDATS_LOAD_SUCCESS, ALL_RECRUITER_CANDIDATS_LOAD_FAIL, ALL_RECRUITER_CANDIDATS_LOAD_REQUEST, ALL_RECRUITER_CANDIDATS_LOAD_RESET, ALL_RECRUITER_CANDIDATS_LOAD_SUCCESS, CANDIDAT_ADDED_FAIL, CANDIDAT_ADDED_REQUEST, CANDIDAT_ADDED_RESET, CANDIDAT_ADDED_SUCCESS, CANDIDAT_DELETED_FAIL, CANDIDAT_DELETED_REQUEST, CANDIDAT_DELETED_RESET, CANDIDAT_DELETED_SUCCESS, CANDIDAT_LOAD_SINGLE_FAIL, CANDIDAT_LOAD_SINGLE_REQUEST, CANDIDAT_LOAD_SINGLE_RESET, CANDIDAT_LOAD_SINGLE_SUCCESS, CANDIDAT_UPDATED_FAIL, CANDIDAT_UPDATED_REQUEST, CANDIDAT_UPDATED_RESET, CANDIDAT_UPDATED_SUCCESS } from "../constants/CandidatsConstant"

export const CandidatReducerAdd = (state = {}, action) => {
    switch (action.type) {
        case CANDIDAT_ADDED_REQUEST:
            return { loading: true }
        case CANDIDAT_ADDED_SUCCESS:
            return {
                success:true,
                laoding: false,
                CANDIDATAdded:action.payload ,
            }
        case CANDIDAT_ADDED_FAIL:
            return { success: false, loading: false, error: action.payload }
        case CANDIDAT_ADDED_RESET:
            return {}
        default:
            return state;
    }
}


export const allcandidatsReducer = (state = { candidats: [] }, action) => {
    switch (action.type) {
        case ALL_CANDIDATS_LOAD_REQUEST:
            return { loading: true, users: [] }
        case ALL_CANDIDATS_LOAD_SUCCESS:
            return {
                candidats: action.payload,
            }
        case ALL_CANDIDATS_LOAD_FAIL:
            return { loading: false, users: [], error: action.payload }
        case ALL_CANDIDATS_LOAD_RESET:
            return {}
        default:
            return state;
    }

}

export const candidatReducerDelete = (state = {}, action) => {
    switch (action.type) {
        case CANDIDAT_DELETED_REQUEST:
            return { loading: true }
        case CANDIDAT_DELETED_SUCCESS:
            return {
                
                loading: false, 
                candidatDeleted:action.payload,
            }
        case CANDIDAT_DELETED_FAIL:
            return { success: false, loading: false, error: action.payload }
        case CANDIDAT_DELETED_RESET:
            return {}
        default:
            return state;
    }
}

export const loadSingleCandidatReducer = (state = { singleCandidat: [] }, action) => {
    switch (action.type) {
      case CANDIDAT_LOAD_SINGLE_REQUEST:
        return { loading: true };
      case CANDIDAT_LOAD_SINGLE_SUCCESS:
        return {
          loading: true,
          success: action.payload.sucess,
          singleCandidat: action.payload.data,
        };
      case CANDIDAT_LOAD_SINGLE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CANDIDAT_LOAD_SINGLE_RESET:
        return {};
      default:
        return state;
    }
};
  
export const candidatReducerupdate = (state = {}, action) => {
    switch (action.type) {
        case CANDIDAT_UPDATED_REQUEST:
            return { loading: true }
        case CANDIDAT_UPDATED_SUCCESS:
            return {
                success:true,
                laoding: false,
                candidatpdated:action.payload ,
            }
        case CANDIDAT_UPDATED_FAIL:
            return { success: false, loading: false, error: action.payload }
        case CANDIDAT_UPDATED_RESET:
            return {}
        default:
            return state;
    }
}

export const allrecruitercandidatsReducer = (state = { candidats: [] }, action) => {
    switch (action.type) {
        case ALL_RECRUITER_CANDIDATS_LOAD_REQUEST:
            return { loading: true, users: [] }
        case ALL_RECRUITER_CANDIDATS_LOAD_SUCCESS:
            return {
                candidats: action.payload,
            }
        case ALL_RECRUITER_CANDIDATS_LOAD_FAIL:
            return { loading: false, users: [], error: action.payload }
        case ALL_RECRUITER_CANDIDATS_LOAD_RESET:
            return {}
        default:
            return state;
    }

}


export const alljobseekercandidatsReducer = (state = { candidats: [] }, action) => {
    switch (action.type) {
        case ALL_JOBSEEKER_CANDIDATS_LOAD_REQUEST:
            return { loading: true, users: [] }
        case ALL_JOBSEEKER_CANDIDATS_LOAD_SUCCESS:
            return {
                candidats: action.payload,
            }
        case ALL_JOBSEEKER_CANDIDATS_LOAD_FAIL:
            return { loading: false, users: [], error: action.payload }
        case ALL_JOBSEEKER_CANDIDATS_LOAD_RESET:
            return {}
        default:
            return state;
    }

}



export const jobseekercandidatReducerDelete = (state = {}, action) => {
    switch (action.type) {
        case CANDIDAT_DELETED_REQUEST:
            return { loading: true }
        case CANDIDAT_DELETED_SUCCESS:
            return {
                
                loading: false, 
                candidatDeleted:action.payload,
            }
        case CANDIDAT_DELETED_FAIL:
            return { success: false, loading: false, error: action.payload }
        case CANDIDAT_DELETED_RESET:
            return {}
        default:
            return state;
    }
}
