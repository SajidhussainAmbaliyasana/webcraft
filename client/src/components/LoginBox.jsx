import {
    Box,
    TextField,
    Button,
    Typography,
    FormControlLabel,
    Checkbox,
    Alert,
    CircularProgress,
    InputAdornment,
    IconButton,
    Divider,

} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { COLORS } from "../theme";
import useSnackbar from "../hooks/useSnackbar";
import { useState } from "react";
import { useLoginMutation } from "../redux/api/authApi";
import { useNavigate } from 'react-router-dom';

const LoginBox = () => {
    const [form, setForm] = useState({ username: "sajid", password: "Sajid@1234", rememberMe: false });
    const [showPass, setShowPass] = useState(false);
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();
    const notify = useSnackbar();

    const [login, { isLoading }] = useLoginMutation();


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
        if (apiError) setApiError("");
    };
    const validate = () => {
        if (!form.username.trim()) return "Username is required.";
        if (!form.password) return "Password is required.";
        if (form.password.length < 6) return "Password must be at least 6 characters.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validate();
        if (err) { setApiError(err); return; }

        try {
           const response =  await login({
                username: form.username,
                password: form.password,
            }).unwrap();

            if (response.success){

                notify.success("Welcome back!");
                navigate("/dashboard");
            }



        } catch (err) {

            const msg =
                err?.data?.message ||
                err?.data?.error ||
                "Login failed. Check your credentials.";

            setApiError(msg);
        }
    };


    return (
        <>
            {/* Error */}
            {apiError && (
                <Alert severity="error" sx={{ mb: 3 }}>{apiError}</Alert>
            )}
            <Box component="form"
                onSubmit={handleSubmit}
                noValidate sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <TextField
                    label="Username"
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={handleChange}
                    autoComplete="username"
                    fullWidth
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MailOutlineIcon sx={{ fontSize: 18, color: COLORS.textMuted }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <TextField
                    label="Password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    fullWidth
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlinedIcon sx={{ fontSize: 18, color: COLORS.textMuted }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPass((p) => !p)}
                                        edge="end"
                                        // sx={{ color: COLORS.textMuted }}
                                        sx={{ color: "#fff" }}
                                    >
                                        {showPass ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="rememberMe"
                                checked={form.rememberMe}
                                onChange={handleChange}
                                size="small"
                            />
                        }
                        label={
                            <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: COLORS.textMuted }}>
                                Remember me
                            </Typography>
                        }
                    />
                    <Box
                        component="span"
                        sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: COLORS.textMuted, cursor: "pointer", "&:hover": { color: COLORS.cyan } }}
                    >
                        Forgot password?
                    </Box>
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={isLoading}
                    sx={{ mt: 1, height: 50, color: "#fff" }}
                >
                    {isLoading ? (
                        <CircularProgress size={20} thickness={5} sx={{ color: "#fff" }} />
                    ) : (
                        "Sign in →"
                    )}
                </Button>
            </Box>

            {/* <Divider sx={{ my: 4 }}>
                <Typography variant="caption">or continue with</Typography>
            </Divider> */}

            {/* Placeholder OAuth buttons */}
            
        </>
    )
}

export default LoginBox
