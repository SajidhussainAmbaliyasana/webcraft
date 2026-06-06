import express from "express";
const router = express.Router();

import auth from "../middlewares/auth.js";

import createCheckoutSession from "../controllers/payment/createCheckOutSession.js";
import stripeWebhook from "../controllers/payment/stripeWebhook.js";
import verifyPayment from "../controllers/payment/verifyPayment.js";


router.post(
    "/create-checkout-session",
    auth,
    createCheckoutSession
);

router.post(
    "/webhook",
    stripeWebhook
);

router.post(
    "/verify-payment",
    auth,
    verifyPayment
);



export default router;