import { Box, Stack, Typography } from '@mui/material';
import StatComponent from '../../component/StatComponent';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category';
import { Chart } from "react-google-charts";
import { data, options } from './data/data'
import ChartComponent from '../../component/ChartComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { allUserAction } from '../../redux/actions/userAction';


const AdminDashboard = () => {
    


    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Tableau de bord
                </Typography>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >

                    <StatComponent
                        value="15"
                        icon={<SupervisorAccountIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Utilisateurs"
                        money=''
                    />
                     <StatComponent
                        value="10"
                        icon={<SupervisorAccountIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Chercheurs d'emploi"
                        money=''
                    />
                        <StatComponent
                        value="5"
                        icon={<SupervisorAccountIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Recruteurs"
                        money=''
                    />
                    <StatComponent
                        value="5"
                        icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Offres d'emploi"
                        money=''
                    />
                    <StatComponent
                        value="50"
                        icon={<CategoryIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Candidatures"
                        money=''
                    />

                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 3 }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}>
                    <ChartComponent>
                        <Chart
                            chartType="Bar"
                            data={data}
                            options={options}
                            width="100%"
                            height="300px"
                            legendToggle
                        />
                    </ChartComponent>
                </Stack>

            </Box>
        </>
    )
}

export default AdminDashboard