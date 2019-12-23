
export const getDecade = (date: any) => {
  date = date instanceof Date ? date : new Date(date);

  const fullYear = (date.getFullYear() + 15).toString();
  const decade = fullYear[2];

  if (Number.isNaN(fullYear) || !decade || (fullYear.length < 4)) {
    throw new Error('Date must be valid and have a 4-digit year attribute');
  }

  return `${decade}0s`;
}
