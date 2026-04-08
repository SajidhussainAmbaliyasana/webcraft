import Website from '../../models/website.js'

const getWebsite = async (req, res) => {
    try {
        const website = await Website.findById(req.params.id).select(`_id name slug description logo favicon status
             visibility homepageId templateId themeId createdAt updatedA`).lean();

        if(!website){
            return res.status(404).json({
                message:"Website Not Found",
                success:false
            });
        }

        return res.status(200).json({
            success:true,
            website
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

export default getWebsite;