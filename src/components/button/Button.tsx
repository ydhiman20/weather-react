import { FC, ReactNode } from "react";

interface ButtonProps {
  onClick: () => void; // Function to handle button clicks
  children?: ReactNode; // Allow customization of button text/content
  ariaLabel?: string; // Optional accessibility label
  loading?: boolean; // Option to show a loading state
}

const Button: FC<ButtonProps> = ({
  onClick,
  children = "Search",
  ariaLabel,
  loading = false,
}) => {
  return (
    <button
      aria-label={ariaLabel} // Accessibility label
      className={`px-4 py-2 w-48 text-white shadow-2xl bg-gray-800 rounded-r-md transition-colors duration-300 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={loading} // Disable button when loading
      onClick={onClick}
      type="button" // Prevents default form submission
    >
      {loading ? "Loading..." : children} {/* Show loading text or children */}
    </button>
  );
};

export default Button;
