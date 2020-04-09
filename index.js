const fs = require('fs').promises;
const mongoose = require('mongoose');
const csv = require('csvtojson');
// const moment = require('moment');


mongoose.connect('mongodb://localhost:27017/trade', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

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

const Trade = mongoose.model('Trade', schema);

fs.readdir('./csv')
  .then(files => {
    return Promise.all(
      files.map(file => {
        return csv({
          delimiter: ','
        })
          .fromFile(`./csv/${file}`);
      })
    );
  })
  .then(csvToJsonFiles => {
    const trades = csvToJsonFiles
      .flat()
      .map(trade => ({
        year: trade.Year,
        Time_ref: trade.Time_ref,
        magnitude: trade.MAGNITUDE,
        unit: trade.UNIT,
        country_code: trade.country_code,
        country_name: trade.country_name,
        goods_exports: trade.Goods_Exports,
        goods_inports: trade.Goods_Inports,
        services_exports: trade.Services_Exports,
        services_imports: trade.Services_Imports,
        total_exports: trade.Total_exports,
        total_imports: trade.Total_imports,
        two_way_trade: trade.Two_way_trade
      }));

    return Trade.create(trades);
  })
  .then(() => console.log('done'));
