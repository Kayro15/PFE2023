import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { alljobseekerCandidatsaction, jobseekercandidatDeleteAction } from '../../redux/actions/CandidatsAction';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Box, Button, IconButton } from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';

import { useTheme } from '@emotion/react';

export default function ComplexGrid() {
    
    const [pageSize, setPageSize] = useState(1);
    const dispatch = useDispatch();
    const [pageNumber, setPageNumber] = useState(1);
    useEffect(() => {
        dispatch(alljobseekerCandidatsaction(pageNumber, pageSize));
    }, [pageNumber, pageSize]);
    const { candidats } = useSelector((state) => state.alljobseekercandidats);
    const [data1, setData1] = useState([]);
    useEffect(() => {
        if (candidats?.data) {
            const formattedData = candidats.data.map((candidat) => {
                return {
                    idJob:candidat.job_offer.id,
                    title: candidat.job_offer.title,
                    location: candidat.job_offer.location,
                    company: candidat.job_offer.company,
                     interviewDate : candidat.interviewDate ? candidat.interviewDate : "processing",
                    applicationStatus: candidat.applicationStatus ? candidat.applicationStatus:"pending",
                    createdAt: candidat.createdAt,
                };
            });
            setData1(formattedData);
        } else {
            setData1([]);
        }
    }, [candidats?.data])
    console.log(data1[0]?.company)
    const { palette } = useTheme();
    const deletecandidatById = (e, idJob) => {
        console.log(idJob)
        dispatch(jobseekercandidatDeleteAction( idJob));
       dispatch(alljobseekerCandidatsaction());
      };

    return (
    <>
            {data1 && data1.map((data, i) => (
            
            <Paper
                sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: 500,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                Entreprise: {data.company}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                  Titre: {data.title}
                                </Typography>
                                <Typography variant="body2">
                                  État de la candidature: {data.applicationStatus}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                    Date de l'entretien: {data.interviewDate}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" component="div">
                                <IconButton><LocationOnIcon        sx={{ color: palette.secondary.main, fontSize: 18 }} /></IconButton> {data.location}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    
                    < Button  variant="contained"  color="error"  onClick={(e) =>
              deletecandidatById(e,data.idJob)
            } >Supprimer</ Button>
                </Box>
                </Paper>
              
        ))}
            </>
  );
}