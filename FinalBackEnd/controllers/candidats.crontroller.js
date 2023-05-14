const Candidats = require("../models/candidats.model");
const job_offer = require("../models/job_offers.model");
const Job_seeker = require("../models/job_seeker.model");
const User = require("../models/user.model");
const user = require("../models/user.model");
const axios = require("axios");
const createCandidat = async (req, res) => {
  try {
    const applier_id = req.user.userId;
    const { job_id } = req.params;
    // Check if job offer exists
    const jobOffer = await job_offer.findOne({ where: { id: job_id } });
    if (!jobOffer) {
      return res.status(400).json({ message: "Offre d'emploi introuvable" });
    }
    // Check if candidate already exists for the job offer
    const existingCandidate = await Candidats.findOne({
      where: { idJob: job_id, idUser: applier_id },
    });
    if (existingCandidate) {
      return res
        .status(400)
        .json({ errorMessage: "La candidature existe déjà pour cette offre d'emploi" });
    }
 
    const { degrees, Skills, majors, job_description } = req.body
    const formData = new FormData();
    formData.append('job_description', jobOffer.job_description);
    formData.append('degrees', degrees);
    formData.append('Skills', Skills);
    formData.append('Acceptable_majors', majors);
    const { data } = await axios.post("http://127.0.0.1:3002/score", formData);
    const score = parseFloat(data);

    // Create new candidate
    const candidat = await Candidats.create({
      idJob: job_id,
      idUser: applier_id,
      Score:score,
    });

    return res.status(201).json({ candidat});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getCandidatById = async (req, res) => {
  try {
    idJob = req.params.Job_id;
    idUser = req.params.idUser;
    const candidat = await Candidats.findOne({
      where: {
        idJob: idJob,
        idUser: idUser,
      },
      include: [
        {
          model: job_offer,
          require: false,
          attributes:['location',"title"]
        },
        {
          model: User,
          require: false,
          attributes:['fullName','phoneNumber','email'],
        },
      ],
    });

    if (!candidat) {
      return res.status(404).json({ message: "Candidat introuvable" });
    }

    return res.status(200).json({ data:candidat });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllCandidats = async (req, res) => {
  const applier_id = req.user.userId;
  const pageSize = 5;
  const pageNumber = Number(req.query.pageNumber) || 1;
  try {
    const { count, rows: candidats } = await Candidats.findAndCountAll({
      offset: (pageNumber - 1) * pageSize,
      limit: pageSize,
      order: [["createdAt", "DESC"]],
      where: {
        idUser: applier_id,
      },
      include: [
        {
          model: job_offer,
          attributes: ["id","title", "location", "company"],
        }
      ],
      attributes:['applicationStatus','interviewDate']
    });
    return res.status(200).json({
      success: true,
      data: candidats,
      pageNumber,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
      totalRecords: count,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const UpdateCandidat = async (req, res) => {
  try {
    const idJob = req.params.idJob;
    const idUser = req.params.idUser; 
    const candidat = await Candidats.findOne({ where: { idJob: idJob, idUser: idUser } })
    if (!candidat)
    {
      return res.status(400).json({
        succes: false,
        message:"mauvaise requête"
      })
    }
    const { interviewDate, applicationStatus } = req.body
    const updatecandidat = await Candidats.update(
      { interviewDate: interviewDate, applicationStatus: applicationStatus },
      { where: {idJob: idJob, idUser: idUser} }
     )
    res.status(200).json({
      succes: true,
      data: updatecandidat,
      message:"Mis à jour avec succés"
    })
  } catch (error) {
    res.status(500).json({
      
      message:error.message
    })
  }
};

const deleteCandidat = async (req, res) => {
  try{
  idUser = req.params.idUser;
  idJob = req.params.Job_id;
  // Check if candidate exists
  const existingCandidate = await Candidats.findOne({
    where: { idJob: idJob, idUser: idUser },
  });
  if (!existingCandidate) {
    return res.status(404).json({ message: "Candidature introuvable" });
  }

  // Delete candidate
  await existingCandidate.destroy();

  return res.status(204).json({message:"Candidature supprimé avec succès"});
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: error.message });
}
};

const jobseekerdeleteCandidat = async (req, res) => {
  try{
  idUser = req.user.userId;
  const job_id = req.params.Job_id;
  // Check if candidate exists
  const existingCandidate = await Candidats.findOne({
    where: { idJob: job_id, idUser: idUser },
  });
  if (!existingCandidate) {
    return res.status(404).json({ message: "Candidature introuvable" });
  }

  // Delete candidate
  await existingCandidate.destroy();

  return res.status(204).json({message:"Candidature supprimé avec succès"});
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: error.message });
}
};

const getAllCandidatsforRecruiter = async (req, res) => {
  try {
    const idJob = req.params.Job_id
    const pageSize = 5;
    const pageNumber = Number(req.query.pageNumber) || 1;
    const { count, rows: candidats } = await Candidats.findAndCountAll({
      offset: (pageNumber - 1) * pageSize,
      limit: pageSize,
      order: [["Score", "DESC"]],
      where: {
        idJob:idJob,},
      include: [
        {
          model: job_offer,
          require: false,
          attributes:['location',"title"]
        },
        {
          model: user,
          require: false,
          attributes:['fullName','email','phoneNumber']
        }
      ],
    });
    if (!candidats) {
      return res.status(400).json({ message: "candidats not found" });
    }
    return res.status(200).json({
      succes: true,
      message: "Données récupérées avec succès",
      data: candidats,
      pageNumber,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
      totalRecords: count,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  UpdateCandidat,
  createCandidat,
  getCandidatById,
  getAllCandidats,
  deleteCandidat,
  getAllCandidatsforRecruiter,
  jobseekerdeleteCandidat
};
