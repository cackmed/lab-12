const csv = require('csvtojson');
const Trade = require('../models/trade');

function seedData() {
  return csv()
    .fromFile(__dirname + '../../csv/goods-and-services-trade-by-country-year-ended-september-2019-map-csv.csv')
    .then(trades => {
      return trades.map(trade => ({
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
    })
    .then(trades => Trade.create(trades));
}
module.exports = {
  seedData
};

