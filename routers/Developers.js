const express = require("express");
const router = express.Router();
const { Developers } = require("../models");
const bcrypt = require("bcryptjs");

//registering developers
router.post("/", async (req, res)=>{
    const { firstname, lastname, username, password } = req.body;
    const developer = await Developers.findOne({ where: { username: username}});
    
    //checking s developer exists
    if(developer){
        res.json("Developer account already exist!")
    }else{
        bcrypt.hash(password, 10).then((encrypted)=>{
            Developers.create({
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: encrypted
            })
            res.json("Developer account created successfully")
        })
    }
})

//logging in developer
router.get("/login", async(req, res)=>{
    const { username, password } = req.body;
    const developer = await Developers.findOne({ where: { username : username }});

    if(!developer){
        res.json("Developer account does not exist! Please crate an account")
    }else{
        //comparing encrypted password with current password
        bcrypt.compare(password, developer.password).then((match)=>{
            if(!match){
                res.json("Incorrect password!")
            }else{
                res.json(`Welcome, ${developer.firstname}`)
            }
        })
    }
})

module.exports = router;