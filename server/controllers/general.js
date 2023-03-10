import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findById(id);
    if (user) {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
