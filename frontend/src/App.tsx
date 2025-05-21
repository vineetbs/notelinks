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
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route path="note/*" element={<SharePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
