const createInput = (type, configType, placeholder, defaultValue, rules) => {
  return {
    elementType: type,
    elementConfig: {
      type: configType,
      name: configType,
      placeholder: placeholder,
    },
    value: defaultValue,
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
