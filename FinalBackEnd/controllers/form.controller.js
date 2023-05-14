const CustomForm = require('../models/Form.model')

module.exports.CreateForm = async (req, res) => {
      try {
        const {formName,fields}=req.body
        const customForm = await CustomForm.create({ formName,fields });
        res.status(201).json(customForm);
      } catch (error) {
        console.error("Erreur lors de l'enregistrement du formulaire :", error); 
       res.status(400).json({ message: "Erreur lors de l'enregistrement du formulaire :", error: error.message });
      }
    };

    

    module.exports.deleteFormById = async (req, res) => {
      try {
        const {id} = req.params;
        const customForm = await CustomForm.findByPk(id);
        if (!customForm) {
          return res.status(404).json({
            message: "Le formulaire n'est pas dans la base de données",
          });
        }
        await customForm.destroy();
        return res.status(200).json({
          message: "Formulaire supprimé avec succès",
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    };
// find all custom forms
module.exports.getAllForms = async (req, res) => {
  try {
    const customForms = await CustomForm.findAll();
    return res.status(200).json({
      data: customForms,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.getformbyid = async (req, res) => {
  try {
    const {id} = req.params;
    const customForm = await CustomForm.findByPk(id);
    if (!customForm) {
      return res.status(404).json({
        message: "Le formulaire n'est pas dans la base de données",
      });
    }
    return res.status(200).json({
      data:customForm,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
