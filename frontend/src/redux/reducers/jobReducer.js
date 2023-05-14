import { JOB_CREATED_FAIL, JOB_CREATED_REQUEST, JOB_CREATED_RESET, JOB_CREATED_SUCCESS, JOB_DELETED_FAIL, JOB_DELETED_REQUEST, JOB_DELETED_RESET, JOB_DELETED_SUCCESS, JOB_LOAD_ALL_FAIL, JOB_LOAD_ALL_REQUEST, JOB_LOAD_ALL_RESET, JOB_LOAD_ALL_SUCCESS, JOB_LOAD_FAIL, JOB_LOAD_REQUEST, JOB_LOAD_RESET, JOB_LOAD_SINGLE_FAIL, JOB_LOAD_SINGLE_REQUEST, JOB_LOAD_SINGLE_RESET, JOB_LOAD_SINGLE_SUCCESS, JOB_LOAD_SUCCESS, JOB_UPDATED_FAIL, JOB_UPDATED_REQUEST, JOB_UPDATED_RESET, JOB_UPDATED_SUCCESS, JOB_VERIFIED_FAIL, JOB_VERIFIED_REQUEST, JOB_VERIFIED_RESET, JOB_VERIFIED_SUCCESS } from "../constants/jobConstant";

export const loadJobReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case JOB_LOAD_REQUEST:
      return { loading: true };
    case JOB_LOAD_SUCCESS:
      return {
        loading: false,
        success: action.payload.sucess,
        pageNumber: action.payload.pageNumber,
        totalpages: action.payload.totalPages,
        count: action.payload.count,
        uniqtags: action.payload.uniquetags,
        uniqlocation:action.payload.uniquelocation,
        jobs: action.payload.data,
      };
    case JOB_LOAD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case JOB_LOAD_RESET:
      return {};
    default:
      return state;
  }
};

//single job

export const loadSingleJobReducer = (state = { singlejob: [] }, action) => {
  switch (action.type) {
    case JOB_LOAD_SINGLE_REQUEST:
      return { loading: true };
    case JOB_LOAD_SINGLE_SUCCESS:
      return {
        loading: false,
        success: action.payload.sucess,
        message:action.payload.sucess,
        singlejob: action.payload.data,
      };
    case JOB_LOAD_SINGLE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case JOB_LOAD_SINGLE_RESET:
      return {};
    default:
      return state;
  }
};

export const loadallJobReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case JOB_LOAD_ALL_REQUEST:
      return { loading: true };
    case JOB_LOAD_ALL_SUCCESS:
      return {
        loading: false,
        success: action.payload.sucess,
        pageNumber: action.payload.pageNumber,
        totalpages: action.payload.totalPages,
        count: action.payload.count,
        pageSize:action.payload.pageSize,
        jobs: action.payload.data,
      };
    case JOB_LOAD_ALL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case JOB_LOAD_ALL_RESET:
      return {};
    default:
      return state;
  }
};


export const JobReducerVerified = (state = {}, action) => {
  switch (action.type) {
      case JOB_VERIFIED_REQUEST:
          return { loading: true }
      case JOB_VERIFIED_SUCCESS:
          return {
              loading: false, 
              userDeleted:action.payload,
          }
      case JOB_VERIFIED_FAIL:
          return { success: false, loadin: false, error: action.payload }
      case JOB_VERIFIED_RESET:
          return {}
      default:
          return state;
  }
}


export const jobReducerDelete = (state = {}, action) => {
  switch (action.type) {
      case JOB_DELETED_REQUEST:
          return { loading: true }
      case JOB_DELETED_SUCCESS:
          return {
              loading: false, 
              userDeleted:action.payload,
          }
      case JOB_DELETED_FAIL:
          return { success: false, loadin: false, error: action.payload }
      case JOB_DELETED_RESET:
          return {}
      default:
          return state;
  }
}

export const jobReducerAdd = (state = {}, action) => {
  switch (action.type) {
      case JOB_CREATED_REQUEST:
          return { loading: true }
      case JOB_CREATED_SUCCESS:
          return {
              success:true,
              laoding: false,
              userAdded:action.payload ,
          }
      case JOB_CREATED_FAIL:
          return { success: false, loading: false, error: action.payload }
      case JOB_CREATED_RESET:
          return {}
      default:
          return state;
  }
}

export const JobReducerupdate = (state = {}, action) => {
  switch (action.type) {
      case JOB_UPDATED_REQUEST:
          return { loading: true }
      case JOB_UPDATED_SUCCESS:
          return {
              success:true,
              laoding: false,
              userUpdated:action.payload ,
          }
      case JOB_UPDATED_FAIL:
          return { success: false, loading: false, error: action.payload }
      case JOB_UPDATED_RESET:
          return {}
      default:
          return state;
  }
}

