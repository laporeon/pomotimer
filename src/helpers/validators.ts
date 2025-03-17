export const isValidNumber = (values: string[]) => {
  values.forEach((value: string) => {
    if (Number.isNaN(+value) || !Number.isInteger(+value))
      throw new Error(
        'Please, enter a valid value for focus, pause and cycles options. e.g: 10',
      );
  });
};
