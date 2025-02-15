import { ReactElement } from "react";

interface ButtonProps {
  title: string;
  variant: "primary" | "secondary";
  startIcon?: ReactElement;
  onClick?: () => void;
  loading?: boolean;
}

const variantClass = {
  primary: "bg-blue-800 text-white",
  secondary: "bg-purple-200 text-purple-800",
};

const defaultStyles = "p-2 m-2 rounded-xl text-md flex items-center";

export const Button = ({
  variant,
  title,
  startIcon,
  onClick,
  loading,
}: ButtonProps) => {
  return (
    <button
      className={
        variantClass[variant] +
        " " +
        defaultStyles +
        `${loading ? " disabled:opacity-60 cursor-not-allowed" : ""}`
      }
      disabled={loading}
      onClick={onClick}
    >
      <div className="">{startIcon}</div> {title}
    </button>
  );
};
