import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { JobReducerVerified, JobReducerupdate, jobReducerAdd, jobReducerDelete, loadJobReducer, loadSingleJobReducer, loadallJobReducer } from "./reducers/jobReducer";
import { allUserReducer, loadSingleUserPDFReducer, loadSingleUserReducer, userChekcEmail, userReducerAdd, userReducerDelete, userReducerLogout, userReducerSignIn, userReducerSignUp, userReducerupdate } from "./reducers/UserReducer";
import { RecruiterJob, RecruiterProfile } from "./reducers/recruiterReducer";
import { CandidatReducerAdd, allcandidatsReducer, alljobseekercandidatsReducer, allrecruitercandidatsReducer, candidatReducerDelete, loadSingleCandidatReducer } from "./reducers/CandidatsReducer";
import { formReducerDelete, loadallFormsReducer, loadsingleFormReducer } from "./reducers/FormReducer";

//combine reducers
const reducer = combineReducers({
  loadJobs: loadJobReducer,
  loadAllJobs: loadallJobReducer,
  signIn: userReducerSignIn,
  logOut: userReducerLogout,
  job: RecruiterJob,
  profiles: RecruiterProfile,
  singleJob: loadSingleJobReducer,
  allusers: allUserReducer,
  signUp: userReducerSignUp,
  deleteuser: userReducerDelete ,
  jobverif: JobReducerVerified,
  deletejob: jobReducerDelete,
  adduser: userReducerAdd,
  updateuser: userReducerupdate,
  emailcheck: userChekcEmail,
  singleUser: loadSingleUserReducer,
  addjob: jobReducerAdd,
  updatejob: JobReducerupdate,
  addcandidat: CandidatReducerAdd,
  allcandidats: allcandidatsReducer,
  deletecandidats: candidatReducerDelete,
  singleCandidat: loadSingleCandidatReducer,
  allrecruitercandidats: allrecruitercandidatsReducer,
  singleUserpdf: loadSingleUserPDFReducer,
  alljobseekercandidats:alljobseekercandidatsReducer,
  allforms:loadallFormsReducer,
  deleteform :formReducerDelete,
  singleform : loadsingleFormReducer,
});

//initial state
let initialState = {
  signIn: {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
