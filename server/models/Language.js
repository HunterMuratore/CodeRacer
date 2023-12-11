const { Schema, model } = require('mongoose');

const languageSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    codeBlocks: [{
        value: String,
    }],
});

const Language = model('Language', languageSchema);

module.exports = Language;
