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
import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailCheckAction,
  userLoadSingledAction,
  userUpdateAction,
} from "../redux/actions/userAction";
import { useNavigate, useParams } from "react-router-dom";
import { candidatLoadSingledAction, candidatUpdateAction } from "../redux/actions/CandidatsAction";
import moment from "moment";

const validationSchema = yup.object({
  interviewDate: yup
    .date()
    .min(new Date(), "La date doit être postérieure à aujourd'hui")
    .max(new Date("2025-12-31"), "Date must be before 2026"),
  applicationStatus: yup
    .string()
    .oneOf(["pending", "accepted", "rejected"], "Invalid status")
    .required("Le statut est requis"),
});

const UpdateCandidat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const {singleCandidat}=useSelector((state)=>state.singleCandidat)

  const { idUser } = useParams();
    const { idJob } = useParams();
    useEffect(() => {
    dispatch(candidatLoadSingledAction(idUser, idJob));
  }, [idUser, idJob]);

  const formik = useFormik({
    initialValues: {
      interviewDate: "",
      applicationStatus: "",
    },
    validationSchema: validationSchema,
        onSubmit: (values, actions) => {
          console.log(values)
        dispatch(candidatUpdateAction(idUser,idJob, values));
        actions.resetForm();
          // navigate("/recruiter/jobs");
      },
  });
  const isoDate = singleCandidat?.interviewDate;
  const date = moment(isoDate);
  const formattedDate = date.format('YYYY-MM-DD');
   
  useEffect(() => {
      if (singleCandidat) {
          formik.setValues({
              interviewDate: formattedDate,
              applicationStatus: singleCandidat?.applicationStatus,
          });
      }
  }, [singleCandidat]);

  return (
    <>
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
              id="interviewDate"
              label="Date de l'entretien"
              name="interviewDate"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="yyyy-MM-dd"
              value={formik.values.interviewDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.interviewDate && Boolean(formik.errors.interviewDate)}
              helperText={formik.touched.interviewDate && formik.errors.interviewDate}
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
              id="applicationStatus"
              label="État de la candidature"
              name="applicationStatus"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="État de la candidature"
                          value={formik.values.applicationStatus}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
              error={
                (formik.touched.applicationStatus && Boolean(formik.errors.applicationStatus)) 
                
              }
              helperText={
                (formik.touched.applicationStatus && formik.errors.applicationStatus)
              }
            />
            <Button fullWidth variant="contained" type="submit">
              edit
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default UpdateCandidat;
