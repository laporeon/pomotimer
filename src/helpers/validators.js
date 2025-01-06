export const isValidNumber = values => {
  values.forEach(value => {
    if (Number.isNaN(+value) || !Number.isInteger(+value))
      throw new Error(
        'Please, enter a valid value for focus, pause and cycles options. e.g: 10',
      );
  });
};
