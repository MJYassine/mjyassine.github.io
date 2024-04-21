const mongoose = require('mongoose');

const watchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dialColor: { type: String, required: true },
  material: { type: String, required: true },
  bracelet: { type: String, required: true },
  price: { type: Number, required: true },
  year: { type: Number, required: true },
  image: { type: String, required: true } 
});

const Watch = mongoose.model('Watch', watchSchema);

module.exports = Watch;
