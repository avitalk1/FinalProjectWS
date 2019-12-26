const express = require('express');
const router = express.Router();
const { viewUsersBy, deleteUser} = require('../../Queries/userQueries');
const { removeUserFromProject} = require('../../Queries/projectQueries');
const { handleSuccess, handleError } = require('../../successAndErrorHandlers');

router.delete('/byID', async (req, res, next) =>  {
    viewUsersBy({"_id":req.body.id}).then(result =>{
        if(!result.length){
            handleError(res,"no user with this id");
        }else{
            req.body.id = result[0]._id
            req.body.user_type = result[0].user_type;
          next()
        }
    }).catch(err =>{
      handleError(res, err.message);
    });
  },async function(req, res, next){
      removeUserFromProject(req).then(result =>{
          next();
     });
  },async function(req, res){
    deleteUser({"_id":req.body.id}).then(result => {
        handleSuccess(res, `Deleted user with id ${req.body.id}`, [], false);
    }).catch(err => {
        handleError(res, err.message);
    });
});
router.delete('/byEmail', async (req, res,next) => {
    viewUsersBy({"email":req.body.email}).then(result =>{
        if(!result.length){
            handleError(res,"no user with this email");
        }else{
            req.body.id = result[0]._id
            req.body.user_type = result[0].user_type;
          next()
        }
    }).catch(err =>{
      handleError(res, err.message);
    });
  },async function(req, res, next){
      removeUserFromProject(req).then(result =>{
          next();
     });
  },async function(req, res){
    deleteUser({"_id":req.body.id}).then(result => {
        handleSuccess(res, `Deleted user with email ${req.body.email}`, [], false);
    }).catch(err => {
        handleError(res, err.message);
    });
  });
module.exports = {
    router
}
