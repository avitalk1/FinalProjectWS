const FinalProject = require('../Models/FinalProjectModel').FinalProject;
const express = require('express');
const mongoose = require('mongoose');

const removeUserFromProject = async (req) =>{
    var val1, val2;
    if(req.body.user_type == 'Student'){
        val1 = {'students':req.body.id};
        val2 = {$pull:{'students':req.body.id}}
    }else{
        val1 = {'lecturer':req.body.id};
        val2 = {$set:{'lecturer':undefined}}
    }
    const result = FinalProject.updateOne(val1, val2);
    return result;
}
const createProject = async (req) => {
    const newProject = new FinalProject({
        topic: req.body.topic,
        name: req.body.topic,
        students: req.body.students,
        lecturer: req.body.lecturer
    });
    const result = await newProject.save();
    return result;
}
const deleteProject = async (_query) => {
    const result = await FinalProject.deleteOne(_query);
    return result;
}
const viewAllProjects = async () => {
    const results = await FinalProject.find();
    return results;
}
const viewProjectBy = async (_query) => {
    const result = await FinalProject.find(_query);
    return result
}
const updateProject = async (id, _toUpdate) => {
    const result = await FinalProject.updateOne({_id: id}, _toUpdate);
    return result;
}
module.exports = {
    createProject,
    deleteProject,
    viewAllProjects, 
    viewProjectBy,
    updateProject,
    removeUserFromProject
}