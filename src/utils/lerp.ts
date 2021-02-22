// Linear interpolation function
export const lerp = (a: number, b: number, n: number) => {
  return (1 - n) * a + n * b;
};