/* eslint-disable no-unused-vars */
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from "react";

import Button from "../button/Button";

interface InputProps {
  parentValue: (value: string) => void;
  fetchDataGeoLocation: () => void;
}

const Input: FC<InputProps> = ({ parentValue, fetchDataGeoLocation }) => {
  const [inputValue, setInputValue] = useState("");
  const selectInput = useRef<HTMLInputElement | null>(null);

  // Handle input value change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle search button click
  const handleSearch = useCallback(() => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return; // Prevent empty submissions
    parentValue(trimmedValue); // Call parent function to fetch/render data

    if (selectInput.current) {
      selectInput.current.focus(); // Restore focus
    }
  }, [inputValue, parentValue]);

  // Handle Enter key press for search
  const handleSearchOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="text-center mb-6 relative">
      <div className="flex justify-center mt-4">
        <div className="relative md:w-[90%] w-[70%]">
          {/* Input Field */}
          <input
            className="p-4 w-full text-black rounded-l-full text-sm focus:outline-none"
            onChange={handleChange}
            onKeyDown={handleSearchOnEnter}
            placeholder="Enter a city to check the weather..."
            ref={selectInput}
            title="Enter a city name"
            type="text"
            value={inputValue}
          />
        </div>

        {/* Search Button */}
        <Button
          fetchDataGeoLocation={fetchDataGeoLocation}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Input;
