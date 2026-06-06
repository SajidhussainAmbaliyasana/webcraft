import stripe from "../../config/stripe.js";
import User from "../../models/user.js";

const stripeWebhook = async (req, res) => {
  try {

    const sig =
      req.headers["stripe-signature"];

    const event =
      stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

    if (
      event.type ===
      "checkout.session.completed"
    ) {

      const session = event.data.object;

      const userId =
        session.metadata.userId;

      const plan =
        session.metadata.plan;

      const user =
        await User.findById(userId);

      if (user) {

        user.subscription.plan = plan;

        user.subscription.startedAt =
          new Date();

        user.subscription.expiresAt =
          null;

        await user.save();
      }
    }

    return res.status(200).json({
      received: true
    });

  } catch (error) {

    console.log(error);

    return res.status(400).send(
      `Webhook Error: ${error.message}`
    );
  }
};

export default stripeWebhook;