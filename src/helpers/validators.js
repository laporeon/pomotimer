export const isValidGradientStyle = style => {
  const styles = [
    'cristal',
    'teen',
    'mind',
    'morning',
    'vice',
    'passion',
    'fruit',
    'instagram',
    'atlas',
    'retro',
    'summer',
    'pastel',
    'rainbow',
  ];

  if (!styles.includes(style))
    throw new Error(
      `Please, choose a valid option for stylization: ${styles.join(', ')}.`,
    );
};

export const isValidNumber = value => {
  // if (Number.isNaN(+value) || !Number.isInteger(+value))
  if (Number.isNaN(+value))
    throw new Error(
      'Please, enter a valid value for your focus session. e.g: 10',
    );
};
