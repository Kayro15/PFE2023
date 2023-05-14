const FormCandidats = require("../models/FormCandidats.model");
const User = require("../models/user.model");
const Form=require("../models/Form.model")
const createformcandidat = async (req, res) => {
    try {
      const userId = req.user.userId;
      console.log(userId);
      const { idForm } = req.params;
      const { Values } = req.body;
  
      // Check if Values is defined and not empty
      if (!Values) {
        return res.status(400).json({ message: 'Values parameter is missing or empty' });
      }
  
      const parsedValues = JSON.parse(Values);
      const formSubmission = await FormCandidats.create({
        idForm,
        idUser: userId,
        Values: parsedValues,
      });
      return res.status(201).json(formSubmission);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error creating form submission' });
    }
  };

const getformcandidat=async(req,res)=>{
    try{
        const userId = req.user.userId;
        const formSubmissions = await FormCandidats.findAll({
            where: { idUser: userId },
            include: Form,
          });
          return res.status(200).json(formSubmissions);
        } catch (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error retrieving form submissions' });
        }
    }

    const deleteformcandidat = async (req, res) => {
        try {
          const { idForm } = req.params;
          const formSubmission = await FormCandidats.findOne({
            where: { idForm: idForm },
          });
          if (formSubmission) {
            await formSubmission.destroy();
            return res.status(200).json({
              message: "Deleted successfully",
            });
          } else {
            return res.status(404).json({
              message: "Form submission not found",
            });
          }
        } catch (error) {
          return res.status(500).json({
            message: error.message,
          });
        }
      };
      

    module.exports={
        createformcandidat,
        getformcandidat,
        deleteformcandidat,
    }
