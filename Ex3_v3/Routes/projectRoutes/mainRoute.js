const express = require('express');
const router = express.Router();
const updateRouter = require('./update').router;
const deleteRouter = require('./delete').router;
const viewRouter = require('./view').router;
const { createProject } = require('../../Queries/projectQueries');
const { handleSuccess, handleError } = require('../../successAndErrorHandlers');

router.use('/update', updateRouter);
router.use('/delete', deleteRouter);
router.use('/view', viewRouter);

router.post('/createProject', async (req, res) => {
    createProject(req).then(result => {
        handleSuccess(res, `Created new project named ${req.body.name}`, result, true);
    }).catch(err => {
        handleError(res, err.message);
    });
});


module.exports = {
    router
}
