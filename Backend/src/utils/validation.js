// src/utils/validation.js
const validateEmail = (email) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };
  
  const validatePassword = (password) => {
    return password && password.length >= 6;
  };
  
  const validateName = (name) => {
    return name && name.trim().length >= 2;
  };
  
  module.exports = {
    validateEmail,
    validatePassword,
    validateName
  };
  