import {
  Avatar,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userAddAction, userSignUpAction } from "../redux/actions/userAction";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  fullName: yup
    .string("Entrez le prénom")
    .min(3, "Le prénom doit comporter au moins 3 caractères")
    .required("Le prénom est requis"),
  email: yup
    .string("Entrer l'email")
    .email("Entrer un email valide")
    .required("L'email est requis"),
  password: yup
    .string("Entrer votre mot de passe")
    .min(8, "Le mot de passe doit comporter au moins 8 caractères")
    .required("Le mot de passe est requis"),
  PhoneNumber: yup
    .string("Enter your PhoneNumber")
    .min(8, "Le numéro de téléphone doit comporter 8 caractères"),
});

const Add = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success,data } = useSelector((state) => state.adduser);
    
  useEffect(() => {
      if (success) 
          navigate('/admin/dashboard')
  }, [success])
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      age: "",
      PhoneNumber: "",
      role: ""
    },
    validationSchema: validationSchema,
      onSubmit: (values, actions) => {
        console.log(values)
      //alert(JSON.stringify(values, null, 2));
      dispatch(userAddAction(values));
      actions.resetForm();
    },
  });

  return (
    <>
    
    <Grid item>
         <center> <Typography variant="h2">Add User</Typography></center>
        </Grid>
      <Box
        sx={{
          height: "91vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "primary.white",
        }}
      >
        <Box
          onSubmit={formik.handleSubmit}
          component="form"
          className="form_style border-style"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
          
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="fullName"
              label="Nom Complet"
              name="fullName"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Nom Complet"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="email"
              label="E-mail"
              name="email"
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
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
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
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="age"
              name="age"
              label="age"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="PhoneNumber"
              name="PhoneNumber"
              label="PhoneNumber"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="PhoneNumber"
              value={formik.values.PhoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.PhoneNumber && Boolean(formik.errors.PhoneNumber)
              }
              helperText={
                formik.touched.PhoneNumber && formik.errors.PhoneNumber
              }
            />
            <FormControl>
              <FormLabel id="genre">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="genre"
                name="genre"
                value={formik.values.gender}
                onChange={(e) => {
                  formik.setFieldValue("genre", e.target.value);
                }}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Role
              </InputLabel>
              <Select
                labelId="role"
                name="role"
                id="demo-simple-select-autowidth"
                value={formik.values.role}
                onChange={formik.handleChange}
                label="Role"
              >
                <MenuItem value={"recruiter"}>Recruiter</MenuItem>
                <MenuItem value={"job_seeker"}>Job_Seeker</MenuItem>
              </Select>
            </FormControl>

            <Button fullWidth variant="contained" type="submit">
              ADD
            </Button>
          </Box>
        </Box>
      </Box>
      
    </>
  );
};

export default Add;
