export const getDurationInSeconds = (duration: string): number => {
  const values = duration.split(':').map(it => parseInt(it, 10));
  return values.reduce((total, value, index) => index === values.length - 1 ? total + value : (total + value) * 60, 0);
}
