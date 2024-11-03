export const generateReference = (): string => {
  var result = "";
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 16; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};
