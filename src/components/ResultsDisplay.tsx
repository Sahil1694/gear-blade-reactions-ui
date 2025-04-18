
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedGear from './AnimatedGear';
import { ArrowDownToLine, ArrowUpToLine, ArrowRightToLine, ArrowLeftToLine, CircleEllipsis, GaugeCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatNumber } from '@/utils/calculations';

interface ResultsDisplayProps {
  results: {
    rv1: number;
    rv2: number;
    rh1: number;
    rh2: number;
    r1: number;
    r2: number;
    c1: number;
    c2: number;
    bearing1Designation: string;
    bearing2Designation: string;
  } | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  if (!results) return null;

  const {
    rv1, rv2, rh1, rh2, r1, r2, c1, c2, bearing1Designation, bearing2Designation
  } = results;

  // Card groups for the results
  const resultGroups = [
    {
      title: "Vertical Reactions",
      icon: <ArrowUpToLine className="text-mechanical-accent" size={18} />,
      items: [
        { label: "Bearing 1 (Rv1)", value: formatNumber(rv1) + " N" },
        { label: "Bearing 2 (Rv2)", value: formatNumber(rv2) + " N" },
      ]
    },
    {
      title: "Horizontal Reactions",
      icon: <ArrowRightToLine className="text-mechanical-accent" size={18} />,
      items: [
        { label: "Bearing 1 (Rh1)", value: formatNumber(rh1) + " N" },
        { label: "Bearing 2 (Rh2)", value: formatNumber(rh2) + " N" },
      ]
    },
    {
      title: "Resultant Reactions",
      icon: <ArrowDownToLine className="text-mechanical-accent" size={18} />,
      items: [
        { label: "Bearing 1 (R1)", value: formatNumber(r1) + " N" },
        { label: "Bearing 2 (R2)", value: formatNumber(r2) + " N" },
      ]
    },
    {
      title: "Dynamic Load Capacities",
      icon: <CircleEllipsis className="text-mechanical-accent" size={18} />,
      items: [
        { label: "Bearing 1 (C1)", value: formatNumber(c1) },
        { label: "Bearing 2 (C2)", value: formatNumber(c2) },
      ]
    },
    {
      title: "Bearing Designations",
      icon: <GaugeCircle className="text-mechanical-accent" size={18} />,
      items: [
        { label: "Bearing 1", value: bearing1Designation },
        { label: "Bearing 2", value: bearing2Designation },
      ]
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-center mb-6 gap-4">
        <AnimatedGear size="sm" speed="slow" color="#1EAEDB" />
        <h2 className="text-2xl font-bold text-mechanical-accent">Calculation Results</h2>
        <AnimatedGear size="sm" speed="slow" color="#1EAEDB" icon="cog" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resultGroups.map((group, index) => (
          <Card 
            key={index} 
            className={cn(
              "bg-mechanical-medium/80 border-mechanical-light/30 shadow-metal overflow-hidden",
              index === resultGroups.length - 1 ? "lg:col-span-3" : ""
            )}
          >
            <CardHeader className="bg-mechanical-dark/40 border-b border-mechanical-light/10 py-3">
              <CardTitle className="text-md flex items-center gap-2">
                {group.icon}
                {group.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className={cn(
                "grid gap-3",
                index === resultGroups.length - 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
              )}>
                {group.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex} 
                    className="flex justify-between items-center p-3 rounded-md card-highlight"
                  >
                    <span className="text-mechanical-light">{item.label}</span>
                    <span className="font-mono text-mechanical-accent font-semibold">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;
