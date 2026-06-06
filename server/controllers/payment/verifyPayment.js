import stripe from "../../config/stripe.js";
import User from "../../models/user.js";

const verifyPayment = async (req, res) => {
    try {

        const { sessionId } = req.body;

        if (!sessionId) {
            return res.status(400).json({
                success: false,
                message: "Session ID is required"
            });
        }

        const session =
            await stripe.checkout.sessions.retrieve(
                sessionId
            );

        if (session.payment_status !== "paid") {
            return res.status(400).json({
                success: false,
                message: "Payment not completed"
            });
        }

        const userId = session.metadata.userId;
        const plan = session.metadata.plan;

        const user =
            await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (
            user.subscription.plan === plan
        ) {
            return res.status(200).json({
                success: true,
                message: "Subscription already active",
                plan
            });
        }

        user.subscription.plan = plan;
        user.subscription.startedAt = new Date();
        user.subscription.expiresAt = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Subscription activated",
            plan
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export default verifyPayment;