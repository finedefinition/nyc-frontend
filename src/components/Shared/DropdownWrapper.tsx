'use client';
import { useEffect, useRef, useState } from 'react';

interface DropdownWrapperProps {
  children: (isOpen: boolean, toggleDropdown: () => void) => JSX.Element;
}

const DropdownWrapper = ({ children }: DropdownWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      {children(isOpen, toggleDropdown)}
    </div>
  );
};

export default DropdownWrapper;
