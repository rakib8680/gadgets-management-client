export const toCamelCase = (str: string) => {
  return str
    .replace(/([-_ ][a-z])/gi, (group) =>
      group.toUpperCase().replace(/[-_ ]/g, "")
    )
    .replace(/^(.)/, (group) => group.toLowerCase());
};
