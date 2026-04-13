import mongoose from "mongoose";
import { z } from "zod";
import Page from "../../models/page.js";

const updatePageStatus = async (req, res) => {
    try {
        const { pageId } = req.params;
        const { status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(pageId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid page id"
            });
        }

        const validatedStatus = z
            .enum(["draft", "published", "archived"])
            .safeParse(status);

        if (!validatedStatus.success) {
            return res.status(400).json({
                success: false,
                message: "Status must be draft, published or archived"
            });
        }

        const updatedPage = await Page.findOneAndUpdate(
            {
                _id: pageId,
                isDeleted: false
            },
            {
                $set: {
                    status: validatedStatus.data,
                    lastSavedAt: new Date()
                }
            },
            {
                returnDocument: "after",
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
            message: "Page status updated successfully",
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

export default updatePageStatus;