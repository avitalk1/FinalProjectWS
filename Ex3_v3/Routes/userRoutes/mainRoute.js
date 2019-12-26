const express = require('express');
const router = express.Router();
const updateRouter = require('./update').router;
const deleteRouter = require('./delete').router;
const viewRouter = require('./view').router;
const { createUser } = require('../../Queries/userQueries');
const { handleSuccess, handleError } = require('../../successAndErrorHandlers');

router.use('/update', updateRouter);
router.use('/delete',deleteRouter);
router.use('/view',viewRouter);


router.post('/createUser', async (req, res) => {
    createUser(req).then(result => {
        handleSuccess(res, `created new user`, result, true);
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

