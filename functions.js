const handlePassword = (data) => {
    const min = /[a-z]/;
    const may = /[A-Z]/;
    const num = /\d/;

    const updatedValidations = validations.map((validation) => {
      if (validation.id === 1) {
        return {
          ...validation,
          color: may.test(data) ? "green" : "red",
        };
      }
      if (validation.id === 2) {
        return {
          ...validation,
          color: min.test(data) ? "green" : "red",
        };
      }
      if (validation.id === 3) {
        return {
          ...validation,
          color: num.test(data) ? "green" : "red",
        };
      }
      if (validation.id === 4) {
        return {
          ...validation,
          color: data.length >= 8 ? "green" : "red",
        };
      }
      return validation;
    });

    setValidations(updatedValidations);
  };

  export default handlePassword;