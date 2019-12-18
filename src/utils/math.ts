export const degreesToRadians = (d: number) => {
  return ((2*Math.PI) / 360) * d;
};

export const radiansToDegrees = (r: number) => {
  return (360 / (2*Math.PI)) * r;
};