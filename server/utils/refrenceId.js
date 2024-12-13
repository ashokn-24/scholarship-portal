const generateReferenceID = (year, month, counter) => {
  const prefix = "IICO";
  const yearShort = year.toString().slice(-2);
  const monthAbbr = month.toString().padStart(2, "0");

  const counterPadded = counter.toString().padStart(5, "0");

  const referenceId = `${prefix}${yearShort}${monthAbbr}${counterPadded}`;

  return referenceId;
};

module.exports = generateReferenceID;
