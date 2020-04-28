const checkValidity = (value, rules) => {
  let errorArray = [];
  if (!rules) {
    return errorArray;
  }

  if (rules.required) {
    value.trim() !== "" && errorArray.push("Field is empty!");
  }

  if (rules.minLength) {
    value.length > rules.minLength && errorArray.push("Value too short");
  }

  if (rules.maxLength) {
    value.length < rules.maxLength && errorArray.push("Value too long");
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    pattern.test(value) && errorArray.push("Not a valid email!");
  }

  if (rules.isPassword) {
    const pattern = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/;
     !(pattern.test(value)) && errorArray.push("Not a valid password! Valid Special characters are: '@ # $ % ^ & + ='");
  }

  return errorArray;
};

export default checkValidity;
