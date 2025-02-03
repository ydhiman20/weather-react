import { FC, useCallback } from "react";

import Input from "../input/Input";

interface HeaderProps {
  parentValueInput: (value: string) => void;
}

const Header: FC<HeaderProps> = ({ parentValueInput }) => {
  // Callback function to handle input changes
  const handleInputChange = useCallback(
    (inputValue: string) => {
      // Directly call the parent callback with the new value
      parentValueInput(inputValue);
    },
    [parentValueInput] // Dependency array to prevent unnecessary re-renders
  );

  return (
    <header className="container mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12">Weather Forecast</h1>
      <Input parentValue={handleInputChange} />
    </header>
  );
};

export default Header;
