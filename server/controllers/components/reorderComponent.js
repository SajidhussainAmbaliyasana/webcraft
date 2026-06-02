import Component from "../../models/component.js";

const reorderComponents = async (req, res) => {
    try {
        const { order } = req.body;

        if (!Array.isArray(order)) {
            return res.status(400).json({
                success: false,
                message: "Order must be an array"
            });
        }

        //console.log("Step 1");
        for (let i = 0; i < order.length; i++) {
            console.log("Temp", order[i], i + 1000);

            await Component.findByIdAndUpdate(
                order[i],
                {
                    order: i + 1000
                }
            );
        }

        //console.log("Step 2");
        for (let i = 0; i < order.length; i++) {
            console.log("Final", order[i], i + 1);

            await Component.findByIdAndUpdate(
                order[i],
                {
                    order: i + 1
                }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Components reordered successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export default reorderComponents;