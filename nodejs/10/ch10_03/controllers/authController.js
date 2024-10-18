const bcrypt = require("bcryptjs");
const userService = require("../services/userService");
const { createUser } = require("../dao/userDao");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  // password : admin1234
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await userService.createUser({
      email: email,
      name: name,
      password: hashedPassword,
    });
    res.status(201).json({ data: user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


module.exports = {
  register
};
