const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
require('dotenv').config();

//routers
const userRouter = require('./routers/Users');
const developerRouter = require('./routers/Developers');
const adminRouter = require('./routers/Admins');
const errorRouter = require('./routers/Errors');
const assignedRouter = require('./routers/Assigneds');

//used to allow usage of json in api request
app.use(express.json());
//for allowing api request in the same device
app.use(cors());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3001/"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

//applying routers
app.use("/auth", userRouter);
app.use("/devauth", developerRouter);
app.use("/admauth", adminRouter);
app.use("/error", errorRouter);
app.use("/assigned", assignedRouter);

db.sequelize.sync().then(()=>{
    app.listen(process.env.PORT ||3001, ()=>{
        console.log("Server is up and running in port 3001")
    })
}).catch((err)=>{
    console.log(err)
})