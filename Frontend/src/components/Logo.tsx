import React from 'react';
import { Gamepad2 } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Gamepad2 className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold text-foreground">GameVerse</span>
    </div>
  );
};

export default Logo;
