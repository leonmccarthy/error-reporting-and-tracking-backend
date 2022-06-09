const express = require("express");
const router = express.Router();
const { Assigneds, Developers } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

//assigning error
router.post("/", validateToken, async(req, res)=>{
    const { errorName, errorDescription, errorSteps,
         username, developerAssigned, priority, stepsToComplete, stepsDone } = req.body;
    const assigned = await Assigneds.findOne({ where: { errorDescription: errorDescription }});
    //checking if the error has been assigned already
    if(assigned){
        res.json({error: "The error is already assigned to a developer"});
    }else{
        Assigneds.create({
            errorName: errorName,
            errorDescription: errorDescription,
            errorSteps: errorSteps,
            createdBy: username,
            priority: priority,
            developerassigned: developerAssigned,
            stepsToComplete: stepsToComplete,
            stepsDone: stepsDone
        });
        // const dev = await Developers.findOne({where:{username: developerAssigned}});
        // const devId = dev.id;
        // Assigneds.update({DeveloperId: devId},{where: {developerAssigned: developerAssigned}})
        res.json("Error has been successfully assigned");
    }
})

//inputing no of steps
router.put("/steps", validateToken, async(req, res)=>{
    const { errorDescription, stepsToComplete } = req.body;
    const error = await Assigneds.findOne({ where: { errorDescription: errorDescription} });

    if(!error){
        res.json({error: "Error does not exist"})
    }else{
        Assigneds.update({ stepsToComplete: stepsToComplete}, { where: { errorDescription: errorDescription}});
        res.json("Number of steps to solve the error entered successfully");
    }
})

//inputing no of steps
router.put("/stepsdone", validateToken, async(req, res)=>{
    const { errorDescription, stepsDone } = req.body;
    const error = await Assigneds.findOne({ where: { errorDescription: errorDescription} });

    if(!error){
        res.json({error: "Error does not exist"})
    }else{
        Assigneds.update({ stepsDone: stepsDone}, { where: { errorDescription: errorDescription}});
        res.json("Number of steps done to solve the error updated successfully");
    }
})

//viewing all assigned errors
router.get("/display", async(req, res)=>{
    const assigned = await Assigneds.findAll();
    res.json(assigned);
});

//display by id
router.get("/display/byId/:id", async(req, res)=>{
    const id = req.params.id;
    const assignedById = await Assigneds.findOne({where: {id: id}});
    res.json([assignedById])
})

module.exports = router;