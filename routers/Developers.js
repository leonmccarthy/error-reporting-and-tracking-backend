const express = require("express");
const router = express.Router();
const { Developers } = require("../models");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

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
                const accessToken = sign({username: developer.username, id: developer.id, role: "developer"}, "importantsecuritycode")

                res.json({ accessToken: accessToken, username: developer.username, id: developer.id, role: "developer", message: `Welcome, ${developer.firstname}`})
                // res.json(`Welcome, ${developer.firstname}`)
            }
        })
    }
})

//checking if validate token 
router.get("/auth", validateToken, async(req,res)=>{
    res.json(req.developer)
})

//change password
router.put("/changepassword",validateToken, async(req, res)=>{
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

//displaying all developers
router.get("/displayAll", async(req, res)=>{
    const allDev = await Developers.findAll();
    res.json(allDev)
})


module.exports = router;