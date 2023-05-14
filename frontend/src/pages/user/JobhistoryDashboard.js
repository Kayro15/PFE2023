import { Button, Typography } from '@mui/material'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardElementRecruiter from '../../component/CardElementRecruiter'
import { userProfileAction } from '../../redux/actions/RecruiterAction'
import AddIcon from "@mui/icons-material/Add";
import { Link } from 'react-router-dom'
import { AddIcCallOutlined } from '@mui/icons-material'

const UserJobsHistory = () => {
  
    const { jobs } = useSelector((state) => state.job);
    const { profile } = useSelector((state) => state.profiles)
    console.log(profile)
    console.log(jobs)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userProfileAction());
    }, []);



    return (
        <>
              <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
       < Button  variant="contained" color="success" startIcon={<AddIcon />}  component={Link} to={`/job/add`}>Créer une offre</Button>
                  
        </Box>
             
            <Box>
                <Typography variant="h4" sx={{ color: "#fafafa" }}> Mes Offres</Typography>
                { <Box>
                    {
                        jobs && jobs.map((job, i) => (
                                            <CardElementRecruiter
                                            key={i}
                                            id={job.id}
                                            jobTitle={job.title}
                                            description={job.job_description}
                                            tag={job.tags}
                                            company={job.company}
                                location={job.location}
                                />
                        ))
                    }
                </Box> 
                }
            </Box>
        </>
    )
}

export default UserJobsHistory