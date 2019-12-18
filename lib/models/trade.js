const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  year: Date,
  Time_ref: Date,
  magnitude: Number,
  unit: String,
  country_code: String,
  country_name: String,
  goods_exports: Number,
  goods_inports: Number,
  services_exports: Number,
  services_imports: Number,
  total_exports: Number,
  total_imports: Number,
  two_way_trade: Number
});
  
module.exports = mongoose.model('Trade', schema);
