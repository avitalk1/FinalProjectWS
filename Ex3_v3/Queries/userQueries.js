const User = require('../Models/FinalProjectModel').User;
const express = require('express');
const mongoose = require('mongoose');

const createUser = async (req) => {
    const newUser = new User({
        name:{
            first_name: req.body.name.first_name,
            last_name: req.body.name.last_name
        },
        email: req.body.email,
        user_type: req.body.user_type
    });
    const result = await newUser.save();
    return result;
}

const viewUsersBy = async(_query) => {
    const results = await User.find(_query);
    return results;
}

const deleteUser = async (_query) => {
    const result = await User.deleteOne(_query);
    return result;
}


const viewAllUsers = async () => {
    const results = await User.find();
    return results;
}


const updateUser = async (id,_toUpdate) => {
    const result = await User.updateOne({_id: id}, _toUpdate)
    return result;
}


module.exports = {
    createUser,
    viewAllUsers,
    viewUsersBy,
    deleteUser,
    updateUser
}