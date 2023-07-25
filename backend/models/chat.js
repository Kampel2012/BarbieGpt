import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  messages: {
    type: Array,
  }
});

export default mongoose.model('chat', chatSchema);
