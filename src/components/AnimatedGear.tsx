
import React from 'react';
import { Settings, Cog } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedGearProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  speed?: 'slow' | 'medium' | 'fast';
  icon?: 'settings' | 'cog';
  color?: string;
}

const AnimatedGear: React.FC<AnimatedGearProps> = ({
  className,
  size = 'md',
  speed = 'medium',
  icon = 'settings',
  color = 'currentColor'
}) => {
  const sizeMap = {
    sm: 24,
    md: 36,
    lg: 48
  };

  const animationMap = {
    slow: 'animate-spin-slow',
    medium: 'animate-spin-medium',
    fast: 'animate-spin-fast'
  };

  const IconComponent = icon === 'settings' ? Settings : Cog;

  return (
    <div className={cn(animationMap[speed], 'animate-pulse-glow', className)}>
      <IconComponent 
        size={sizeMap[size]} 
        color={color} 
        strokeWidth={1.5} 
      />
    </div>
  );
};

export default AnimatedGear;
