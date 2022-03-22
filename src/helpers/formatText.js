const removeUnderline = (input) => {
  const callback = (_, firstLetter, underline) => {
    if (firstLetter) {
      return firstLetter.toUpperCase();
    }
    if (underline) {
      return ` ${underline[1].toUpperCase()}`;
    }
  };
  return input.replace(/(^\w)|(_\w)/g, callback);
};

export default removeUnderline;
