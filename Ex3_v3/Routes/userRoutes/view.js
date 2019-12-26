const express = require('express');
const router = express.Router();
const User = require('../../Models/FinalProjectModel').User;
const {viewAllUsers,viewUsersBy} = require('../../Queries/userQueries');
const { handleSuccess, handleError } = require('../../successAndErrorHandlers');

router.get('/all', (req, res) => {
    viewAllUsers().then(results => {
        if(!results.length){
           handleError(res, 'No users Found');
        }else{
            handleSuccess(res, 'Viewing all users', results, true);
        }
    }).catch(err => {
        handleError(res, err.message);
    });
});


router.get('/students',async (req, res) => {

    viewUsersBy({"user_type": "Student"}).then(results => {

        if(!results.length){
            handleError(res, 'No Students Found');
        }else{
            handleSuccess(res, 'Viewing all students', results, true);
        }
    }).catch(err => {
        handleError(res, err.message);
    })
});


router.get('/lecturers', async (req, res) => {
    viewUsersBy({"user_type": "Lecturer"}).then(results => {
        if(!results.length){
            handleError(res, 'No lecturers Found');
        }else{
            handleSuccess(res, 'Viewing all lecturers', results, true);
        }
    }).catch(err => {
        handleError(res, err.message);
    });
});


router.get('/byID', async (req, res) => {
    viewUsersBy({"_id": req.query.id}).then(results => {
        if(!results.length){
            handleError(res, `No User with id ${req.query.id} found`);
        }else{
            handleSuccess(res, `Viewing User with id ${req.query.id}`, results, true);
        }
    }).catch(err => {
        handleError(res, err.message);
    });
});


router.get('/byEmail', async (req, res) => {
    viewUsersBy({"email": req.query.email}).then(results => {
        if(!results.length){
            handleError(res, `No User with email ${req.query.email} found`);
        }else{
            handleSuccess(res, `Viewing user with email ${req.query.email}`, results, true);
        }
    }).catch(err => {
        handleError(res, err.message);
    });
});


module.exports = {
    router
}
