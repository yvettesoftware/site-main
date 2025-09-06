const mongoose = require('mongoose');

const userIDSequenceSchema = new mongoose.Schema({
    date: { type: String, required: true, unique: true }, // Format: YYMMDD
    seq: { type: Number, default: 0 }
});

module.exports = mongoose.model('UserIDSequence', userIDSequenceSchema);