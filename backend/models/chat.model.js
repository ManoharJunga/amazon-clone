import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  participants: { type: String, required: true },
  messages: { type: String, required: true }
});

const Chat = mongoose.model('Chat', ChatSchema);

export default Chat;
