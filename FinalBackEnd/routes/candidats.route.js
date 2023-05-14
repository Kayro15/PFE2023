const Router = require("express").Router();

const {
    UpdateCandidat,
    createCandidat,
    getCandidatById,
    getAllCandidats,
    deleteCandidat,
    getAllCandidatsforRecruiter,
    jobseekerdeleteCandidat,
    // updateJob,
    //deleteJob,
    // getAllJobs,
    // getJobById, 
} = require("../controllers/candidats.crontroller");
const authMiddleware = require("../middleware/auth.middleware");
const candidatsMiddleware = require("../middleware/Candidats.middleware");
const rolegetmidleware=require("../middleware/Candidatsget.middleware")

Router.post("/:job_id", authMiddleware, candidatsMiddleware, createCandidat);

Router.get("/candidat/:idUser/jobid/:Job_id", authMiddleware, candidatsMiddleware, getCandidatById);
Router.get('/', authMiddleware, candidatsMiddleware, getAllCandidats);
Router.get('/score/job_id/:Job_id', authMiddleware, rolegetmidleware, getAllCandidatsforRecruiter);
Router.delete('/delete/:idUser/jobid/:Job_id', authMiddleware, deleteCandidat);
Router.put('/:idUser/jobid/:idJob', UpdateCandidat);
Router.delete('/delete/job_id/:Job_id',authMiddleware,jobseekerdeleteCandidat)
// Router.get("/:id",authMiddleware,jobroleMiddleware, getJobById); //req.params.id
// Router.delete("/:id",authMiddleware , candidatsMiddleware, deleteJob);
//  Router.put("/:id",authMiddleware,jobroleMiddleware,updateJob);

module.exports = Router;
