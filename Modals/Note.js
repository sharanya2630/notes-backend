const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String },
    labels: [{ type: String }], // Array of labels
    reminder: { type: Date },
    backgroundColor: { type: String },
    archived: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
