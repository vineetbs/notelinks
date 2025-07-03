import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import axios from "axios";
import { BackendUrl } from "../config";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [submitting, setsubmitting] = useState(false);
  const signup = async () => {
    setsubmitting(true);
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    await axios.post(BackendUrl + "/api/v1/signup", {
      username,
      password,
    });
    setsubmitting(false);
    navigate("/signin");
  };
  return (
    <div className="flex items-center justify-center h-screen w-screen  flex-row bg-gray-500/70">
      <div className="bg-white rounded-xl  h-80 w-70">
        <div className="text-2xl justify-center  flex p-5">Signup</div>
        <InputBox placeholder="Enter username" reference={usernameRef} />
        <InputBox placeholder="Enter password" reference={passwordRef} />
        <div className="flex justify-center p-4">
          <Button
            title={submitting ? "Signing up..." : "Sign up"}
            variant="primary"
            loading={submitting}
            onClick={signup}
          />
        </div>
        <div className="flex justify-center">
          <div className="">Already an User? </div>
          <Link
            to={"/signin"}
            className="text-blue-600 pl-2 underline-offset-1 underline"
          >
            Signin
          </Link>
        </div>
      </div>
    </div>
  );
};
