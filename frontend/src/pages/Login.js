import { Avatar, Box } from '@mui/material'
import React, { useEffect } from 'react'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
import LockClockOutlined from '@mui/icons-material/LockClockOutlined'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { userSignInAction } from '../redux/actions/userAction'
import { useNavigate } from 'react-router-dom'
import { Dashboard } from '@mui/icons-material'

const validationSchema = yup.object({
    email: yup
        .string('Enter ton email')
        .email('Entrer un email valide')
        .required("Email requis"),
    password: yup
        .string('Enter ton mot de passe')
        .min(8, 'Le mot de passe doit comporter au moins 8 caractères')
        .required('Mot de passe requis'),
});



const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo,isAuthenticated } = useSelector(state => state.signIn);
    useEffect(() => {
        if (isAuthenticated) {
            if (userInfo.role == 'recruiter')
            {
            navigate('/recruiter/dashboard')
            }
            else
            {
                if (userInfo.role == 'job_seeker')
                {
                    navigate('/job_seeker/dashboard')
                }
                else
                {
                    navigate('/admin/dashboard')
                }
            }

            
        }
    }, [isAuthenticated])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            //  alert(JSON.stringify(values, null, 2));
            dispatch(userSignInAction(values));
            actions.resetForm();
        }

    })

    return (
        <>
            <Navbar />
            <Box sx={{ height: '91vh', display: "flex", alignItems: "center", justifyContent: "center" }}>


                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
                            <LockClockOutlined />
                        </Avatar>
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="email"
                            label="E-mail"
                            name='email'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="E-mail"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="password"
                            name="password"
                            label="Mot de passe"
                            type="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Mot de passe"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />

                        <Button fullWidth variant="contained" type='submit' >Se connecter</Button>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default LogIn