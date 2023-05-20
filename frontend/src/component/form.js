import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

// const styles = {
//   formContainer: {
//     padding: "24px",
//     borderRadius: "4px",
//     backgroundColor: "#F2F2F2",
//   },
//   formGroup: {
//     margin: "8px 0",
//   },
//   fieldLabel: {
//     fontWeight: "bold",
//     lineHeight: '50px',
//     background: '#fafafa',
//     WebkitBoxShadow: 'inset 0 1px 3px 0 rgba(0,0,0,.08)',
//     MozBoxShadow: 'inset 0 1px 3px 0 rgba(0,0,0,.08)',
//     boxShadow: 'inset 0 1px 3px 0 rgba(0,0,0,.08)',
//     WebkitBorderRadius: '5px',
//     MozBorderRadius: '5px',
//     borderRadius: '5px',
//     padding: '0 20px',
//     fontSize: '16px',
//     color: '#666',
//     WebkitTransition: 'all .4s ease',
//     OTransition: 'all .4s ease',
//     MozTransition: 'all .4s ease',
//     transition: 'all .4s ease'
//   },
//   removeButton: {
//     marginLeft: "8px",
//     color: "white",
//     backgroundColor: "red",
//     "&:hover": {
//       backgroundColor: "#FF0F0F",
//     },
//   },
//   addButton: {
//     marginTop: "8px",
//     marginBottom: "16px",
//     color: "white",
//     backgroundColor: "green",
//     "&:hover": {
//       backgroundColor: "#0F9D58",
//     },
//   },
//   selectDialog: {
//     minWidth: "400px",
//   },
// };

