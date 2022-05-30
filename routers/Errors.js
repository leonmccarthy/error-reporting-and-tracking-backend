const express = require("express");
const router = express.Router();
const { Errors } = require("../models")

//creating error
router.post("/", async(req, res)=>{
    const { errorName, errorDescription, errorSteps, username } = req.body;
    const error = await Errors.findOne({where: {errorDescription: errorDescription}});
    //checking if descriptions exist
    if(error){
        res.json("The error description has been repoted already!")
    }else{
        Errors.create({
            errorName: errorName,
            errorDescription: errorDescription,
            errorSteps: errorSteps,
            createdBy: username
        })
        res.json("Error reported successfully")
    }
});

//displaying all errors
router.get("/", async(req, res)=>{
    const errors = await Errors.findAll();
    res.json(errors);
})

module.exports = router ;