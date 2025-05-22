'use client';
import { useState } from 'react';

interface DropdownWrapperProps {
  children: (isOpen: boolean, toggleDropdown: () => void) => JSX.Element;
}

export const DropdownWrapper = ({ children }: DropdownWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return <div className="relative">{children(isOpen, toggleDropdown)}</div>;
};
