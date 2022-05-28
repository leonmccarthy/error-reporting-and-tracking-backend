const express = require("express");
const router = express.Router();
const { Assigneds } = require("../models");

//assigning error
router.post("/", async(req, res)=>{
    const { errorName, errorDescription, errorSteps,
         username, developerAssigned, stepsToComplete, stepsDone } = req.body;
    const assigned = await Assigneds.findOne({ where: { errorDescription: errorDescription }});
    //checking if the error has been assigned already
    if(assigned){
        res.json("The error is already assigned to a developer");
    }else{
        Assigneds.create({
            errorName: errorName,
            errorDescription: errorDescription,
            errorSteps: errorSteps,
            createdBy: username,
            developerassigned: developerAssigned,
            stepsToComplete: stepsToComplete,
            stepsDone: stepsDone
        })
        res.json("Error has been successfully assigned");
    }
})

//inputing no of steps
router.put("/steps", async(req, res)=>{
    const { errorDescription, stepsToComplete } = req.body;
    const error = await Assigneds.findOne({ where: { errorDescription: errorDescription} });

    if(!error){
        res.json("Error does not exist")
    }else{
        Assigneds.update({ stepsToComplete: stepsToComplete}, { where: { errorDescription: errorDescription}});
        res.json("Number of steps to solve the error entered successfully");
    }
})

//inputing no of steps
router.put("/stepsdone", async(req, res)=>{
    const { errorDescription, stepsDone } = req.body;
    const error = await Assigneds.findOne({ where: { errorDescription: errorDescription} });

    if(!error){
        res.json("Error does not exist")
    }else{
        Assigneds.update({ stepsDone: stepsDone}, { where: { errorDescription: errorDescription}});
        res.json("Number of steps done to solve the error updated successfully");
    }
})

module.exports = router;