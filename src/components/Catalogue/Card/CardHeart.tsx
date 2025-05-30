'use client';
import { useState } from 'react';
import { ClickableComponent } from '@/components/ClickableComponent/ClickableComponent';
import { Heart } from '@/components/SvgIcons/Heart';

export const CardHeart = () => {
  const [userClick, setUserClick] = useState(false);

  const handleClick = () => {
    setUserClick(!userClick);
  };
  return (
    <ClickableComponent
      type="button"
      onClick={handleClick}
    >
      <Heart active={userClick} />
    </ClickableComponent>
  );
};
