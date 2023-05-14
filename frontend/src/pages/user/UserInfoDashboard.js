import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { RecruiterProfileAction } from '../../redux/actions/RecruiterAction';
import { useEffect } from 'react';



const UserInfoDashboard = () => {
 
    const { profile } = useSelector((state) => state.profiles);
    console.log(profile)
    
    const { palette } = useTheme();
    return (
        <>
            <Box sx={{ maxWidth: "50%", margin: "auto", pt: 10 }}>
                <Card sx={{ minWidth: 275, bgcolor: palette.secondary.midNightBlue }}>
                    
                    <CardContent>
                        <Typography sx={{ fontSize: 16 }} color="#fafafa" gutterBottom>
                            Personal Info
                        </Typography>
                        <hr style={{ marginBottom: "30px" }} />
                        <Typography variant="h6" component="div" sx={{ color: "#fafafa" }} >
                            FullName: {profile?.fullName}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ color: "#fafafa" }} >
                            Email: {profile?.email}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ color: "#fafafa" }} >
                            PhoneNumber: {profile?.phoneNumber} 
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ color: "#fafafa" }} >
                            Age:  {profile?.age}
                        </Typography>
                        <Typography sx={{ mb: 1.5, color: "grey", pt: 2 }} color="text.secondary">
                            Status: {profile?.role}
                        </Typography>


                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default UserInfoDashboard
