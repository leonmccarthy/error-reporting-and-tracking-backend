const express = require("express");
const app = express();
const db = require("./models");
var cors = require("cors");
require('dotenv').config();

//used to allow usage of json in api request
app.use(express.json());
//for allowing api request in the same device
app.use(cors());

//routers
const userRouter = require('./routers/Users');
const developerRouter = require('./routers/Developers');
const adminRouter = require('./routers/Admins');
const errorRouter = require('./routers/Errors');
const assignedRouter = require('./routers/Assigneds');



//applying routers
app.use("/auth", userRouter);
app.use("/devauth", developerRouter);
app.use("/admauth", adminRouter);
app.use("/error", errorRouter);
app.use("/assigned", assignedRouter);

//process.env.PORT ||
db.sequelize.sync().then(()=>{
    app.listen(3002, ()=>{
        console.log("Server is up and running in port 3002")
    })
}).catch((err)=>{
    console.log(err)
})