const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../config/db");
const FormCandidats=require('./FormCandidats.model.js')

const CustomForm = sequelize.define(
  'CustomForm',
  {
    formName: {
      type: DataTypes.STRING,
      allowNull: false,
      require:true ,
      unique:true,
    },
fields: {
  type: DataTypes.ARRAY(DataTypes.JSON),
  allowNull: false,
}, 
},
{ freezeTableName: true, timestamps: true }
);
CustomForm.hasMany(FormCandidats, { foreignKey: "idForm" });
FormCandidats.belongsTo(CustomForm, { foreignKey: "idForm" });

module.exports = CustomForm










