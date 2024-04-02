import { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import useCollection from "../../models/useCollection";

interface DropdownSelectProps {
  onSelectChange: (selectedValue: string) => void;
}

export function DropdownSelect({ onSelectChange }: DropdownSelectProps) {
  const { types } = useCollection();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret color="primary">
        Types
      </DropdownToggle>
      <DropdownMenu>
        {types &&
          types.map((type, index) => (
            <DropdownItem
              key={index}
              onClick={() => onSelectChange(type.name)}
              value={type.name}
            >
              {type.name}{" "}
              <img
                src={`/${type.name}.svg`}
                alt={type.name}
                style={{ width: "20px", height: "20px" }}
              />
            </DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
}
