import Chat from '../models/chat.model.js';

// Get all chats
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific chat
export const getChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new chat
export const createChat = async (req, res) => {
  const chat = new Chat(req.body);
  try {
    const newChat = await chat.save();
    res.status(201).json(newChat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a chat
export const updateChat = async (req, res) => {
  try {
    const chat = await Chat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    res.json(chat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a chat
export const deleteChat = async (req, res) => {
  try {
    const result = await Chat.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Chat not found' });
    res.json({ message: 'Deleted Chat' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
