import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          Oops—page not found.
        </p>
        <Button
          variant="primary"
          title="Go Home"
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
}