import jwt from 'jsonwebtoken';


const auth = async(req,res,next) =>{
    try {
        const token = req.cookies.authToken;

        if(!token){
            return res.status(401).json({
                message:"Unthorized. Please Login First",
                success:false
            });
        };

        const decode = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

        req.user = {
            userId:decode.userId,
            role:decode.role
        }
        next();

    } catch (error) {
        return res.status(400).json({
            message:"Invalid or expired Token",
            success:false
        })
    }
}

export default auth