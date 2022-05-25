const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors")


//routers
const userRouter = require('./routers/Users');
const developerRouter = require('./routers/Developers')
const adminRouter = require('./routers/Admins')
const errorRouter = require('./routers/Errors')

//used to allow usage of json in api request
app.use(express.json())
//for allowing api request in the same device
app.use(cors())

//applying routers
app.use("/auth", userRouter);
app.use("/devauth", developerRouter);
app.use("/admauth", adminRouter);
app.use("/error", errorRouter);

db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log("Server is up and running in port 3001")
    })
}).catch((err)=>{
    console.log(err)
})