import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useVerifyPaymentMutation } from "../redux/api/authApi";
import useSnackbar from "../hooks/useSnackbar";

const PaymentSuccess = () => {

    const navigate = useNavigate();
    const notify = useSnackbar();

    const [searchParams] = useSearchParams();

    const [verifyPayment] =
        useVerifyPaymentMutation();

    useEffect(() => {

        const verify = async () => {

            try {

                const sessionId =
                    searchParams.get(
                        "session_id"
                    );

                if (!sessionId) {

                    notify.error(
                        "Invalid payment session"
                    );

                    navigate(
                        "/dashboard/settings"
                    );

                    return;
                }

                const response =
                    await verifyPayment({
                        sessionId
                    }).unwrap();

                notify.success(
                    //response.message
                    "Payment Done"
                );

                navigate(
                    "/dashboard/settings"
                );

            } catch (error) {

                notify.error(
                    error?.data?.message ||
                    "Payment verification failed"
                );

                navigate(
                    "/dashboard/settings"
                );
            }
        };

        verify();

    }, []);

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <h2>
                Verifying Payment...
            </h2>
        </div>
    );
};

export default PaymentSuccess;