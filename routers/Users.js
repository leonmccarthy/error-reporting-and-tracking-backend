const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcryptjs');

// creating/registering users      ********NEED TO ADD FIELDS********
router.post("/", async(req, res)=>{
    const { firstname, lastname, username, password } = req.body;
    const user = await Users.findOne({where: {username :username}});
    //checking if the user exists
    if(user){
        res.json({error: "User account already exists"});
    } else{
        //encrypting password
        bcrypt.hash(password, 10).then((encrypted)=>{
            Users.create({
                firstname: firstname,
                lastname: lastname,
                username : username,
                password : encrypted
            })
            res.json("User account created successfully!")
        })
    }

})

// logging in users
router.post("/login", async(req, res)=>{
    const { username, password } = req.body;
    const user = await Users.findOne({ where : { username: username}});
    if(!user){
        res.json({error: "User does not exist! Please register an account"})
    } else{
        //comparing login password with already created password
        bcrypt.compare(password, user.password).then((match)=>{
            if(match){
                res.json(`Welcome, ${user.firstname}`)
            }else{
                res.json({error: "Incorrect password!"})
            }
        })
    }
})

//change password
router.put("/changepassword", async(req, res)=>{
    const { username, oldPassword, newPassword } = req.body;
    const user = await Users.findOne({ where: { username: username }})
    //compare password
    bcrypt.compare(oldPassword, user.password).then((match)=>{
        if(!match){
            res.json({error: "Incorrect password!"})
        }else{
            bcrypt.hash(newPassword, 10).then((encrypted)=>{
               Users.update({password: encrypted},{where: {username: username}})
                res.json("Password changed successfully")
            })
        }
    })
})

module.exports = router;