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


const CardElementForm = ({ formName,id}) => {
    const { palette } = useTheme();
    return (
        <Card sx={{ minWidth: 275, mb: 3, mt: 3 }}>
  
            <CardContent >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h5" component="div">
                    {formName}
                </Typography>
                </Box>
            </CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
            <Button variant="contained"><Link style={{ color: "white", textDecoration: "none" }} to={`/user/remplir/${id}`}>Remplir</Link></ Button>
                </Box>
        </Card>
    );
}

export default CardElementForm;
