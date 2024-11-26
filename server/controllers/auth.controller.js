import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../helper/generateToken.js";

export const googleLogin = async (req, res, next) => {
  try {
    const { displayName, email, photoURL, role } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      /** Register */
      const password = "123456789";
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username: displayName,
        email,
        password: hashedPassword,
        role,
        photoURL,
      });

      generateToken(newUser._id, res);

      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        photoURL: newUser.photoURL,
      });
    } else {
      /** Login */
      generateToken(user._id, res);

      if (role !== user.role)
        return res.status(500).json({
          message: `${user.role} should not login on ${role} Login page.`,
        });

      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        photoURL: user.photoURL,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Google Sign in error occured." });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ message: "Invalid email / password." });

    if (role !== user.role)
      return res.status(500).json({
        message: `${user.role} should not login on ${role} Login page.`,
      });

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      photoURL: user.photoURL,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Sign in error occured." });
  }
};

export const register = async (req, res, next) => {
  try {
    const { username, email, password, cpassword, role } = req.body;

    if (password !== cpassword)
      return res
        .status(400)
        .json({ message: "Password confirmation does not matched." });

    const userByEmail = await User.findOne({ email });
    if (userByEmail)
      return res.status(400).json({ message: "Email provided already exist." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    if (!user)
      return res.status(400).json({ message: "Creating new user failed." });

    generateToken(user._id, res);
    await user.save();

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      photoURL: user.photoURL,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Sign up error occured." });
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout success." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Logout error occured." });
  }
};
