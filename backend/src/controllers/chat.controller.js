import Message from "../models/Message.js";

export const getMessages = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const messages = await Message.find({ projectId })
      .populate("sender", "name email")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};