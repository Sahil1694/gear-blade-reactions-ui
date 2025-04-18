
import React from 'react';
import AnimatedGear from './AnimatedGear';
import { Settings, Cog } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center py-8 overflow-hidden">
      <div className="absolute inset-0 bg-metal-gradient opacity-70 z-0"></div>
      
      {/* Background gears */}
      <div className="absolute top-6 left-1/4 opacity-20">
        <AnimatedGear size="lg" speed="slow" color="#9F9EA1" />
      </div>
      <div className="absolute bottom-12 right-1/4 opacity-30">
        <AnimatedGear size="md" speed="medium" color="#9F9EA1" icon="cog" />
      </div>
      <div className="absolute top-1/2 left-1/6 opacity-20">
        <AnimatedGear size="sm" speed="fast" color="#9F9EA1" icon="cog" />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 text-center max-w-3xl px-6 animate-fade-in">
        <div className="flex justify-center items-center gap-4 mb-4">
          <AnimatedGear size="md" speed="medium" color="#1EAEDB" />
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-highlight-gradient">
            Bearing Reaction Calculator
          </h1>
          <AnimatedGear size="md" speed="fast" color="#1EAEDB" icon="cog" />
        </div>
        
        <p className="text-mechanical-light text-lg mt-2 max-w-2xl">
          Calculate bearing reactions, dynamic load capacities, and select the appropriate bearing designation for your mechanical system.
        </p>
        
        <div className="flex justify-center mt-6 gap-2">
          <Settings className="text-mechanical-accent" size={20} />
          <Cog className="text-mechanical-accent" size={18} />
          <Settings className="text-mechanical-accent" size={16} />
          <Cog className="text-mechanical-accent" size={20} />
          <Settings className="text-mechanical-accent" size={18} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
