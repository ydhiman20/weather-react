import { FC, ReactNode } from "react";

interface ButtonProps {
  onClick: () => void; // Function to handle button clicks
  fetchDataGeoLocation: () => void;
  children?: ReactNode; // Allow customization of button text/content
  ariaLabel?: string; // Optional accessibility label
  loading?: boolean; // Option to show a loading state
}

const Button: FC<ButtonProps> = ({
  onClick,
  fetchDataGeoLocation,
  children = "Search",
  ariaLabel,
  loading = false,
}) => (
  <>
    <button
      aria-label={ariaLabel} // Accessibility label
      className={`px-4 py-2 md:w-[10%] text-sm text-white bg-blue-500 rounded-r-full transition-colors duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={loading} // Disable button when loading
      onClick={onClick}
      type="button" // Prevents default form submission
    >
      {loading ? "Loading..." : children} {/* Show loading text or children */}
    </button>
    <button
      className={
        "block ml-3 w-[52px] text-center bg-gray-600 rounded-full transition-colors duration-300"
      }
      onClick={() => {
        fetchDataGeoLocation();
      }}
    >
      <svg
        className="md:ml-[15px] ml-[15px] w-[20px]"
        fill="#ffffff"
        stroke="#ffffff"
        version="1.1"
        viewBox="-5.5 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <title>location</title>{" "}
          <path d="M10.406 26.969l10.406-21.938-20.813 11.125h10.406v10.813z"></path>{" "}
        </g>
      </svg>
    </button>
  </>
);

export default Button;
