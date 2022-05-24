const express = require("express");
const router = express.Router();
const { Admins } = require("../models");
const bcrypt = require("bcryptjs");

//registering admin
router.post("/", async(req, res)=>{
    const { firstname, lastname, username, password } = req.body;
    const admin = await Admins.findOne({ where: { username: username }});
    //checking if the user already exist
    if(admin){
        res.json("Admin account already exist!")
    }else{
        //encrypting the password
        bcrypt.hash(password, 10).then((encrypted)=>{
            Admins.create({
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: encrypted
            })
            res.json("Admin account created successfully!")
        })
    }
})

//logging in admin
router.get("/login", async(req, res)=>{
    const { username, password } = req.body;
    const admin = await Admins.findOne({ where: { username: username}})
    //checking if admin account exist
    if(!admin){
        res.json("Admin account does not exist!")
    }else{
        //checking is passwords match
        bcrypt.compare(password, admin.password).then((match)=>{
            if(!match){
                res.json("Incorrect password")
            }else{
                res.json(`Welcome, ${admin.firstname}`)
            }
        })
    }
})

module.exports = router;