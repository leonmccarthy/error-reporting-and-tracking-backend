const express = require("express");
const router = express.Router();
const { Admins } = require("../models");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken")
const { validateToken } = require("../middlewares/AuthMiddleware")

//registering admin
router.post("/", async(req, res)=>{
    const { firstname, lastname, username, password } = req.body;
    const admin = await Admins.findOne({ where: { username: username }});
    //checking if the user already exist
    if(admin){
        res.json({error: "Admin account already exist!"})
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
router.post("/login", async(req, res)=>{
    const { username, password } = req.body;
    const admin = await Admins.findOne({ where: { username: username}})
    //checking if admin account exist
    if(!admin){
        res.json({error: "Admin account does not exist!"})
    }else{
        //checking is passwords match
        bcrypt.compare(password, admin.password).then((match)=>{
            if(!match){
                res.json({error: "Incorrect password!"})
            }else{
                const accessToken = sign( {username: admin.username, id: admin.id, role: "admin"}, "importantsecuritycode" );

                res.json( {accessToken: acceaccessTokenssToken, username: admin.username, id: admin.id, role: "admin", message: `Welcome, ${username}`} );
                // res.json(`Welcome, ${username}`)
            }
        })
    }
})

//checking if validate token 
router.get("/auth", validateToken, async(req,res)=>{
    res.json(req.admin)
})


//change password
router.put("/changepassword", validateToken, async(req, res)=>{
    const { username, oldPassword, newPassword } = req.body;
    const developer = await Admins.findOne({where: { username: username}})
    //compare passwords
    bcrypt.compare(oldPassword, developer.password).then((match)=>{
        if(!match){
            res.json("Incorrect password!")
        }else{
            bcrypt.hash(newPassword, 10).then((encrypted)=>{
                Admins.update({password: encrypted}, {where: {username: username}})
                res.json("Password changed successfully")
            })
        }
    })
})

module.exports = router;