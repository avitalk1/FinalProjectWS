const express = require('express');
const router = express.Router();
const { handleSuccess, handleError } = require('../../successAndErrorHandlers');
const { viewAllProjects, viewProjectBy } = require('../../Queries/projectQueries');

router.get('/all', async (req, res) => {
  viewAllProjects().then(results => {
    if(!results.length){
        handleError(res, 'No prjects Found');
    }else{
        handleSuccess(res, 'viewing all Projects', results, true);
    }
  }).catch(err=> {
        handleError(res, err.message);
  });
});


router.get('/byName', async (req, res) => {
    viewProjectBy({'name': req.query.name}).then(result => {
        if(!result.length){
            handleError(res, `No project with name ${req.query.name}`);
        }else{
            handleSuccess(res, `Viewing project with name ${req.query.name}`, result, true);
        }
    }).catch(err => {
        handleError(res, err.message);
    });
});


router.get('/byID', async (req, res) => {
    viewProjectBy({'_id': req.query.id}).then(result => {
        if(!result.length){
            handleError(res, `No project with id ${req.query.id}`);
        }else{
            handleSuccess(res, `Viewing project with id ${req.query.id}`, result, true);
        }
    }).catch(err => {
        handleError(res, err.message);
    });
});


router.get('/byStudentID', async (req, res) => {
    viewProjectBy({'students': req.query.student_id}).then(result => {
        if(!result.length){
            handleError(res, `No project with student with id  ${req.query.student_id} found`);
        }else{
            handleSuccess(res, `Viewing project for student with id ${req.query.student_id}`, result, true);
        }
    }).catch(err => {
        handleError(res, err.message);
    });
});


router.get('/byLecturerID', async (req, res) => {
    viewProjectBy({'lecturer': req.query.lecturer_id}).then(results => {
        if(!results.length){
            handleError(res, `No project with lecturer with id  ${req.query.lecturer_id} found`);
        }else{
            handleSuccess(res, `Viewing projects for lecturer with id ${req.query.student_id}`, results, true);
        }
    }).catch(err => {
        handleError(res, err.message);
    })
});


module.exports = {
    router
}