const { Router } = require('express');
const Trade = require('../models/trade');

module.exports = Router()
  .post('/', (req, res, next) => {
    Trade
      .create(req.body)
      .then(trade => res.send(trade))
      .catch(next);
  })

  .get('/balance', (req, res, next) => {
    Trade
      .getTradeBalance()
      .then(tradebalance => res.send(tradebalance))
      .catch(next);
  })
  .get('/goods-ratio', (req, res, next) => {
    Trade
      .getGoodsTradeRatio()
      .then(goods => res.send(goods))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Trade
      .findById(req.params.id)
      .then(trade => res.send(trade))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    const { page = 1, perPage = 20 } = req.query;
    Trade
      .find()
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(trade => res.send(trade))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Trade
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(trade => res.send(trade))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Trade
      .findByIdAndDelete(req.params.id)
      .then(trade => res.send(trade))
      .catch(next);
  });
