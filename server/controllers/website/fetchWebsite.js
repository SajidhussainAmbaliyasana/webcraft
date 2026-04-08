import Website from '../../models/website.js';

const fetchWebsites = async (req, res) => {
    try {
        const websites = await Website.find({
            ownerId: req.user.userId,
            isDeleted: false
        }).select("_id name slug description  visibility homePageId createdAt").sort({ createdAt: -1 }).lean();

        return res.status(200).json({
            success: true,
            count: websites.length,
            websites
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

export default fetchWebsites;