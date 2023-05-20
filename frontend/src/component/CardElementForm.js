import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';



const CardElementForm = ({ formName,id}) => {
  const { palette } = useTheme();
  return (
    <Card
      sx={{
        minWidth: 220,
        mb: 1,
        mt: 6,
        backgroundColor: 'white',
        marginRight:'400px',
        marginLeft:'400px'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', mb: 1, mt: 1, justifyContent: 'center' }}>
          <Typography variant="h5" component="div" sx={{ textAlign: 'center', fontFamily: 'cursive' }}>
            {formName}
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <Button variant="contained">
          <Link
            style={{ color: 'white', textDecoration: 'none' }}
            to={`/user/remplir/${id}`}
          >
            Remplir
          </Link>
        </Button>
      </Box>
    </Card>
  );
};

export default CardElementForm;