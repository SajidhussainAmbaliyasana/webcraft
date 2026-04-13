import Page from '../../models/page.js';

const getPage = async (req, res) => {
    try {
        const { pageId } = req.params;

        if (!pageId) {
            return res.status(400).json({
                success: false,
                message: "Page id is required"
            });
        }

        const page = await Page.findOne({
            _id: pageId,
            isDeleted: false
        }).select("-order -deletedAt -isDeleted -updatedAt -__v")
            .lean();

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: page
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export default getPage;