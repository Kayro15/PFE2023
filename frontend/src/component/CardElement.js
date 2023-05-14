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


const CardElement = ({ jobTitle, description, tag, location, company,id }) => {
    const { palette } = useTheme();
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
                <Button disableElevation variant='contained' size="small" startIcon={<AddIcon />}><Link style={{ textDecoration: "none", color: "white", boxShadow: 0 }} to={`/job/${id}`}>Plus de détails</Link></Button>
            </CardActions>
        </Card>
    );
}

export default CardElement;
