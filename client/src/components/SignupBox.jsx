import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider,
  alpha,
  LinearProgress,
} from "@mui/material";

import MailOutlineIcon from "@mui/icons-material/MailOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useSignupMutation } from "../redux/api/authApi";


import { COLORS } from "../theme";

const getPasswordStrength = (password) => {
  if (!password) {
    return {
      score: 0,
      label: "",
      color: "transparent",
    };
  }

  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const map = [
    { label: "Too short", color: "#f87171" },
    { label: "Weak", color: "#fbbf24" },
    { label: "Fair", color: "#fbbf24" },
    { label: "Strong", color: "#34d399" },
    { label: "Very strong", color: "#4fc3f7" },
  ];

  return {
    score,
    ...map[score],
  };
};

const SignupBox = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [signup, { isLoading }] = useSignupMutation();

  const [showPass, setShowPass] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({});

  const [apiError, setApiError] = useState("");



  const navigate = useNavigate();

  const strength = getPasswordStrength(form.password);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (apiError) {
      setApiError("");
    }
  };

  const validate = () => {
    const errors = {};

    if (!form.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!form.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!form.username.trim()) {
      errors.username = "Username is required";
    }

    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Enter a valid email";
    }

    if (!form.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      const bodyData = {
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        email: form.email,
        phone: form.phone,
        password: form.password,
        confirmPassword: form.confirmPassword
      };

      const response = await signup(bodyData).unwrap();

      if(response.success){

        navigate("/dashboard");
      }



    } catch (error) {
      console.log(error);

      setApiError(
        error?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "42%" },
        maxWidth: "500px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: 1,
        overflowY: "auto",

        "&::-webkit-scrollbar": {
          width: "3px",
        },

        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },

        "&::-webkit-scrollbar-thumb": {
          background: "rgba(99,179,237,0.25)",
          borderRadius: "4px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: {
            xs: "40px 24px 48px 24px",
            md: "52px 48px 48px 48px",
          },

          pr: {
            md: "44px",
          },
        }}
      >
        {/* Mobile logo */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            gap: 1.2,
            mb: 4,
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "9px",
              background: "linear-gradient(135deg, #4fc3f7, #7c4dff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 15,
              color: "#fff",
            }}
          >
            W
          </Box>

          <Typography
            variant="h5"
            sx={{
              color: COLORS.textPrimary,
            }}
          >
            Webcraft
          </Typography>
        </Box>

        {/* Heading */}
        <Box
          sx={{
            mb: 3,
            flexShrink: 0,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              mb: 1,
            }}
          >
            GET STARTED
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontSize: "2rem",
              mb: 1,
            }}
          >
            Create account
          </Typography>

          <Typography variant="body2">
            Already have an account?{" "}

            <Box
              component={RouterLink}
              to="/login"
              sx={{
                color: COLORS.cyan,
                textDecoration: "none",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.78rem",

                "&:hover": {
                  opacity: 0.75,
                },
              }}
            >
              Sign in →
            </Box>
          </Typography>
        </Box>

        {apiError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {apiError}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <TextField
            label="First name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            autoComplete="given-name"
            fullWidth
            error={!!fieldErrors.firstName}
            helperText={fieldErrors.firstName}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon
                      sx={{
                        fontSize: 18,
                        color: COLORS.textMuted,
                      }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            label="Last name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            autoComplete="family-name"
            fullWidth
            error={!!fieldErrors.lastName}
            helperText={fieldErrors.lastName}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon
                      sx={{
                        fontSize: 18,
                        color: COLORS.textMuted,
                      }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            autoComplete="username"
            fullWidth
            error={!!fieldErrors.username}
            helperText={fieldErrors.username}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon
                      sx={{
                        fontSize: 18,
                        color: COLORS.textMuted,
                      }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            label="Email address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            fullWidth
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon
                      sx={{
                        fontSize: 18,
                        color: COLORS.textMuted,
                      }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            label="Phone number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            autoComplete="tel"
            fullWidth
            error={!!fieldErrors.phone}
            helperText={fieldErrors.phone}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneOutlinedIcon
                      sx={{
                        fontSize: 18,
                        color: COLORS.textMuted,
                      }}
                    />
                  </InputAdornment>
                ),
              }
            }}
          />

          {/* Password */}
          <Box>
            <TextField
              label="Password"
              name="password"
              type={showPass ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              fullWidth
              error={!!fieldErrors.password}
              helperText={fieldErrors.password}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon
                        sx={{
                          fontSize: 18,
                          color: COLORS.textMuted,
                        }}
                      />
                    </InputAdornment>
                  ),


                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPass((prev) => !prev)}
                        edge="end"
                        sx={{
                          color: COLORS.textMuted,
                          visibility: "visible",
                        }}
                      >
                        {showPass ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),

                },
              }}
            />

            {form.password && (
              <Box
                sx={{
                  mt: 1,
                  px: 0.5,
                }}
              >
                <LinearProgress
                  variant="determinate"
                  value={(strength.score / 4) * 100}
                  sx={{
                    height: 3,
                    borderRadius: 2,
                    background: alpha(COLORS.borderSubtle, 0.5),

                    "& .MuiLinearProgress-bar": {
                      background: strength.color,
                      borderRadius: 2,
                    },
                  }}
                />

                <Typography
                  variant="caption"
                  sx={{
                    color: strength.color,
                    mt: 0.5,
                    display: "block",
                  }}
                >
                  {strength.label}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Confirm Password */}
          <TextField
            label="Confirm password"
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            fullWidth
            error={!!fieldErrors.confirmPassword}
            helperText={fieldErrors.confirmPassword}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon
                      sx={{
                        fontSize: 18,
                        color: COLORS.textMuted,
                      }}
                    />
                  </InputAdornment>
                ),

                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirm((prev) => !prev)}
                      edge="end"
                      sx={{
                        color: COLORS.textMuted,
                      }}
                    >
                      {showConfirm ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isLoading}
            sx={{
              mt: 1,
              height: 50,
            }}
          >
            {isLoading ? (
              <CircularProgress
                size={20}
                thickness={5}
                sx={{
                  color: "#fff",
                }}
              />
            ) : (
              "Create account →"
            )}
          </Button>
        </Box>

        {/* <Divider sx={{ my: 4 }}>
          <Typography variant="caption">
            or continue with
          </Typography>
        </Divider> */}

        
        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "center",
            mt: 3,
            color: COLORS.textMuted,
          }}
        >
          By signing up you agree to our Terms & Privacy Policy.
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupBox;