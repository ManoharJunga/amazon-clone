import mongoose from 'mongoose';

const { Schema } = mongoose;

const MailSchema = new Schema({
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true }
});

const Mail = mongoose.model('Mail', MailSchema);

export default Mail;
