const asciiToHex = function (str: string) {
  if (!str) return '0x00';
  let hex = '';
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    const n = code.toString(16);
    hex += n.length < 2 ? '0' + n : n;
  }

  return '0x' + hex;
};

export const toBytes32 = (str: string) => {
  return asciiToHex(str).padEnd(66, '0');
};
