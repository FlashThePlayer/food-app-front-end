const createInput = (
  configType,
  configName,
  placeholder,
  defaultValue,
  rules
) => {
  return {
    elementType: "input",
    elementConfig: {
      type: configType,
      name: configName,
      placeholder: placeholder,
    },
    value: defaultValue,
    rules: {
      ...rules,
    },
  };
};

export const createSelect = (configName, selectValues, rules) => {
  return {
    elementType: "select",
    elementConfig: {
      name: configName,
    },
    value: selectValues,
    rules: {
      ...rules,
    },
  };
};

export const defaultRules = {
  required: { value: true, message: "Field is required" },
  minLength: { value: 5, message: "Field value is too short" },
  maxLength: { value: 30, message: "Field value is too long" },
};

export const patternRules = (type) => {
  switch (type) {
    case "year":
      return {
        value: /^(19|20)\d{2}$/,
        message: "Please use a year between 1900-2099",
      };
    case "month":
      return {
        value: /^(1[0-2]|[1-9])$/,
        message: "Please use a month between 1-12",
      };
    case "day":
      return {
        value: /^(3[0-1]|2[0-9]|1[0-9]|[1-9])$/,
        message: "Please use a day between 1-31",
      };
    case "email":
      return {
        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        message: "Not a valid email address",
      };
    case "password":
      return {
        value: /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=-]).*$/,
        message:
          "Not a valid password! Valid Special characters are: '@ # $ % ^ & + = -'",
      };
    default:
      throw new Error(`${type} rule pattern not supported!`);
  }
};

export default createInput;
