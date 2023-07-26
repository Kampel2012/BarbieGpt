import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  messages: {
    type: Array,
    required: true,
  }
});

export default mongoose.model('chat', chatSchema);
