import {
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Footer from "../component/Footer";
import LoadingBox from "../component/LoadingBox";
import Navbar from "../component/Navbar";
import {
  jobLoadSingleAction,
  jobLoadSingledAction,
} from "../redux/actions/jobAction";
import Button from "@mui/material/Button";
import { userApplyJobAction } from "../redux/actions/userAction";

const SingleJob = () => {
  const dispatch = useDispatch();
  const { singlejob, loading } = useSelector((state) => state.singleJob);
  const { userInfo } = useSelector((state) => state.signIn);
  const { id } = useParams();
  useEffect(() => {
    dispatch(jobLoadSingledAction(id));
  }, [id]);

  return (
    <>
      <Box sx={{ bgcolor: "#fafafa" }}>
        <Navbar />
        <Box sx={{ height: "91vh" }}>
          <Container sx={{ pt: "30px" }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              <Box sx={{ flex: 4, p: 2 }}>
                {loading ? (
                  <LoadingBox />
                ) : (
                  <Card style={{ marginTop: "50px" }}>
                    <CardContent>
                      <Typography variant="h5" component="h3">
                        <Box component="span" sx={{ fontWeight: 700 }}>
                          Entreprise
                        </Box>
                        : {singlejob && singlejob.company}
                      </Typography>
                      <Typography variant="h5" component="h3">
                        <Box component="span" sx={{ fontWeight: 700 }}>
                          Titre
                        </Box>
                        : {singlejob && singlejob.title}
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 700 }}>
                          Salaire
                        </Box>
                        : ${singlejob && singlejob.salary}
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 700 }}>
                          Emplacement
                        </Box>
                        : {singlejob && singlejob.location}
                      </Typography>
                      <Grid item>
                        {singlejob &&
                          singlejob.tags &&
                          singlejob.tags.map((skill) => (
                            <Chip
                              label={skill}
                              style={{ marginRight: "5px" }}
                            />
                          ))}
                      </Grid>
                      <Typography variant="body2" sx={{ pt: 2 }}>
                        {/* <h3>Job description:</h3> */}
                        {singlejob && singlejob.job_description}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Box>

              {userInfo && userInfo.role === "job_seeker" ? (
                <>
                  <Box sx={{ flex: 1, p: 3 }}>
                    <Card sx={{ p: 2 ,marginTop:"50px"}}>
                      <Button sx={{ fontSize: "15px"}} variant="contained"  component={Link} to={`/candidats/add/${id}`}>
                        Postuler 
                      </Button>
                    </Card>
                  </Box>
                </>
              ) : null}
            </Stack>
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default SingleJob;
