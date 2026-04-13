// import Website from '../../models/website.js';

// const deleteWebsite = async(req,res)=>{
//     try {
//         const { id } = req.params;

//         const website = await Website.findById(id);

//         if (
//             !website ||
//             website.isDeleted ||
//             website.ownerId.toString() !== req.user.userId
//         ) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Website not found"
//             });
//         }

//         website.isDeleted = true;
//         website.deletedAt = new Date();

//         await website.save();

//         return res.status(200).json({
//             success: true,
//             message: "Website deleted successfully"
//         });
//     } catch (error) {
//         console.log(error);
        
//         return res.status(500).json({
//             message:"Internal Server Error",
//             success:false
//         })
//     }
// }

// export default deleteWebsite;
import Website from '../../models/website.js';
import Page from '../../models/page.js';
import Section from '../../models/section.js';
import Component from '../../models/component.js';

const deleteWebsite = async (req, res) => {
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

        const now = new Date();

        const pages = await Page.find({
            websiteId: id,
            isDeleted: false
        })
            .select("_id")
            .lean();

        const pageIds = pages.map(page => page._id);

        const sections = await Section.find({
            pageId: { $in: pageIds },
            isDeleted: false
        })
            .select("_id")
            .lean();

        const sectionIds = sections.map(section => section._id);

        if (sectionIds.length > 0) {
            await Component.updateMany(
                {
                    sectionId: { $in: sectionIds },
                    isDeleted: false
                },
                {
                    $set: {
                        isDeleted: true,
                        deletedAt: now
                    }
                }
            );
        }

        if (pageIds.length > 0) {
            await Section.updateMany(
                {
                    pageId: { $in: pageIds },
                    isDeleted: false
                },
                {
                    $set: {
                        isDeleted: true,
                        deletedAt: now
                    }
                }
            );

            await Page.updateMany(
                {
                    websiteId: id,
                    isDeleted: false
                },
                {
                    $set: {
                        isDeleted: true,
                        deletedAt: now,
                        lastSavedAt: now
                    }
                }
            );
        }

        website.isDeleted = true;
        website.deletedAt = now;

        await website.save();

        return res.status(200).json({
            success: true,
            message: "Website and all related pages, sections and components deleted successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export default deleteWebsite;