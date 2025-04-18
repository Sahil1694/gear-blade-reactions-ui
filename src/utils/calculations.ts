
// All calculations are based on the provided Python code
interface InputValues {
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
}

interface CalculationResults {
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
}

export const calculateBearingReactions = (inputs: InputValues): CalculationResults => {
  const { rpm, p1, p2, pt, pr, w, lf, lifeHours, distance1, distance2, distance3 } = inputs;
  
  // Belt force total
  const pTotal = p1 + p2;
  
  // Vertical Reaction at Bearing 2
  const rv2 = ((pr * distance1) + (w * (distance1 + distance2 + distance3))) / (distance1 + distance2);
  
  // Vertical Reaction at Bearing 1
  const rv1 = pr + w - rv2;
  
  // Horizontal Reaction at Bearing 2
  const rh2 = ((pt * distance1) + (pTotal * (distance1 + distance2 + distance3))) / (distance1 + distance2);
  
  // Horizontal Reaction at Bearing 1
  const rh1 = rh2 - pt - pTotal;
  
  // Reactions in Bearing 1 & 2
  const r1 = Math.sqrt(Math.pow(rv1, 2) + Math.pow(rh1, 2));
  const r2 = Math.sqrt(Math.pow(rv2, 2) + Math.pow(rh2, 2));
  
  // Dynamic Load Calculation
  const llr = (60 * rpm * lifeHours) / 1000000;
  const c1 = r1 * Math.pow(llr, 1/3) * lf;
  const c2 = r2 * Math.pow(llr, 1/3) * lf;
  
  // Bearing Selection for Bearing 1
  let bearing1Designation: string;
  if (0 < c1 && c1 < 1480) {
    bearing1Designation = "6000";
  } else if (1480 < c1 && c1 < 4620) {
    bearing1Designation = "61800";
  } else if (4620 < c1 && c1 < 5070) {
    bearing1Designation = "6200";
  } else {
    bearing1Designation = "6300";
  }
  
  // Bearing Selection for Bearing 2
  let bearing2Designation: string;
  if (0 < c2 && c2 < 2700) {
    bearing2Designation = "61805";
  } else if (2700 < c2 && c2 < 7020) {
    bearing2Designation = "16404";
  } else if (7020 < c2 && c2 < 9360) {
    bearing2Designation = "6004";
  } else if (9360 < c2 && c2 < 12700) {
    bearing2Designation = "6204";
  } else if (12700 < c2 && c2 < 15900) {
    bearing2Designation = "6304";
  } else {
    bearing2Designation = "6404";
  }
  
  return {
    rv1,
    rv2,
    rh1,
    rh2,
    r1,
    r2,
    c1,
    c2,
    bearing1Designation,
    bearing2Designation
  };
};

// Helper function to format numbers with 4 decimal places
export const formatNumber = (num: number): string => {
  return num.toFixed(4);
};
