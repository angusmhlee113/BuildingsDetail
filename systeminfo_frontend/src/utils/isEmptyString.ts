export const isEmptyString = (str: string): boolean => {
  str = str.trim();
  if (str === "" || str === null || str === undefined) {
    return true;
  } else {
    return false;
  }
};
