export const prepareAddress = (address: string) => {
  const prefix = address.slice(0, 10);
  const suffix = address.slice(-5);

  const shortenedAddress = prefix + '...' + suffix;

  return shortenedAddress;
};
