import React, { useEffect, useState } from "react";
import { Box, Button, Pagination, Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  JobDeleteAction,
  JobVerifiedAction,
  jobLoadAction,
  jobLoadallAction,
} from "../../redux/actions/jobAction";

const DashJobs = () => {
  const [pageSize, setPageSize] = useState(5);

  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(jobLoadallAction(pageNumber, pageSize));
  }, [pageNumber, pageSize]);

  const { jobs, loading, totalpages } = useSelector(
    (state) => state.loadAllJobs
  );
  console.log(totalpages);
  const [data1, setData] = useState([]);
  useEffect(() => {
    setData(jobs !== undefined && jobs.length > 0 ? jobs : []);
  }, [jobs]);

  const VerifierJoById = (e, id) => {
    dispatch(JobVerifiedAction(id));
    dispatch(jobLoadallAction(pageNumber, pageSize));
  };
  const deleteJoById = (e, id) => {
    dispatch(JobDeleteAction(id));
    dispatch(jobLoadallAction(pageNumber, pageSize));
  };

  const columns = [
    {
      field: "id",
      headerName: "ID_Offre",
      width: 150,
      editable: true,
    },
    {
      field: "title",
      headerName: "Titre d'offre",
      width: 150,
    },
    {
      field: "company",
      headerName: "Nom de l'entreprise",
      width: 150,
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 150,
      valueGetter: (data) => data.row.tags,
    },
    {
      field: "location",
      headerName: "Emplacement",
      width: 150,
      valueGetter: (data) => data.row.location,
    },

    {
      field: "salary",
      headerName: "Salaire",
      type: Number,
      width: 100,
      renderCell: (values) => "$" + values.row.salary,
    },
    {
      field: "verified",
      headerName: "Approuver",
      width: 100,
      renderCell: (values) => (values.row.verified ? "Oui" : "Non"),
    },

    {
      field: "Actions",
      width: 500,
      renderCell: (values) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "300px",
          }}
        >
          {/* <Button variant="contained">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/admin/edit/job/${values.row.id}`}
            >
              Modifier
            </Link>
          </Button> */}
          <Button
            variant="contained"
            onClick={(e) => VerifierJoById(e, values.row.id)}
            style={{ color: "white", textDecoration: "none"}}
          >
            Approuver
          </Button>
          <Button
            variant="contained"
            onClick={(e) => deleteJoById(e, values.row.id)}
            color="error"
          >
            Supprimer
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
        Liste des offres d'emploi
        </Typography>
        <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            component={Link}
            to={`/job/add`}
          >
            Créer une offre
          </Button>
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
              getRowId={(row) => row.id}
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
              count={totalpages}
              color="primary"
              onChange={(event, value) => setPageNumber(value)}
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default DashJobs;
