import Page from "../../models/page.js";
import updatePageBasicSchema from "../../validators/page/updateBasic.js";

const updatePageBasic = async (req, res) => {
    try {
        const { pageId } = req.params;

        if (!pageId) {
            return res.status(400).json({
                success: false,
                message: "Page id is required"
            });
        }

        const validatedData = updatePageBasicSchema.safeParse(req.body);

        if (!validatedData.success) {
            return res.status(400).json({
                success: false,
                errors: validatedData.error.flatten().fieldErrors
            });
        }

        const updateData = {
            ...validatedData.data,
            lastSavedAt: new Date()
        };

        const updatedPage = await Page.findOneAndUpdate(
            {
                _id: pageId,
                isDeleted: false
            },
            { $set: updateData },
            {
                new: true,
                runValidators: true,
                lean: true,
                projection: {
                    order: 0,
                    deletedAt: 0,
                    isDeleted: 0,
                    updatedAt: 0,
                    __v: 0
                }
            }
        );

        if (!updatedPage) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Page updated successfully",
            data: updatedPage
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export default updatePageBasic;