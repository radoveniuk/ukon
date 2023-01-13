export const iterateMap = <T>(iteration: unknown, callback: (index: number) => T) => {
  if (typeof iteration !== 'number') return null;
  const output: T[] = [];
  for (let i = 0; i < iteration; i+=1) {
    const element = callback(i);
    output.push(element);
  }
  return output;
};