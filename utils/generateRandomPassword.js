const generateRandomPassword = (firstName, lastName, mobile) => {
  const chars = (firstName + lastName + mobile).split('');
  let password = '';
  while (password.length < 8) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
};

module.exports = { generateRandomPassword };
