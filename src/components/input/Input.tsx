import { useState, ChangeEvent, FC, useCallback, useRef } from "react";

import Button from "../button/Button";

interface InputProps {
  parentValue: (value: string) => void;
}

const Input: FC<InputProps> = ({ parentValue }) => {
  const [inputValue, setInputValue] = useState("");
  const selectInput = useRef<HTMLInputElement | null>(null);

  // Handle input value change with debouncing
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  // Handle search button click
  const handleSearch = useCallback(() => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return; // Prevent empty submissions
    parentValue(trimmedValue); // Call parent function to fetch/render data
    setInputValue(""); // Clear input field

    if (selectInput.current) selectInput.current.focus(); // Restore focus
  }, [inputValue, parentValue]);

  return (
    <div className="text-center mb-6 relative">
      <div className="flex justify-center mt-4">
        <div className="relative w-full">
          {/* Input Field */}
          <input
            className="p-4 w-full shadow-2xl text-black rounded-l-md focus:outline-none"
            onChange={handleChange}
            placeholder="Enter city..."
            ref={selectInput}
            type="text"
            value={inputValue}
          />
        </div>

        {/* Search Button */}
        <Button onClick={handleSearch} type="button">
          Search
        </Button>
      </div>
    </div>
  );
};

export default Input;
