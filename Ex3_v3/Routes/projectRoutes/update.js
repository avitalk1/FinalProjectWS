const express = require('express');
const router = express.Router();
const { updateProject } = require('../../Queries/projectQueries');
const { handleSuccess, handleError } = require('../../successAndErrorHandlers');

router.put('/name', async (req, res) => {
    updateProject(req.body.id, {'name': req.body.name}).then(result => {
        if(result.n === 0){
            handleError(res, `Did not update: no project with id ${req.body.id} found`);
        }else{
            handleSuccess(res, `Updated project name to ${req.body.name}`, [], false);
        }
    }).catch(err => {
        if (err.name === 'MongoError' && err.code === 11000) {
            handleError(res, `Invalid Input Error: Project name : ${req.body.name} is already taken`);
        }else{
            handleError(res, err.message);
        }
    });
});


router.put('/topic', async (req, res) =>{
    updateProject(req.body.id, {'topic': req.body.topic}).then(result => {
        if(result.n === 0){
            handleError(res, `Did not update: no project with id ${req.body.id} found`);
        }else{
            handleSuccess(res, `Updated project topic to ${req.body.topic}`, [], false);
        }   
    }).catch(err => {
        handleError(res, err.message);
    });
});


router.put('/studentList', async (req, res) => {
    updateProject(req.body.id, {'students': req.body.students}).then(result => {
        if(result.n === 0){
            handleError(res, `Did not update: no project with id ${req.body.id} found`);
        }else{
            handleSuccess(res, `Updated project students list`, [], false);
        } 
    }).catch(err => {
        if (err.name === 'MongoError' && err.code === 11000) {
            handleError(res, `Invalid Input Error: Can't assign a student to multiple projects`);
        }else{
            handleError(res, err.message);
        }
    });
});


router.put('/lecturer', async (req, res) => {
    updateProject(req.body.id, {'lecturer': req.body.lecturer}).then(result => {
        if(result.n === 0){
            handleError(res, `Did not update: no project with id ${req.body.id} found`);
        }else{
            handleSuccess(res, `Updated project lecturer`, [], false);
        }
    }).catch(err => {
        handleError(res, err.message);
    });
});


module.exports = {
    router
}