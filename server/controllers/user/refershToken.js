import jwt from "jsonwebtoken";

const refreshToken = async (req, res) => {
  try {
    // 1. Get refresh token from cookie
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found",
      });
    }

    // 2. Verify refresh token
    const decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET
    );

    // 3. Create new access token
    const newAccessToken = jwt.sign(
      {
        userId: decoded.userId,
        role: decoded.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
      }
    );

    // 4. Store new access token in cookie
    res.cookie("authToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};

export default refreshToken;