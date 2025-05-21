import { Logo } from "../icons/Logo";
import { Button } from "../components/Button";
import { ShieldUser, LogIn, LayoutDashboard, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Landing = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) setLoggedIn(true);
  }, []);

  const logout = () => {
    if (window.confirm("Do you want to logout?")) {
      localStorage.removeItem("token");
      window.location.reload();
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
      <svg
        className="absolute top-0 right-0 w-64 opacity-20"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#3b82f6"
          d="M45,-62.6C59.8,-52.1,73.8,-40.3,78.5,-25.5C83.2,-10.8,78.7,6,70.3,19.7C61.9,33.4,49.7,44,36.2,53.6C22.7,63.2,11.4,71.8,-1.3,74.2C-14,76.7,-27.9,73,-38.8,64.2C-49.7,55.4,-57.6,41.6,-65,27.1C-72.4,12.6,-79.3,-2.8,-75.6,-17.2C-71.9,-31.6,-57.6,-45,-42,-56C-26.4,-67,-13.2,-75.4,0.9,-76.4C15,-77.4,30,-71.7,45,-62.6Z"
          transform="translate(100 100)"
        />
      </svg>

      <div className="relative z-10 max-w-sm w-full bg-white/60 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center animate-fadeIn">
        <div className="flex items-center justify-center mb-4 p-2 bg-gray-200 rounded-lg">
          <div className="w-8 h-8 text-blue-800">
            <Logo />
          </div>
          <h1 className="ml-2 text-3xl font-extrabold text-black tracking-tight">
            NoteLink
          </h1>
        </div>

        <p className="mb-6 text-gray-700 font-medium">
          Store and share all your links from a single place
        </p>

        <div className="space-y-3 p-2 bg-blue-50 rounded-lg">
          {!loggedIn ? (
            <div className="flex">
              <div className="w-full transition-transform duration-200 hover:scale-105 ">
                <Button
                  variant="primary"
                  title="Sign Up"
                  startIcon={<ShieldUser />}
                  onClick={() => navigate("/signup")}
                />
              </div>
              <div className="w-full transition-transform duration-200 hover:scale-105 ">
                <Button
                  variant="secondary"
                  title="Sign In"
                  startIcon={<LogIn />}
                  onClick={() => navigate("/signin")}
                />
              </div>
            </div>
          ) : (
            <div className="flex">
              <div className="w-full transition-transform duration-200 hover:scale-105 ">
                <Button
                  variant="primary"
                  title="Go to Dashboard"
                  startIcon={<LayoutDashboard />}
                  onClick={() => navigate("/dashboard")}
                />
              </div>
              <div className="w-full transition-transform duration-200 hover:scale-105 ">
                <Button
                  variant="secondary"
                  title="Logout"
                  startIcon={<LogOut />}
                  onClick={logout}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
