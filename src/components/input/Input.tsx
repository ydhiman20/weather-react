import { useState, ChangeEvent, FC, useCallback } from "react";
import Button from "../button/Button";

interface InputProps {
  parentValue: (value: string) => void;
}

const Input: FC<InputProps> = ({ parentValue }) => {
  const [inputValue, setInputValue] = useState("");

  // Handle input value change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle button click for search
  const handleClick = useCallback(() => {
    const trimmedValue = inputValue.trim(); // Trim whitespace
    if (!trimmedValue) return; // Prevent empty submissions
    parentValue(trimmedValue); // Call parent function with value
    setInputValue(""); // Clear input field
  }, [inputValue, parentValue]);

  return (
    <div className="text-center mb-6">
      <div className="flex justify-center mt-4 ">
        <input
          type="text"
          placeholder="Enter city..."
          value={inputValue}
          onChange={handleChange}
          className="p-2 w-full shadow-lg text-black rounded-l-md focus:outline-none"
        />
        <Button onClick={handleClick}>Search</Button>
      </div>
    </div>
  );
};

export default Input;
