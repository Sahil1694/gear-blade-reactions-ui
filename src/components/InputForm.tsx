
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  RotateCcw, 
  Gauge,
  Weight, 
  Wrench, 
  Timer, 
  ArrowRightLeft,
  SquareArrowUp, 
  SquareArrowDown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InputFormProps {
  onCalculate: (values: {
    rpm: number;
    p1: number;
    p2: number;
    pt: number;
    pr: number;
    w: number;
    lf: number;
    lifeHours: number;
    distance1: number;
    distance2: number;
    distance3: number;
  }) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onCalculate }) => {
  const { toast } = useToast();
  const [formValues, setFormValues] = useState({
    rpm: 0,
    p1: 0,
    p2: 0,
    pt: 0,
    pr: 0,
    w: 0,
    lf: 0,
    lifeHours: 0,
    distance1: 0,
    distance2: 0,
    distance3: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: parseFloat(value) || 0
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation to check if all values are greater than 0
    const hasInvalidValues = Object.values(formValues).some(value => value <= 0);
    
    if (hasInvalidValues) {
      toast({
        title: "Invalid input",
        description: "All values must be greater than zero",
        variant: "destructive"
      });
      return;
    }
    
    onCalculate(formValues);
    
    toast({
      title: "Calculations complete",
      description: "Bearing reactions calculated successfully",
    });
  };

  const handleReset = () => {
    setFormValues({
      rpm: 0,
      p1: 0,
      p2: 0,
      pt: 0,
      pr: 0,
      w: 0,
      lf: 0,
      lifeHours: 0,
      distance1: 0,
      distance2: 0,
      distance3: 0
    });
    
    toast({
      title: "Form reset",
      description: "All input values have been reset",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto px-4 py-6 space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Shaft RPM */}
        <div className="metal-edge bevel-edge bg-mechanical-medium/70 p-4 rounded-md space-y-2">
          <div className="flex items-center space-x-2">
            <Gauge className="text-mechanical-accent" size={18} />
            <Label htmlFor="rpm" className="text-mechanical-light">Shaft RPM</Label>
          </div>
          <Input
            id="rpm"
            name="rpm"
            type="number"
            placeholder="Enter RPM"
            value={formValues.rpm || ''}
            onChange={handleInputChange}
            className="bg-mechanical-dark/60 border-mechanical-light/20 text-foreground"
          />
        </div>

        {/* Belt Tensions */}
        <div className="metal-edge bevel-edge bg-mechanical-medium/70 p-4 rounded-md space-y-2">
          <div className="flex items-center space-x-2">
            <ArrowRightLeft className="text-mechanical-accent" size={18} />
            <Label htmlFor="p1" className="text-mechanical-light">Belt Tension P1 (N)</Label>
          </div>
          <Input
            id="p1"
            name="p1"
            type="number"
            placeholder="Enter P1"
            value={formValues.p1 || ''}
            onChange={handleInputChange}
            className="bg-mechanical-dark/60 border-mechanical-light/20 text-foreground mb-3"
          />
          <div className="flex items-center space-x-2">
            <ArrowRightLeft className="text-mechanical-accent" size={18} />
            <Label htmlFor="p2" className="text-mechanical-light">Belt Tension P2 (N)</Label>
          </div>
          <Input
            id="p2"
            name="p2"
            type="number"
            placeholder="Enter P2"
            value={formValues.p2 || ''}
            onChange={handleInputChange}
            className="bg-mechanical-dark/60 border-mechanical-light/20 text-foreground"
          />
        </div>

        {/* Gear Forces */}
        <div className="metal-edge bevel-edge bg-mechanical-medium/70 p-4 rounded-md space-y-2">
          <div className="flex items-center space-x-2">
            <SquareArrowDown className="text-mechanical-accent" size={18} />
            <Label htmlFor="pt" className="text-mechanical-light">Tangential Force Pt (N)</Label>
          </div>
          <Input
            id="pt"
            name="pt"
            type="number"
            placeholder="Enter Pt"
            value={formValues.pt || ''}
            onChange={handleInputChange}
            className="bg-mechanical-dark/60 border-mechanical-light/20 text-foreground mb-3"
          />
          <div className="flex items-center space-x-2">
            <SquareArrowUp className="text-mechanical-accent" size={18} />
            <Label htmlFor="pr" className="text-mechanical-light">Radial Force Pr (N)</Label>
          </div>
          <Input
            id="pr"
            name="pr"
            type="number"
            placeholder="Enter Pr"
            value={formValues.pr || ''}
            onChange={handleInputChange}
            className="bg-mechanical-dark/60 border-mechanical-light/20 text-foreground"
          />
        </div>

        {/* Pulley Weight */}
        <div className="metal-edge bevel-edge bg-mechanical-medium/70 p-4 rounded-md space-y-2">
          <div className="flex items-center space-x-2">
            <Weight className="text-mechanical-accent" size={18} />
            <Label htmlFor="w" className="text-mechanical-light">Pulley Weight (N)</Label>
          </div>
          <Input
            id="w"
            name="w"
            type="number"
            placeholder="Enter Weight"
            value={formValues.w || ''}
            onChange={handleInputChange}
            className="bg-mechanical-dark/60 border-mechanical-light/20 text-foreground"
          />
        </div>

        {/* Load Factor */}
        <div className="metal-edge bevel-edge bg-mechanical-medium/70 p-4 rounded-md space-y-2">
          <div className="flex items-center space-x-2">
            <Wrench className="text-mechanical-accent" size={18} />
            <Label htmlFor="lf" className="text-mechanical-light">Load Factor</Label>
          </div>
          <Input
            id="lf"
            name="lf"
            type="number"
            placeholder="Enter Load Factor"
            value={formValues.lf || ''}
            onChange={handleInputChange}
            className="bg-mechanical-dark/60 border-mechanical-light/20 text-foreground"
          />
        </div>

        {/* Bearing Life */}
        <div className="metal-edge bevel-edge bg-mechanical-medium/70 p-4 rounded-md space-y-2">
          <div className="flex items-center space-x-2">
            <Timer className="text-mechanical-accent" size={18} />
            <Label htmlFor="lifeHours" className="text-mechanical-light">Bearing Life (hours)</Label>
          </div>
          <Input
            id="lifeHours"
            name="lifeHours"
            type="number"
            placeholder="Enter Life Hours"
            value={formValues.lifeHours || ''}
            onChange={handleInputChange}
            className="bg-mechanical-dark/60 border-mechanical-light/20 text-foreground"
          />
        </div>

        {/* Distances */}
        <div className="metal-edge bevel-edge bg-mechanical-medium/70 p-4 rounded-md space-y-2 col-span-full md:col-span-2 lg:col-span-3">
          <h3 className="text-mechanical-accent font-semibold text-sm mb-3">Distances</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="distance1" className="text-mechanical-light">Bearing 1 to Gear (mm)</Label>
              <Input
                id="distance1"
                name="distance1"
                type="number"
                placeholder="Enter distance"
                value={formValues.distance1 || ''}
                onChange={handleInputChange}
                className="bg-mechanical-dark/60 border-mechanical-light/20 text-foreground"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="distance2" className="text-mechanical-light">Gear to Bearing 2 (mm)</Label>
              <Input
                id="distance2"
                name="distance2"
                type="number"
                placeholder="Enter distance"
                value={formValues.distance2 || ''}
                onChange={handleInputChange}
                className="bg-mechanical-dark/60 border-mechanical-light/20 text-foreground"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="distance3" className="text-mechanical-light">Bearing 2 to Pulley (mm)</Label>
              <Input
                id="distance3"
                name="distance3"
                type="number"
                placeholder="Enter distance"
                value={formValues.distance3 || ''}
                onChange={handleInputChange}
                className="bg-mechanical-dark/60 border-mechanical-light/20 text-foreground"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleReset}
          className="bg-mechanical-dark/60 border-mechanical-light/30 hover:bg-mechanical-medium text-mechanical-light"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button 
          type="submit"
          className="bg-mechanical-accent hover:bg-mechanical-highlight text-white"
        >
          Calculate
        </Button>
      </div>
    </form>
  );
};

export default InputForm;
