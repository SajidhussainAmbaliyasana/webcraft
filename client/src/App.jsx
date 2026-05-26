import AppRoutes from './app/AppRoutes'
import GlobalSnackbar from './components/common/GlobalSnackbar'
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import './style.css'

const App = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppRoutes />
                <GlobalSnackbar />

            </ThemeProvider>

        </>
    )
}

export default App
