import {
  Avatar,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
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
import { userSignUpAction } from "../redux/actions/userAction";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  fullName: yup
    .string("Entrez votre prénom")
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
  phoneNumber: yup
    .string("Entrer votre numéro de téléphone")
        .min(8, "Le numéro de téléphone doit avoir une longueur de 8 caractères")
        .max(15, "Le numéro de téléphone doit avoir une longueur < 15 caractères"),
    age: yup
        .number("Entrer votre age")
        .min(10, "L'âge doit être supérieur à 10")
        .max(80, "L'âge doit être inférieur à 80")
        .required("L'âge est requis"),
        // gender: yup
        // .oneOf(["homme", "femme"], "Sélectionnez une option valide"),
    
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const { success,data } = useSelector((state) => state.signUp);
    
    useEffect(() => {
        if (success) 
            navigate('/login')
    }, [success])


  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      age: "",
      phoneNumber: "",
      role: ""
    },
    validationSchema: validationSchema,
      onSubmit: (values, actions) => {
        console.log(values)
      //alert(JSON.stringify(values, null, 2));
      dispatch(userSignUpAction(values));
      actions.resetForm();
    },
  });

  return (
    <>
      <Navbar />
      <Box
        sx={{
          marginTop:"35px",
          height: "100vh",
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
            <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
              <LockOpenIcon />
            </Avatar>
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
              id="phoneNumber"
              name="phoneNumber"
              label="Numéro de téléphone"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Numéro de téléphone"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
            <FormControl>
              <FormLabel id="genre">Sexe</FormLabel>
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
                  label="Femme"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Homme"
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
                <MenuItem value={"job_seeker"}>Chercheur d'emploi</MenuItem>
                <MenuItem value={"recruiter"}>Recruteur</MenuItem>
              </Select>
            </FormControl>

            <Button fullWidth variant="contained" type="submit">
              Registrer
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Register;
