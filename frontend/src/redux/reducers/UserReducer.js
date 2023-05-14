import { SubjectRounded } from "@mui/icons-material"
import {
    ALL_USER_LOAD_FAIL,
    ALL_USER_LOAD_REQUEST,
    ALL_USER_LOAD_RESET,
    ALL_USER_LOAD_SUCCESS,
    EMAIL_CHECKED_FAIL,
    EMAIL_CHECKED_REQUEST,
    EMAIL_CHECKED_RESET,
    EMAIL_CHECKED_SUCCESS,
    USER_ADDED_FAIL,
    USER_ADDED_REQUEST,
    USER_ADDED_RESET,
    USER_ADDED_SUCCESS,
    USER_DELETED_FAIL,
    USER_DELETED_REQUEST,
    USER_DELETED_RESET,
    USER_DELETED_SUCCESS,
    USER_LOAD_PDF_SINGLE_FAIL,
    USER_LOAD_PDF_SINGLE_REQUEST,
    USER_LOAD_PDF_SINGLE_RESET,
    USER_LOAD_PDF_SINGLE_SUCCESS,
    USER_LOAD_SINGLE_FAIL,
    USER_LOAD_SINGLE_REQUEST,
    USER_LOAD_SINGLE_RESET,
    USER_LOAD_SINGLE_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_RESET,
    USER_LOGOUT_SUCCESS,
    // USER_LOAD_FAIL,
    // USER_LOAD_REQUEST,
    // USER_LOAD_RESET,
    // USER_LOAD_SUCCESS,
    // USER_LOGOUT_FAIL,
    // USER_LOGOUT_REQUEST,
    // USER_LOGOUT_RESET, USER_LOGOUT_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_RESET,
    USER_SIGNIN_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_RESET,
    USER_SIGNUP_SUCCESS,
    USER_UPDATED_FAIL,
    USER_UPDATED_REQUEST,
    USER_UPDATED_RESET,
    USER_UPDATED_SUCCESS
} from "../constants/userConstant"


export const userReducerSignIn = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true, userInfo: null, isAuthenticated: false }
        case USER_SIGNIN_SUCCESS:
            return {

                loading: false,
                userInfo: action.payload,
                isAuthenticated: true
            }
        case USER_SIGNIN_FAIL:
            return { loading: false, userInfo: null, isAuthenticated: false, error: action.payload }
        case USER_SIGNIN_RESET:
            return {}
        default:
            return state;
    }

}

// //user profile
// export const userReducerProfile = (state = { user: null }, action) => {
//     switch (action.type) {
//         case USER_LOAD_REQUEST:
//             return { loading: true, user: null }
//         case USER_LOAD_SUCCESS:
//             return {
//                 loading: false,
//                 user: action.payload.user,
//             }
//         case USER_LOAD_FAIL:
//             return { loading: false, user: null, error: action.payload }
//         case USER_LOAD_RESET:
//             return {}
//         default:
//             return state;
//     }

// }

//log out reducer
export const userReducerLogout = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGOUT_REQUEST:
            return { loading: true }
        case USER_LOGOUT_SUCCESS:
            return {
                loading: false,
                user: action.payload,
            }
        case USER_LOGOUT_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT_RESET:
            return {}
        default:
            return state;
    }

}


//all users

export const allUserReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USER_LOAD_REQUEST:
            return { loading: true, users: [] }
        case ALL_USER_LOAD_SUCCESS:
            return {
                users: action.payload,
            }
        case ALL_USER_LOAD_FAIL:
            return { loading: false, users: [], error: action.payload }
        case ALL_USER_LOAD_RESET:
            return {}
        default:
            return state;
    }

}

export const userReducerSignUp = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return { loading: true }
        case USER_SIGNUP_SUCCESS:
            return {
                success:true,
                loading: false,
                userSignUp: action.payload,
            }
        case USER_SIGNUP_FAIL:
            return { success:false ,loading: false, error: action.payload }
        case USER_SIGNUP_RESET:
            return {}
        default:
            return state;
    }
}

export const userReducerDelete = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETED_REQUEST:
            return { loading: true }
        case USER_DELETED_SUCCESS:
            return {
                
                loading: false, 
                userDeleted:action.payload,
            }
        case USER_DELETED_FAIL:
            return { success: false, loading: false, error: action.payload }
        case USER_DELETED_RESET:
            return {}
        default:
            return state;
    }
}

export const userReducerAdd = (state = {}, action) => {
    switch (action.type) {
        case USER_ADDED_REQUEST:
            return { loading: true }
        case USER_ADDED_SUCCESS:
            return {
                success:true,
                laoding: false,
                userAdded:action.payload ,
            }
        case USER_ADDED_FAIL:
            return { success: false, loading: false, error: action.payload }
        case USER_ADDED_RESET:
            return {}
        default:
            return state;
    }
}

export const userReducerupdate = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATED_REQUEST:
            return { loading: true }
        case USER_UPDATED_SUCCESS:
            return {
                success:true,
                laoding: false,
                userUpdated:action.payload ,
            }
        case USER_UPDATED_FAIL:
            return { success: false, loading: false, error: action.payload }
        case USER_UPDATED_RESET:
            return {}
        default:
            return state;
    }
}

export const userChekcEmail = (state = {}, action) => {
    switch (action.type) {
        case EMAIL_CHECKED_REQUEST:
            return { loading: true }
        case EMAIL_CHECKED_SUCCESS:
            return {
                emailcheck: action.payload ,
            }
        case EMAIL_CHECKED_FAIL:
            return { success: false, loading: false, error: action.payload }
        case EMAIL_CHECKED_RESET:
            return {}
        default:
            return state;
    }
}

export const loadSingleUserReducer = (state = { singleuser: [] }, action) => {
    switch (action.type) {
      case USER_LOAD_SINGLE_REQUEST:
        return { loading: true };
      case USER_LOAD_SINGLE_SUCCESS:
        return {
          loading: false,
          success: action.payload.sucess,
          singleuser: action.payload.data,
        };
      case USER_LOAD_SINGLE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case USER_LOAD_SINGLE_RESET:
        return {};
      default:
        return state;
    }
};
export const loadSingleUserPDFReducer = (state = { singleuser: [] }, action) => {
    switch (action.type) {
      case USER_LOAD_PDF_SINGLE_REQUEST:
        return { loading: true };
      case USER_LOAD_PDF_SINGLE_SUCCESS:
        return {
          loading: false,
          success: action.payload.sucess,
          singleuser: action.payload.data,
        };
      case USER_LOAD_PDF_SINGLE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case USER_LOAD_PDF_SINGLE_RESET:
        return {};
      default:
        return state;
    }
  };