export const calculatePoints = (won: number, tied: number) => {
  // 2 points for a win, 1 for a tie
  return (won * 2) + tied;
};

export const calculateMatches = (won: number, lost: number, tied: number) => {
  return won + lost + tied;
};

export const formatNRR = (nrr: number) => {
  return nrr.toFixed(3);
};

export const validateTeamData = (data: any) => {
  const errors: Record<string, string> = {};
  
  if (!data.name?.trim()) {
    errors.name = 'Team name is required';
  }
  
  if (data.won < 0 || data.lost < 0 || data.tied < 0) {
    errors.matches = 'Match statistics cannot be negative';
  }
  
  if (Math.abs(data.nrr) > 5) {
    errors.nrr = 'Net run rate must be between -5 and +5';
  }
  
  return errors;
};