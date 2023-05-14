import React, { useEffect } from "react";
import {
  Box,
  Button,
  Pagination,
  Paper,
  Typography,
  gridClasses,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  allUserAction,
  userDeleteAction,
} from "../../redux/actions/userAction";
import { useState } from "react";
import {
  allCandidatsaction,
  allrecruiterCandidatsaction,
  candidatDeleteAction,
  candidatDeleterecruiterAction,
} from "../../redux/actions/CandidatsAction";

const RecruiterCandidats = () => {
  const [pageSize, setPageSize] = useState(1);

  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const {idJob}=useParams()
  useEffect(() => {
    dispatch(allrecruiterCandidatsaction(idJob,pageNumber, pageSize));
  }, [pageNumber, pageSize]);

  const { candidats } = useSelector((state) => state.allrecruitercandidats);
  const totalPages = candidats?.totalPages;
  const [data1, setData1] = useState([]);

console.log(candidats)

  const deleteUserById = (e, idUser, idJob) => {
    dispatch(candidatDeleterecruiterAction(idUser, idJob));
    dispatch(allrecruiterCandidatsaction(idJob));
  };

  useEffect(() => {
    if (candidats?.data) {
      const formattedData = candidats.data.map((candidat) => {
        return {
          idUser: candidat.idUser,
          idJob: candidat.idJob,
          email: candidat.User.email,
          fullName: candidat.User.fullName,
          Score: candidat.Score,
          phoneNumber: candidat.User.phoneNumber,
          interviewDate: candidat.interviewDate,
          applicationStatus: candidat.applicationStatus,
          createdAt: candidat.createdAt,
        };
      });

     

      setData1(formattedData);
    } else {
      setData1([]);
    }
  }, [candidats?.data]);

  const columns = [
    {
      field: "idUser",
      headerName: "User ID",
      width: 80,
      editable: true,
    },
    {
      field: "idJob",
      headerName: "Job ID",
      width: 80,
    },
    {
      field: "email",
      headerName: "email",
      width: 100,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "fullName",
      width: 100,
    },
    {
      field: "phoneNumber",
      headerName: "Numéro de téléphone",
      width: 150,
    },
    {
      field: "Score",
      headerName: "CV Score",
      width: 150,
    },
    {
      filed: "interviewDate",
      headerName: "interviewDate",
      width: 150,
      renderCell: (params) => {
          return moment(params.row.interviewDate).format("YYYY-MM-DD HH:MM:SS");
      },
    },
    {
      field: "applicationStatus",
      headerName: "applicationStatus",
      width: 100,
    },

    {
      field: "createdAt",
      headerName: "Creation date",
      width: 150,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
    },

    {
      field: "Actions",
      width: 300,
      renderCell: (values) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "300px",
          }}
        >
          <Button variant="contained">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/recruiter/edit/candidat/${values.row.idUser}/${values.row.idJob}`}
            >
              Modifier
            </Link>
              </Button>
              <Button variant="contained">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/recruiter/candidat/pdf/${values.row.idUser}`}
            >
              Resume PDF
            </Link>
          </Button>
          <Button
            onClick={(e) =>
              deleteUserById(e, values.row.idUser, values.row.idJob)
            }
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
          All Candidats
        </Typography>
        <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
          
        </Box>
        <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              sx={{
                "& .MuiDataGrid-footerContainer": {
                  display: "none",
                },
                color: "white",
                [`& .${gridClasses.row}`]: {
                  bgcolor: (theme) =>
                    // theme.palette.mode === 'light' ? grey[200] : grey[900],
                    theme.palette.secondary.main,
                },
                button: {
                  color: "#ffffff",
                },
              }}
              getRowId={(row) => `${row.idUser}-${row.idJob}`}
              rows={data1}
              columns={columns}
              pageSize={3}
              rowsPerPageOptions={[3]}
              checkboxSelection
              slots={{ toolbar: GridToolbar }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Pagination
              count={totalPages}
              color="primary"
              onChange={(event, value) => setPageNumber(value)}
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default RecruiterCandidats;
