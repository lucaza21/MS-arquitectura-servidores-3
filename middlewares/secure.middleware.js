const jwt = require("jsonwebtoken");

module.exports.checkAuth = (req,res,next) =>{
    try{
        const auth = req.headers.authorization;
        const token = auth.split("Bearer ")[1];
        jwt.verify(token, "super-secret21");
        next()
    } catch (error) {
        console.log(error.message)

        return res.status(401).json({message:"Unauthorized", error:error.message })
    }
}