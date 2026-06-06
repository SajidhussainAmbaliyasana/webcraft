import stripe from "../../config/stripe.js";

const createCheckoutSession = async (req, res) => {
  try {
    const { plan } = req.body;

    let priceId;

    switch (plan) {
      case "pro":
        priceId = process.env.PRO_PRICE_ID;
        break;

      case "business":
        priceId = process.env.BUSINESS_PRICE_ID;
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid plan selected"
        });
    }

    const session =
      await stripe.checkout.sessions.create({
        mode: "subscription",

        payment_method_types: ["card"],

        line_items: [
          {
            price: priceId,
            quantity: 1
          }
        ],

        metadata: {
          userId: req.user.userId,
          plan
        },

        success_url:
          `${process.env.CLIENT_URL}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:
          `${process.env.CLIENT_URL}/dashboard/settings?payment=cancel`
      });

    return res.status(200).json({
      success: true,
      url: session.url
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

export default createCheckoutSession;