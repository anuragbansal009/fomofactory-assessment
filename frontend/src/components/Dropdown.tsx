import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { DownIcon, UpIcon } from "./Icons";

const CustomSelect = ({ value, options, placeholder, onChange }: {
  value: string,
  options: string[],
  placeholder: string,
  onChange: (value: string) => void
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const itemRef = useRef();

  const handleOutsideClick = (e: any) => {
    if (e.target.contains(dropdownRef.current)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  useEffect(() => {
    if (isOpen) {
      const activeItem = itemRef.current.querySelector(".active");
      itemRef.current.scrollTop = activeItem?.offsetTop - 72;
    }
  }, [isOpen]);
  return (
    <DropdownWrapper className="dropdown-price" ref={dropdownRef}>
      <DropdownBtn onClick={() => setIsOpen(!isOpen)}>
        {value || placeholder}
        {!isOpen ? <DownIcon /> : <UpIcon />}
      </DropdownBtn>
      {isOpen && (
        <DropdownList ref={itemRef}>
          {options.map((option, index) => (
            <DropdownItem
              className={option === value && "active"}
              key={index}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownWrapper>
  );
};

export default CustomSelect;

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const DropdownBtn = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 243px;
  height: 50px;
  background-color: #1e40af;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  padding: 10px 15px;
  cursor: pointer;
`;

const DropdownList = styled.div`
  background: #60a5fa;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  margin-top: 5px;
  border: 1px solid #60a5fa;
  position: absolute;
  width: 100%;
  margin-top: 50px;
  max-height: 180px;
  overflow-y: auto;
`;

const DropdownItem = styled.button`
  min-height: 36px;
  background: #60a5fa;
  border: none;
  color: #000;
  text-align: left;
  cursor: pointer;
  padding: 10px 15px;
  font-size: 12px;
  &.active,
  &:hover {
    background-color: #eee;
  }
`;