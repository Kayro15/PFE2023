import { FORM_DELETED_FAIL, FORM_DELETED_REQUEST, FORM_DELETED_RESET, FORM_DELETED_SUCCESS, FORM_LOAD_ALL_FAIL, FORM_LOAD_ALL_REQUEST, FORM_LOAD_ALL_RESET, FORM_LOAD_ALL_SUCCESS, FORM_LOAD_SINGLE_FAIL, FORM_LOAD_SINGLE_REQUEST, FORM_LOAD_SINGLE_RESET, FORM_LOAD_SINGLE_SUCCESS} from "../constants/FormConstants";


  export const loadallFormsReducer = (state = { forms: [] }, action) => {
    switch (action.type) {
      case FORM_LOAD_ALL_REQUEST:
        return { loading: true };
      case FORM_LOAD_ALL_SUCCESS:
        return {
          loading: false,
          forms: action.payload.data,
        };
      case FORM_LOAD_ALL_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case FORM_LOAD_ALL_RESET:
        return {};
      default:
        return state;
    }
  };

  export const formReducerDelete = (state = {}, action) => {
    switch (action.type) {
        case FORM_DELETED_REQUEST:
            return { loading: true }
        case FORM_DELETED_SUCCESS:
            return {
                loading: false, 
                formDeleted:action.payload,
            }
        case FORM_DELETED_FAIL:
            return { success: false, loadin: false, error: action.payload }
        case FORM_DELETED_RESET:
            return {}
        default:
            return state;
    }
  }


export const loadsingleFormReducer = (state = { form: [] }, action) => {
  switch (action.type) {
    case FORM_LOAD_SINGLE_REQUEST:
      return { loading: true };
    case FORM_LOAD_SINGLE_SUCCESS:
      return {
        loading: false,
        form: action.payload.data,
      };
    case FORM_LOAD_SINGLE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case FORM_LOAD_SINGLE_RESET:
      return {};
    default:
      return state;
  }
};