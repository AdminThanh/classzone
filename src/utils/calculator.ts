export const getAverage = (arr: number[], refScores?: number[]) => {
  const refScore = refScores?.reduce((a, b) => a + b, 0) || 0;
  return (arr.reduce((a, b) => a + b, 0) - refScore) / arr.length || 0;
};
