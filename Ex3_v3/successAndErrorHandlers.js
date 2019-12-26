const express = require('express');

const handleSuccess = (res, msg, results, jsonFlag) => {
    console.log(msg);
    if(jsonFlag){
        res.json(results);
    }else{
        res.send(msg);
    }
};


const handleError = (res, msg) => {
    console.log(msg);
    res.status(500).json({message: msg});
};


module.exports = {
    handleSuccess,
    handleError
}