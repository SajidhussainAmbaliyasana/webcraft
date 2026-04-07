const logout = async (req, res) => {
    try {
        res.clearCookie("authToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({
            message:"Logged Out Successfully",
            success:true
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", success: false })
    }
}

export default logout;