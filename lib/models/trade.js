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

schema.statics.getTradeBalance = function() {
  return this.aggregate([
    {
      '$group': {
        '_id': {
          'country_name': '$country_name', 
          'total_exports': '$total_exports', 
          'total_imports': '$total_imports', 
          'trade_balence': {
            '$subtract': [
              '$total_exports', '$total_imports'
            ]
          }
        }
      }
    }, {
      '$sort': {
        'trade_balance': 1
      }
    }
  ]);
};
schema.statics.getGoodsTradeRatio = function() {
  return this.aggregate([
    {
      '$match': {
        'goods_exports': {
          '$gt': 1
        }, 
        'goods_inports': {
          '$gt': 1
        }
      }
    }, {
      '$group': {
        '_id': {
          'country_name': '$country_name', 
          'goods_exports': '$goods_exports', 
          'goods_inports': '$goods_inports', 
          'services_exports': '$services_exports', 
          'services_imports': '$services_imports', 
          'goods_ratio': {
            '$divide': [
              '$goods_exports', '$goods_inports'
            ]
          }
        }
      }
    }
  ]);
};
  
module.exports = mongoose.model('Trade', schema);
