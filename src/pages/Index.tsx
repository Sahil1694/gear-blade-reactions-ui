
import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import InputForm from '@/components/InputForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import { calculateBearingReactions } from '@/utils/calculations';
import { Separator } from '@/components/ui/separator';

const Index: React.FC = () => {
  const [results, setResults] = useState<ReturnType<typeof calculateBearingReactions> | null>(null);

  const handleCalculate = (inputValues: Parameters<typeof calculateBearingReactions>[0]) => {
    const calculationResults = calculateBearingReactions(inputValues);
    setResults(calculationResults);
    
    // Scroll to results
    setTimeout(() => {
      const resultsSection = document.getElementById('results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-mechanical-dark text-foreground pb-16">
      <HeroSection />
      
      <Separator className="bg-mechanical-accent/20 h-[2px]" />
      
      <div className="container mx-auto mt-8">
        <InputForm onCalculate={handleCalculate} />
      </div>
      
      {results && (
        <>
          <Separator className="bg-mechanical-accent/20 h-[2px] my-8" />
          
          <div id="results-section" className="container mx-auto">
            <ResultsDisplay results={results} />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
