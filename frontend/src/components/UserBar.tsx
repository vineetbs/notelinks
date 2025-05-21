import { useNavigate } from "react-router-dom";
import { CircleUser } from "lucide-react";
import { LogOut } from "lucide-react";

interface iconProp {
  name: string;
}

export const UserBar = ({ name }: iconProp) => {
  const navigate = useNavigate();
  const logout = () => {
    if (window.confirm("Do you want to logout ")) {
      localStorage.removeItem("token");
      navigate("/");
    } else {
      alert("Logout cancelled");
    }
  };

  return (
    <div className="transition-all duration-200 flex justify-around  border-t ">
      <div className="sm:flex grid">
        <div className="justify-center items-center flex  ">
          <CircleUser />
        </div>
        <div className="mb-2 pt-3 ml-4 font-bold hidden sm:block ">{name}</div>
      </div>
      <div className="p-2 hover:bg-gray-400" onClick={logout}>
        <LogOut />
      </div>
    </div>
  );
};
