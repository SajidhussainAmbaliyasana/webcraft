import Website from '../../models/website.js';

const deleteWebsite = async(req,res)=>{
    try {
        const { id } = req.params;

        const website = await Website.findById(id);

        if (
            !website ||
            website.isDeleted ||
            website.ownerId.toString() !== req.user.userId
        ) {
            return res.status(404).json({
                success: false,
                message: "Website not found"
            });
        }

        website.isDeleted = true;
        website.deletedAt = new Date();

        await website.save();

        return res.status(200).json({
            success: true,
            message: "Website deleted successfully"
        });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message:"Internal Server Error",
            success:false
        })
    }
}

export default deleteWebsite;