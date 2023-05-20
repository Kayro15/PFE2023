const Router = require("express").Router();
const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  uploadImage,
  getAllJobsbyRecuriter,
  getAlldataJobs,
  deleteJobbyRecruiter,
  updateJobbyRecruiter,
  verifier,
  deleteCandidat,
  getAllCandidats,
  getAllCandidatsbyApplier,
  getCandidatById,
  checkemail
} = require("../controllers/admin.controller");
const {
  CreateForm ,
  deleteFormById,
  getAllForms ,
  getformbyid
}=require("../controllers/form.controller");

const { uploadImageyourself } = require("../controllers/user.controller")
const { imageUpload, pdfUpload } = require("../middleware/filestorage.middleware")
const uploadImage1 = imageUpload.single("image");
const authMiddleware = require("../middleware/auth.middleware");
const adminroleMiddleware = require("../middleware/adminrole.middleware");
Router.post("/update", authMiddleware, adminroleMiddleware,uploadImage1,uploadImageyourself);
Router.post("/",authMiddleware,adminroleMiddleware,createUser);
Router.get("/",authMiddleware,adminroleMiddleware, getUsers);
Router.get("/:id",authMiddleware,adminroleMiddleware,getUser); //req.params.id
Router.delete("/:id",authMiddleware,adminroleMiddleware, deleteUser);
Router.put("/:id", authMiddleware, adminroleMiddleware, updateUser);
Router.put("/upload/:id", authMiddleware,uploadImage1, uploadImage);
Router.get("/rec/:id", authMiddleware, adminroleMiddleware, getAllJobsbyRecuriter)
Router.get("/job/jobs", authMiddleware, adminroleMiddleware, getAlldataJobs)
Router.delete("/jobid/:Job_id", authMiddleware, adminroleMiddleware, deleteJobbyRecruiter);
Router.put("/jobid/:Job_id", authMiddleware, adminroleMiddleware, updateJobbyRecruiter);
Router.put("/verifier/:id", authMiddleware, adminroleMiddleware, verifier);
Router.post("/check",checkemail)
Router.delete("/candidat/:idUser/jobid/:Job_id", authMiddleware, adminroleMiddleware, deleteCandidat);
Router.get("/Can/Candidats", authMiddleware, adminroleMiddleware, getAllCandidats);
Router.get("/candidat/:idUser/", authMiddleware, adminroleMiddleware, getAllCandidatsbyApplier);
Router.get("/candidat/:idUser/jobid/:Job_id", authMiddleware, adminroleMiddleware, getCandidatById);
Router.post("/addForm",CreateForm);
Router.get('/form/forms',getAllForms);
Router.delete('/form/:id',deleteFormById)
Router.get("/form/:id",getformbyid)


module.exports = Router;
