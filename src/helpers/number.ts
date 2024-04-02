export function isFloat(value: string | number) {
  return !isNaN(+value) && Number(value).toString().includes(".");
}

export function displayNumber(value: string | number): string {
  if (isNaN(+value)) {
    return value as string;
  }
  if (isFloat(value)) {
    return Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return Number(value).toLocaleString("en-US");
}
