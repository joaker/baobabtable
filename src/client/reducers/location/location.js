
export const changeLocation = ({locations}, {value}) => {
  return {
    locations: [value, ...locations]
  };
};
