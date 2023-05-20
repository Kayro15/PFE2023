import React, { useEffect, useState } from "react";
import { Box, Button, Pagination, Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { FormDeleteAction, formLoadallAction } from "../../redux/actions/FormAction";
import moment from "moment";

const DashForms = () => {
    const [pageSize, setPageSize] = useState(1);
  const dispatch = useDispatch();
  const f=true ;
  useEffect(() => {
    dispatch(formLoadallAction());
  },[]);

  const {forms,loading} = useSelector( (state) => state.allforms);
  const [data1, setData1] = useState([]);
  console.log(loading)
  console.log(forms)
  useEffect(() => {
    if (forms) {
      const formattedData = forms.map((candidat) => {
        return {
          id: candidat.id,
          formName: candidat.formName,
          createdAt: candidat.createdAt,
        };
      });

     

      setData1(formattedData);
    } else {
      setData1([]);
    }
  }, [forms]);


  const deleteJoById = (e, id) => {
    dispatch(FormDeleteAction(id));
    dispatch(formLoadallAction());
  };

  const columns = [
    {
      field: "id",
      headerName: "ID_Modèle",
      width: 150,
      editable: true,
    },
    {
      field: "formName",
      headerName: "Titre de modèle",
      width: 150,
    },
    {
        field: "createdAt",
        headerName: "Date de création",
        width: 150,
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
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
          All Forms
        </Typography>
        <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            component={Link}
            to={`/admin/form`}
          >
            Create Form
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
              checkboxSelection
              slots={{ toolbar: GridToolbar }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default DashForms;
