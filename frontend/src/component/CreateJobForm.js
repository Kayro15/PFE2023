import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import Chip from "@mui/material/Chip";
import { useDispatch, useSelector } from "react-redux";
import { JobCreateAction } from "../redux/actions/jobAction";
import { useNavigate } from "react-router-dom";

const CreateJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo,isAuthenticated } = useSelector(state => state.signIn);
 console.log(userInfo)
  const [jobDetails, setJobDetails] = useState({
    company: "",
    title: "",
    location: "",
    job_description: "",
    tags: [],
    salary: 0,
  });

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const handleSkillsetAdd = () => {
    if (jobDetails.skillsetInput.trim() !== "") {
      setJobDetails({
        ...jobDetails,
        tags: [...jobDetails.tags, jobDetails.skillsetInput],
        skillsetInput: "",
      });
    }
  };

  const handleSkillsetDelete = (chip, index) => {
    let tags = jobDetails.tags;
    tags.splice(index, 1);
    setJobDetails({
      ...jobDetails,
      tags: tags,
    });
  };

  const handleCreateJob = () => {
    console.log(jobDetails)
    dispatch(JobCreateAction(jobDetails));
      if (userInfo.role == 'recruiter')
      {
      navigate('/recruiter/jobs')
      }
      else
      {
          
        navigate('/admin/jobs')
          
      }
  };

  return (
    <>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: "30px", minHeight: "93vh", width: "" }}
      >
        <Grid item>
          <Typography variant="h2">Ajouter offre</Typography>
        </Grid>
        <Grid item container xs direction="column" justify="center">
          <Grid item>
            <Paper
              style={{
                padding: "20px",
                outline: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid
                container
                direction="column"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item>
                  <TextField
                    label="Nom de l'entreprise"
                    value={jobDetails.company}
                    onChange={(event) =>
                      handleInput("company", event.target.value)
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item>
                  <TextField
                    label="Titre du poste"
                    value={jobDetails.title}
                    onChange={(event) =>
                      handleInput("title", event.target.value)
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Emplacement"
                    value={jobDetails.location}
                    onChange={(event) =>
                      handleInput("location", event.target.value)
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Description de l'emploi"
                    value={jobDetails.job_description}
                    onChange={(event) =>
                      handleInput("job_description", event.target.value)
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      label="Compétences"
                      variant="outlined"
                      value={jobDetails.skillsetInput || ""}
                      onChange={(event) =>
                        handleInput("skillsetInput", event.target.value)
                      }
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          handleSkillsetAdd();
                        }
                      }}
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginLeft: "10px" }}
                      onClick={handleSkillsetAdd}
                    >
                      +
                    </Button>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    {jobDetails.tags.map((skill, index) => (
                      <Chip
                        key={skill}
                        label={skill}
                        onDelete={() => handleSkillsetDelete(skill, index)}
                        style={{ marginRight: "5px", marginBottom: "5px" }}
                      />
                    ))}
                  </div>
                </Grid>
                <Grid item>
                  <TextField
                    label="Salaire"
                    type="number"
                    variant="outlined"
                    value={jobDetails.salary}
                    onChange={(event) => {
                      handleInput("salary", event.target.value);
                    }}
                    InputProps={{ inputProps: { min: 0 } }}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "10px 50px", marginTop: "30px" }}
                onClick={handleCreateJob}
              >
                Créer une offre
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateJobs;
