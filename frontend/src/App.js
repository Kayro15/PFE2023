import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { CssBaseline, ThemeProvider, makeStyles } from '@mui/material';
import { theme } from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import LogIn from './pages/Login';
import UserDashboard from './pages/user/RecruiterDashboard';
import UserRoute from './component/UserRoute';
import AdminRoute from './component/AdminRoute';
import Layout from './pages/global/Layout';
import UserJobsHistory from './pages/user/JobhistoryDashboard';
import UserInfoDashboard from './pages/user/UserInfoDashboard';
import AdminDadhboard from './pages/admin/AdminDadhboard';
import SingleJob from './pages/SingleJob';
import DashUsers from './pages/admin/DashUsers';
import DashJobs from './pages/admin/DashJobs'
import Register from './pages/Register';
import FormComponent from './component/FormComponent';
import Update from './component/EditUserForm';
import { createContext } from 'react';
import { useState } from 'react';
import CreateJobs from './component/CreateJobForm';
import EditJob from './component/EditJobForm';
import ResumeForm from './component/CreateCandidats';
import Candidats from './pages/admin/DashCandidats';
import UpdateCandidat from './component/EditCandidatForm';
import RecruiterCandidats from './pages/user/CandidatsperJob';
import PDFViewer from './component/Resume';
import ComplexGrid from './pages/user/CandidatsJobseeker';
import jobseekerdashboard from './pages/user/Job_seekerDashboard';
import { CustomFormBuilder } from './component/form';
import { Button15 } from './component/test';
import DashForms from './pages/admin/DashForms';
import UserFormsHistory from './pages/user/formulaires';
import { Formulaire } from "./component/Formulaire" ;
import CustomForm from './component/CV';
//HOC
const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC=Layout(UserJobsHistory)
const UserInfoDashboardHOC = Layout(UserInfoDashboard)
const AdminDadhboardHOC = Layout(AdminDadhboard)
const DashUsersHOC = Layout(DashUsers)
const DashJobsHOC = Layout(DashJobs)
const CandidatsHOC = Layout(Candidats)
const UpdateHOC=Layout(Update)
const CreateJobsHOC=Layout(CreateJobs)
const EditJobHOC = Layout(EditJob)
const EditCandidatHOC = Layout(UpdateCandidat)
const RecruiterCandidatsHOC = Layout(RecruiterCandidats)
const ComplexGridHOC = Layout(ComplexGrid)
const JobseekerdashboardHOC=Layout(jobseekerdashboard)
const FormComponentHOC =Layout(FormComponent)
const CustomFormBuilderHOC= Layout(CustomFormBuilder)
const DashFormsHOC = Layout(DashForms)
const CVHOC=Layout(CustomForm)
const App = () => {
  
    return (
        <>
            <ToastContainer />
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ProSidebarProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/formulaires' element={<UserFormsHistory/>} />
                            <Route path='/user/remplir/:id' element={<Formulaire/>} />
                            <Route path="/job_seeker/cv" element={<CVHOC/>} />
                            {/* <Route path='/test' element={<Button15 />} /> */}
                            <Route path='/search/location/:location' element={<Home />} />
                           <Route path='/search/tag/:tagFilter' element={<Home />} />
                           <Route path='/search/:keyword' element={<Home />} />
                            <Route path='/login' element={<LogIn />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/job/:id' element={<SingleJob />} />
                            <Route path="/admin/dashboard" element={<AdminRoute><AdminDadhboardHOC /></AdminRoute>} />
                            <Route path="/admin/users" element={<AdminRoute><DashUsersHOC /></AdminRoute>} />
                            <Route path="/admin/jobs" element={<AdminRoute><DashJobsHOC /></AdminRoute>} />
                            <Route path="/admin/forms" element={<AdminRoute><DashFormsHOC /></AdminRoute>} />
                            <Route path="/admin/candidats" element={<AdminRoute><CandidatsHOC /></AdminRoute>} />
                            <Route path="/admin/form" element={<AdminRoute><CustomFormBuilderHOC /></AdminRoute>} />
                            <Route path="/recruiter/candidats/job_id/:idJob" element={<RecruiterCandidatsHOC />} />
                            <Route path="/admin/edit/candidat/:idUser/:idJob" element={<AdminRoute><EditCandidatHOC /></AdminRoute>} />
                            <Route path="/recruiter/edit/candidat/:idUser/:idJob" element={<EditCandidatHOC/>} />
                            <Route path='/user/add' element={<FormComponentHOC />} />
                            <Route path='/admin/edit/user/:id' element={<UpdateHOC />} />
                            <Route path='/admin/edit/job/:id' element={<EditJobHOC/>} />
                            <Route path='/job/add' element={<CreateJobsHOC />} />
                            <Route path='/candidats/add/:id' element={<ResumeForm />} />
                            <Route path='/recruiter/dashboard' element={<UserRoute>< UserDashboardHOC /></UserRoute>} />
                            <Route path='/recruiter/candidat/pdf/:idUser' element={<UserRoute><PDFViewer /></UserRoute>} />
                            <Route path='/job_seeker/dashboard' element={<UserRoute>< JobseekerdashboardHOC /></UserRoute>} />
                            <Route path='/job_seeker/candidats' element={<UserRoute><ComplexGridHOC /></UserRoute>} />
                            <Route path='/recruiter/jobs' element={<UserRoute>< UserJobsHistoryHOC /></UserRoute>} />
                            <Route path='/user/info' element={<UserRoute>< UserInfoDashboardHOC/></UserRoute>} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </ProSidebarProvider>
            </ThemeProvider>
        </>
    )
}

export default App