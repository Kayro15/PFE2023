import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Grid, IconButton, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { JobDeleteAction } from '../redux/actions/jobAction';
import { useDispatch } from 'react-redux';
import { userProfileAction } from '../redux/actions/RecruiterAction';
import { useEffect } from 'react';


const CardElementRecruiter = ({ jobTitle, description, tag, location, company,id }) => {
    const { palette } = useTheme();
    const dispatch=useDispatch()
    const deleteJoById = (e, id) => {
        dispatch(JobDeleteAction(id))
        dispatch(userProfileAction());
    };
    
        
   

    return (
        <Card sx={{ minWidth: 275, mb: 3, mt: 3 }}>
  
            <CardContent >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h5" component="div">
                    {company}
                </Typography>
                    <Typography sx={{ fontSize: 15, color: palette.secondary.main, fontWeight: 500 }}>
                        <IconButton><LocationOnIcon sx={{ color: palette.secondary.main, fontSize: 18 }} /></IconButton> {location}
                    </Typography>
                </Box>
                <Typography variant="h5" component="div">
                    {jobTitle}
                </Typography>
                <Grid item>
            {tag.map((skill) => (
              <Chip label={skill} style={{ marginRight: "2px" }} />
            ))}
                    </Grid>
                <Typography variant="body2">
                    Description: {description.split(" ").slice(0, 15).join(" ") + "..."}
                </Typography>
            </CardContent>
            <CardActions>
                <Button disableElevation variant='contained' size="small" startIcon={<AddIcon />}><Link style={{ textDecoration: "none", color: "white", boxShadow: 0 }} to={`/recruiter/candidats/job_id/${id}`}>Consulter les candidatures de cette offre</Link></Button>
            </CardActions>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Button variant="contained"><Link style={{ color: "white", textDecoration: "none" }} to={`/admin/edit/job/${id}`}>Modifier</Link></ Button>
                    < Button  variant="contained"  color="error" onClick={(e)=>deleteJoById(e,id)}>Supprimer</ Button>
                </Box>
        </Card>
    );
}

export default CardElementRecruiter;
