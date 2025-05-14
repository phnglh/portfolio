'use client';
import { useState } from 'react';

const ClickToReveal = ({ children }: { children: React.ReactNode }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <em
      onClick={() => setRevealed(true)}
      className={`cursor-pointer transition duration-300 ${
        revealed ? 'blur-none text-primary' : 'blur-sm text-gray-400'
      }`}
    >
      {children}
    </em>
  );
};

export default ClickToReveal;
