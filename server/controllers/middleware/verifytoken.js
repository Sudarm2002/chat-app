import jwt from "jsonwebtoken";

export const verifyToken=(
    req,
    res,
    next
)=>{
    const authheader=req.headers.authorization;
    if(!authheader) {
        return res.status(200).json({
            message:"No token"
        })
    }

    const token=authheader.split(" ")[1];
    jwt.verify(
        token,
        process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                 return res.status(403).json({
                message: "Invalid Token",
                });
             }
             req.user=decoded
             next()
        }
    )
}
