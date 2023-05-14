import { Typography, Box } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect } from 'react';
import StatComponent from '../../component/StatComponent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { alljobseekerCandidatsaction } from '../../redux/actions/CandidatsAction';

const Jobseekerdashboard = () => {
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.profiles);
    
    useEffect(() => {
        dispatch(alljobseekerCandidatsaction());
    }, []);
    const { candidats } = useSelector((state) => state.alljobseekercandidats)
    console.log(candidats?.data)
    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ color: 'white', pb: 3 }}>
                    Stats
                </Typography>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                    <StatComponent
                        value={profile && moment(profile.createdAt).format('YYYY / MM / DD')}
                        icon={<CalendarMonthIcon sx={{ color: '#fafafa', fontSize: 30 }} />}
                        description="Membre depuis"
                        money=""
                    />
                    <StatComponent
                        value={candidats?.data?.length}
                        icon={<WorkIcon sx={{ color: '#fafafa', fontSize: 30 }} />}
                        description="Number of Candidats submitted"
                        money=""
                    />
                </Stack>
            </Box>
        </>
    );
};

export default Jobseekerdashboard;
