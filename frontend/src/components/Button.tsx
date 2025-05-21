import { ReactElement } from "react";

interface ButtonProps {
  title: string;
  variant: "primary" | "secondary";
  startIcon?: ReactElement;
  onClick?: () => void;
  loading?: boolean;
}

const variantClass = {
  primary: "[background-color:var(--color-prifg)] text-white",
  secondary: "[background-color:var(--color-secfg)] text-white",
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
