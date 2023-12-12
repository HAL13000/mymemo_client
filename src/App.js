import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./components/layout/AuthLayout";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AppLayout } from "./components/layout/AppLayout";
import { Home } from "./pages/Home";

function App() {
  const theme = createTheme({
    palette: { mode: "light" },
  });
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="memo" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
