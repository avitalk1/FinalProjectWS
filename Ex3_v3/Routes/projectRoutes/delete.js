const express = require('express');
const router = express.Router();
const { handleSuccess, handleError } = require('../../successAndErrorHandlers');
const { deleteProject } = require('../../Queries/projectQueries');


router.delete('/byName', async (req, res) => {
    deleteProject({'name': req.body.name}).then(result => {
        handleSuccess(res, `Deleted Project named ${req.body.name}`, result, true);
    }).catch(err => {
        handleError(res, err.message);
    });
});


router.delete('/byID', async (req, res) => {
    deleteProject({'_id': req.body.id}).then(result => {
        handleSuccess(res,`Deleted Project with id ${req.body.id}`, result, true);
    }).catch(err => {
        handleError(res, err.message);
    });
});


module.exports = {
    router
}