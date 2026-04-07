import { success } from "zod";
import User from "../../models/user.js";

const me = async(req,res)=>{
    try {
        const user = await User.findOne({
            _id:req.user.userId,
            isDeleted:false
        }).select("_id firstName lastName username email phone role status subscription profileImage");

        if(!user){
            return res.status(404).json({message:"User not found",success:false});
        }

        return res.status(200).json({
            success:true,
            data:user
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error",success:false});
    }
}

export default me;