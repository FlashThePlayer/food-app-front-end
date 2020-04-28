const createInput = (type, configType, placeholder, defaultValue, rules) => {
  return {
    elementType: type,
    elementConfig: {
      type: configType,
      placeholder: placeholder,
    },
    value: defaultValue,
    errors: [],
    touched: false,
    rules: {
      ...rules,
    },
  };
};

export const defaultRules = {
  isRequired: true,
  minLength: 5,
  maxLength: 30,
};

export default createInput;
