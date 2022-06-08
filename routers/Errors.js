const express = require("express");
const router = express.Router();
const { Errors } = require("../models")

//creating error
router.post("/", async(req, res)=>{
    const { errorName, errorDescription, errorSteps, username } = req.body;
    const error = await Errors.findOne({where: {errorDescription: errorDescription}});
    //checking if descriptions exist
    if(error){
        res.json({error: "The error description has been repoted already!"})
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
router.get("/byId/:id", async(req, res)=>{
    const id = req.params.id;
    const errorById = await Errors.findOne({where: { id: id}});
    // if(!errorById){
    //     res.json({error: "An error by that id does not exist"});
    // }else{
        //convert errorById into an array
        res.json([errorById]);
        // 
        
    // }
})

module.exports = router ;