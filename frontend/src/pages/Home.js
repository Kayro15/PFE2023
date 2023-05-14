import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import Header from '../component/Header'
import { Box, Card, Container, FormControl, InputLabel, ListItemIcon, MenuItem, MenuList, Pagination, Select, Stack, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { jobLoadAction } from '../redux/actions/jobAction'
import { Link, useActionData, useParams } from 'react-router-dom'
import CardElement from '../component/CardElement'
import LoadingBox from '../component/LoadingBox'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SelectComponent from '../component/SelectComponent'
import Footer from '../component/Footer'


const Home = () => {
    const { palette } = useTheme();
    const { jobs, loading, totalpages, uniqtags, uniqlocation } = useSelector(state => state.loadJobs);
    const dispatch = useDispatch();
    const [pageNumber, setpageNumber] = useState(1);
    const { keyword, location, tagFilter } = useParams();
    const [tag,settag]=useState('')
    useEffect(()=> {
    dispatch(jobLoadAction(pageNumber, keyword , tagFilter , location ))
    }, [pageNumber, keyword, tagFilter, location])

    const handleChangeCategory = (e) => {
        settag(e.target.value);
    }
    
    return (
        <>
            <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>

                <Navbar />
                <Header />
                <Container>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                       <Box sx={{ flex: 2, p: 2 }}>
                            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 }}>
                                <Box sx={{ pb: 2 }}>
                                    <Typography component="h4" sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                                        Filtrer offres par Tags
                                    </Typography>
                            </Box>
                            <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tags</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={uniqtags}
                    label="Category"
                    onChange={handleChangeCategory}
                >
                    <MenuItem value="">All</MenuItem>
                    {
                         uniqtags && uniqtags.map((tagFilter, i) => (
                              <MenuItem key={i}>
                                 <Link to={`/search/tag/${tagFilter}`}>{tagFilter}</Link>
                                </MenuItem>

                         ))
                     }


                </Select>
            </FormControl>
        </Box>

                            </Card>

                            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 }}>
                                <Box sx={{ pb: 2 }}>
                                    {/* <h4>Filter by category</h4> */}
                                    <Typography component="h4" sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                                        Filtrer offres par emplacement
                                    </Typography>
                                    <MenuList>
                                        {
                                           uniqlocation && uniqlocation.map((location, i) => (
                                                <MenuItem key={i}>
                                                    <ListItemIcon>
                                                        <LocationOnIcon sx={{ color: palette.secondary.main, fontSize: 18 }} />
                                                    </ListItemIcon>
                                                    <Link to={`/search/location/${location}`}>{location}</Link>
                                                </MenuItem>

                                            ))
                                        }

                                    </MenuList>

                                </Box>
                            </Card>
                        </Box>
                         <Box sx={{ flex: 5, p: 2 }}>
                            {
                                loading ?
                                    <LoadingBox /> :
                                    jobs && jobs.length === 0 ?
                                        <>
                                            <Box
                                                sx={{
                                                    minHeight: '350px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>

                                                <h2>No result found!</h2>
                                            </Box>
                                        </> :


                                        jobs && jobs.map((job, i) => (
                                            <CardElement
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
                        <Stack spacing={2} >
                                <Pagination page={pageNumber} count={totalpages === 0 ? 1 : totalpages} onChange={(event, value) => setpageNumber(value)} />
                            </Stack>
                    
                        </Box>
                     </Stack>
            </Container >
        </Box>
            <Footer/>
          

        </>
    )
}

export default Home