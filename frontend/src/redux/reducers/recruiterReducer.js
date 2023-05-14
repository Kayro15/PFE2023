import {
    USER_JOB_FAIL,
  USER_JOB_REQUEST,
  USER_JOB_RESET,
  USER_JOB_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_RESET,
  USER_PROFILE_SUCCESS,
} from "../constants/recruiterConstant";

export const RecruiterJob = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case USER_JOB_REQUEST:
      return { loading: true };
    case USER_JOB_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        pageNumber: action.payload.pageNumber,
        totalpages: action.payload.totalPages,
        count: action.payload.count,
        jobs: action.payload.data,
      };
    case USER_JOB_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_JOB_RESET:
      return {};
    default:
      return state;
  }
};

export const RecruiterProfile = (state = { profile: [] }, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true };
    case USER_PROFILE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        profile: action.payload.data,
      };
    case USER_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_PROFILE_RESET:
      return {};
    default:
      return state;
  }
}
