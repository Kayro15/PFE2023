import { Typography, Box } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect } from 'react'
import StatComponent from '../../component/StatComponent'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { RecruiterProfileAction, userProfileAction } from '../../redux/actions/RecruiterAction';

const UserDashboard = () => {
  const { jobs } = useSelector((state) => state.job);
  
  const{profile}=useSelector((state)=>state.profiles)
 
  
 
    return (
        <>
            <Box >

                <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                    Stats
                </Typography>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >

                    <StatComponent
                          value={profile && moment(profile.createdAt).format('YYYY / MM / DD')}
                        icon={<CalendarMonthIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Membre depuis"
                        money=''
                    />
                    <StatComponent
                        value={jobs && jobs.length}
                        icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Nombre d'offres d'emploi soumises"
                        money=''
                    />


                </Stack>
            </Box>

        </>
    )
}

export default UserDashboard