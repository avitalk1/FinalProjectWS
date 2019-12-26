const express = require('express');
const router = express.Router();
const { updateUser } = require('../../Queries/userQueries');
const { handleSuccess, handleError } = require('../../successAndErrorHandlers');

router.put('/name', async (req, res) => {
    updateUser(req.body.id, {'name': req.body.name}).then(result => {
        if(result.n === 0){
            handleError(res, `Cant't Update users name : No user found with id: ${req.body.id}`);
        }else{
            handleSuccess(res, `Updated user name to ${req.body.name.first_name} ${req.body.name.last_name}`, [], false);
        }
    }).catch(err => {
        handleError(res, err.message);
    });
});


router.put('/email', async (req, res) => {
    updateUser(req.body.id, {'email': req.body.email}).then(result => {
        if(result.n === 0){
            handleError(res, `Cant't Update users email : No user found with id: ${req.body.id}`);
        }else{
            handleSuccess(res,`Updated user email to ${req.body.email}`, [], false);
        }
    }).catch(err => {
        if (err.name === 'MongoError' && err.code === 11000) {
            handleError(res, `Invalid Input Error: Email: ${req.body.email} is already in our system`);
        }else{
            handleError(res, err.message);
        }
    });
});


module.exports = {
    router
}
