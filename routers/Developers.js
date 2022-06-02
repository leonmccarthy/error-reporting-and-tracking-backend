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
        res.json({error: "Developer account already exist!"})
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
router.post("/login", async(req, res)=>{
    const { username, password } = req.body;
    const developer = await Developers.findOne({ where: { username : username }});

    if(!developer){
        res.json({error: "Developer account does not exist! Please create an account"})
    }else{
        //comparing encrypted password with current password
        bcrypt.compare(password, developer.password).then((match)=>{
            if(!match){
                res.json({error: "Incorrect password!"})
            }else{
                res.json(`Welcome, ${developer.firstname}`)
            }
        })
    }
})

//change password
router.put("/changepassword", async(req, res)=>{
    const { username, oldPassword, newPassword } = req.body;
    const developer = await Developers.findOne({where: { username: username }})
    //compare password
    bcrypt.compare(oldPassword, developer.password).then((match)=>{
        if(!match){
            res.json({error: "Incorrect password!"})
        }else{
            bcrypt.hash(newPassword, 10).then((encrypted)=>{
                Developers.update({password: encrypted}, {where: {username: username}})
                res.json("Password changed successfully!")
            })
        }
    })
})

module.exports = router;