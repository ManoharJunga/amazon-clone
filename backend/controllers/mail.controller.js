import Mail from '../models/mail.model.js';

// Get all mails
export const getMails = async (req, res) => {
  try {
    const mails = await Mail.find();
    res.json(mails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific mail
export const getMail = async (req, res) => {
  try {
    const mail = await Mail.findById(req.params.id);
    if (!mail) return res.status(404).json({ message: 'Mail not found' });
    res.json(mail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new mail
export const createMail = async (req, res) => {
  const mail = new Mail(req.body);
  try {
    const newMail = await mail.save();
    res.status(201).json(newMail);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a mail
export const updateMail = async (req, res) => {
  try {
    const mail = await Mail.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mail) return res.status(404).json({ message: 'Mail not found' });
    res.json(mail);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a mail
export const deleteMail = async (req, res) => {
  try {
    const mail = await Mail.findByIdAndDelete(req.params.id);
    if (!mail) return res.status(404).json({ message: 'Mail not found' });
    res.json({ message: 'Deleted Mail' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