export const CustomFormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [selectedFieldIndex, setSelectedFieldIndex] = useState(-1);
  const [openSelectDialog, setOpenSelectDialog] = useState(false);
  const[formName,setformName]=useState("");

  // ...

  const handleOpenSelectDialog = (index) => {
    setSelectedFieldIndex(index);
    setOpenSelectDialog(true);
  };

  const handleCloseSelectDialog = () => {
    setOpenSelectDialog(false);
  };

  const handleSaveSelectOptions = () => {
    // Update fields with the new labels for the Select options
    handleCloseSelectDialog();
  };
  const handleAddOptionInDialog = () => {
    if (selectedFieldIndex >= 0) {
      const newFields = [...fields];
      newFields[selectedFieldIndex].options.push({ label: "" });
      setFields(newFields);
    }
  };

  const handleAddField = (type) => {
    const fieldData = {
      type,
      label: "",
    };

    if (type === "checkbox" || type === "radio" || type === "select") {
      fieldData.options = [{ label: "" }];
    }

    setFields([...fields, fieldData]);
  };
  const [selectedFieldType, setSelectedFieldType] = useState("");

  // Fonction pour gérer la sélection du type de champ
  const handleFieldTypeChange = (event) => {
    setSelectedFieldType(event.target.value);
  };

  const handleAddOption = (index) => {
    const newFields = [...fields];
    newFields[index].options.push({ label: "" });
    setFields(newFields);
  };

  const handleOptionLabelChange = (index, optionIndex, value) => {
    const newFields = [...fields];
    newFields[index].options[optionIndex].label = value;
    setFields(newFields);
  };

  const handleLabelChange = (index, newLabel) => {
    const newFields = [...fields];
    newFields[index].label = newLabel;
    setFields(newFields);
  };
  
  const handleRemoveField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };
  const renderField = (field, index) => {
    return (
      <>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <TextField
              label="Label"
              value={field.label}
              onChange={(e) => handleLabelChange(index, e.target.value)}
            />
            {/* <Typography variant="h6" component="h2">
              {fields[index].label}
            </Typography> */}
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveField(index)}
            >
              x
            </Button>
          </Grid>
        </Grid>
        {(() => {
          switch (field.type) {
            case "text":
              return <TextField key={index} fullWidth />;
              

            case "checkbox":
              return (
                <FormControl key={index} component="fieldset">
                  {field.options.map((option, optionIndex) => (
                    <FormControlLabel
                      key={optionIndex}
                      control={<Checkbox />}
                      label={
                        <TextField
                          value={option.label}
                          onChange={(e) =>
                            handleOptionLabelChange(
                              index,
                              optionIndex,
                              e.target.value
                            )
                          }
                        />
                      }
                    />
                  ))}
                  <Button onClick={() => handleAddOption(index)}>
                    Ajouter une option
                  </Button>
                </FormControl>
              );

            case "radio":
              return (
                <FormControl key={index} component="fieldset">
                  <RadioGroup row>
                    {field.options.map((option, optionIndex) => (
                      <FormControlLabel
                        key={optionIndex}
                        control={<Radio />}
                        label={
                          <TextField
                            value={option.label}
                            onChange={(e) =>
                              handleOptionLabelChange(
                                index,
                                optionIndex,
                                e.target.value
                              )
                            }
                          />
                        }
                      />
                    ))}
                  </RadioGroup>
                  <Button onClick={() => handleAddOption(index)}>
                    Ajouter une option
                  </Button>
                </FormControl>
              );

            case "date":
              return (
                <TextField
                  key={index}
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              );

            case "file":
              return (
                <TextField
                  key={index}
                  type="file"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              );
            case "select":
              return (
                <FormControl key={index} fullWidth>
                  <InputLabel>{field.label}</InputLabel>
                  <Select>
                    {field.options.map((option, optionIndex) => (
                      <MenuItem key={optionIndex} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button onClick={() => handleOpenSelectDialog(index)}>
                    Éditer les options
                  </Button>
                </FormControl>
              );
            default:
              return null;
          }
        })()}
      </>
    );
  };

  const handleSubmit = () => {
    const form = {formName: formName, fields: fields };
    axios
      .post("http://localhost:8000/api/admin/addForm", form)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    toast.success("Modèle créé avec succès")
  };

  return (
    <div style={{ display: "flex", justifyContent: "center"}}>
      {/* #b3b3ff */}
    <Container style={{ backgroundColor: "#b3b3ff", justifyContent: "center", margin: "50px" , border: "1px solid black" , borderRadius: "10px", boxShadow: "0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)",} }>
    <center><h1 style={{ 
  display: 'block',
  fontFamily: 'Poppins-Bold',
  fontSize: '39px',
  color: '#333',
  lineHeight: '1.2',
  textAlign: 'center',
  paddingBottom: '44px',
  marginTop:'30px'
}}> Créer votre Modèle de CV</h1></center>

     <center><h6>Saisir le titre de votre Modèle</h6>
      <input type="text" value={formName} onChange={(e) => setformName(e.target.value)}
  style={{
    backgroundColor: 'transparent' ,
    fontSize: '16px',
    padding: '10px',
    border: '2px solid black',
    borderRadius: '5px',
    boxShadow: "0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)",
    outline: 'none',
    marginBottom:'20px'
  }}
/></center> 
      <Grid container spacing={2} direction="column">
        {fields.map((field, index) => (
          <Grid item key={index}>
            {renderField(field, index)}
          </Grid>
        ))}
        <Grid container alignItems="flex-end">
          <Grid item>
            <InputLabel htmlFor="add-field-select">Ajouter un champ</InputLabel>
            <Select
              id="add-field-select"
              value={selectedFieldType}
              onChange={handleFieldTypeChange}
            >
              <MenuItem value="text">Texte</MenuItem>
              <MenuItem value="checkbox">Case à cocher</MenuItem>
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="file">Fichier</MenuItem>
              <MenuItem value="radio">Bouton radio</MenuItem>
              <MenuItem value="select">Sélection</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Button onClick={() => handleAddField(selectedFieldType)}>
              Ajouter
            </Button>
          </Grid>
        </Grid>
        <Grid item>
        <Button variant="contained" color="primary" onClick={handleSubmit} style={{marginBottom: '40px', float: "right"}}>
           Enregistrer
        </Button>
        </Grid>
      </Grid>
      <Dialog
        open={openSelectDialog}
        onClose={handleCloseSelectDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Éditer les options</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modifier les labels des options pour le champ Select.
          </DialogContentText>
          {selectedFieldIndex >= 0 &&
            fields[selectedFieldIndex].options.map((option, optionIndex) => (
              <TextField
                key={optionIndex}
                label={`Option ${optionIndex + 1}`}
                value={option.label}
                onChange={(e) =>
                  handleOptionLabelChange(
                    selectedFieldIndex,
                    optionIndex,
                    e.target.value
                  )
                }
                fullWidth
                margin="normal"
              />
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSelectDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSaveSelectOptions} color="primary">
            Enregistrer
          </Button>
          <Button onClick={handleAddOptionInDialog}>Ajouter une option</Button>
        </DialogActions>
      </Dialog>
    </Container>
   </div>
  );
 
};
