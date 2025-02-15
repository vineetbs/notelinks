import { useRef } from "react";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import axios from "axios";
import { BackendUrl } from "../config";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const signin = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(username);
    const response = await axios.post(BackendUrl + "/api/v1/signin", {
      username,
      password,
    });

    const jwt = response.data;

    localStorage.setItem("token", jwt);
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen  flex-row bg-gray-500/70">
      <div className="bg-white rounded-xl  h-64 w-64">
        <div className="text-2xl justify-center  flex p-6">Sign in</div>
        <InputBox placeholder="Enter username" reference={usernameRef} />
        <InputBox placeholder="Enter password" reference={passwordRef} />
        <div className="flex justify-center p-4">
          <Button
            title="Sign in"
            variant="primary"
            loading={false}
            onClick={signin}
          />
        </div>
      </div>
    </div>
  );
};
