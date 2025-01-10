export function truncateString(input: string, lenght: number): string {
  if (input.length > lenght) {
    return `${input.slice(0, lenght)}...`;
  }
  return input;
}