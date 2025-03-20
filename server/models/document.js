
const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String },
   description: { type: String },
   url: { type: String, required: true },
});

documentSchema.add({
    children: [documentSchema]
 });

module.exports = mongoose.model('Document', documentSchema);