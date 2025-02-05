/* eslint-disable no-unused-vars */
import { FC, useCallback } from "react";

import Input from "../input/Input";

interface HeaderProps {
  parentValueInput: (value: string) => void;
  fetchDataGeoLocation: () => void;
}

const Header: FC<HeaderProps> = ({
  parentValueInput,
  fetchDataGeoLocation,
}) => {
  // Callback function to handle input changes
  const handleInputChange = useCallback(
    (inputValue: string) => {
      // Directly call the parent callback with the new value
      parentValueInput(inputValue);
    },
    [parentValueInput] // Dependency array to prevent unnecessary re-renders
  );

  return (
    <header className="container mx-auto bg-[#f6f6f8] p-8 md:p-10">
      <h1 className="text-2xl md:text-5xl mb-4 md:mb-6 font-bold">
        WeatherWise
      </h1>
      <Input
        fetchDataGeoLocation={fetchDataGeoLocation}
        parentValue={handleInputChange}
      />
    </header>
  );
};

export default Header;
