const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next)=>{
    //getting accessToken from frontend
    const accessToken = req.header("accessToken");
    if(!accessToken){
        return res.json({error: "You must login inorder to perform operations"})
    }else{
        try{
            //verifying token validity
            const validToken = verify(accessToken, "importantsecuritycode");
            req.admin = validToken;
            req.developer = validToken;
            req.user = validToken;
            if(validToken){
                return next();
            }
        }catch(err){
            return res.json({error: err})
        }
        
    }
}

module.exports = { validateToken }