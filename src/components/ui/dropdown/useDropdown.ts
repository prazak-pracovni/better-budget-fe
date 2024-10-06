import { useContext } from "react";
import { DropdownContext } from "./Dropdown";

export const useDropdown = ()  => {
    return useContext(DropdownContext);
  };