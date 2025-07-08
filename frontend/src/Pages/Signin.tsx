import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import axios from "axios";
import { BackendUrl } from "../config";
import { Link, useNavigate } from "react-router-dom";

export const Signin = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [loading, setloading] = useState(false);

  const signin = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      setloading(true);
      const response = await axios.post(BackendUrl + "/api/v1/signin", {
        username,
        password,
      });
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (error) {
      window.alert("Invalid Username or Password");
    } finally {
      setloading(false);
    }
    });

   
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen  flex-row bg-gray-500/70">
      <div className="bg-white rounded-xl  h-80 w-70">
        <div className="text-2xl justify-center  flex p-5">Sign in</div>
        <InputBox placeholder="Enter username" reference={usernameRef} />
        <InputBox placeholder="Enter password" reference={passwordRef} />
        <div className="flex justify-center p-4">
          <Button

            title={loading ? "loading..." : "Sign in"}
            variant="primary"
            loading={loading}

            onClick={signin}
          />
        </div>
        <div className="flex justify-center">
          <div className=""> New here? </div>
          <Link
            to={"/signup"}
            className="text-blue-600 pl-2 underline-offset-1 underline"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};
