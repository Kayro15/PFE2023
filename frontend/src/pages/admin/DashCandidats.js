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
import { Link } from "react-router-dom";
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
  candidatDeleteAction,
} from "../../redux/actions/CandidatsAction";

const Candidats = () => {
  const [pageSize, setPageSize] = useState(1);

  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allCandidatsaction(pageNumber, pageSize));
  }, [pageNumber, pageSize]);

  const { candidats } = useSelector((state) => state.allcandidats);
  const totalPages = candidats?.totalPages;
  const [data1, setData1] = useState([]);

console.log(candidats)

  const deleteUserById = (e, idUser, idJob) => {
    dispatch(candidatDeleteAction(idUser, idJob));
    dispatch(allCandidatsaction());
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
          title: candidat.job_offer.title,
          location: candidat.job_offer.location,
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
      width: 60,
      editable: true,
    },
    {
      field: "idJob",
      headerName: "ID_Offre",
      width: 70,
    },
    {
      field: "email",
      headerName: "E-mail",
      width: 100,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Nom Candidat",
      width: 120,
    },
    {
      field: "phoneNumber",
      headerName: "Numéro",
      width: 100,
    },
    {
      field: "Score",
      headerName: "Score du CV",
      width: 140,
    },
    {
      field: "title",
      headerName: "Titre",
      width: 150,
    },
    {
      field: "location",
      headerName: "Emplacement",
      width: 110,
    },
    {
      filed: "Date",
      headerName: "Date de l'entretien",
      width: 150,
      renderCell: (params) => {
        if (params.row.interviewDate) {
          return moment(params.row.interviewDate).format("YYYY-MM-DD HH:MM:SS");
        }
        return "Processing";
      },
    },
    {
      field: "applicationStatus",
      headerName: "État Candidature",
      width: 120,
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
      width: 200,
      renderCell: (values) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
          <Button variant="contained">
            <Link
              style={{ color: "white", textDecoration: "none"}}
              to={`/admin/edit/candidat/${values.row.idUser}/${values.row.idJob}`}
            >
              Modifier
            </Link>
          </Button>
          <Button
            onClick={(e) =>
              deleteUserById(e, values.row.idUser, values.row.idJob)
            }
            variant="contained"
            color="error"
            style={{ marginLeft:"10px"}}
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
          Liste des Candidatures
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

export default Candidats;
