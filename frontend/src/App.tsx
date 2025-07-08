import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { Signin } from "./Pages/Signin";
import { Signup } from "./Pages/Signup";
import { SharePage } from "./Pages/SharePage";
import NotFound from "./Pages/NotFound";
import Landing from "./Pages/Landing";

function App() {
  const PrivateRoute = ({ children }: any) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/" />;
  };
  const AuthRoute = ({ children }: any) => {
    const token = localStorage.getItem("token");
    return !token ? children : <Navigate to="/dashboard" />;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="signup"
            element={
              <AuthRoute>
                <Signup />
              </AuthRoute>
            }
          />
          <Route
            path="signin"
            element={
              <AuthRoute>
                <Signin />
              </AuthRoute>
            }
          />
          <Route path="note/*" element={<SharePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
