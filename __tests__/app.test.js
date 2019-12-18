require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trade = require('../lib/models/trade');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let trade;
  beforeEach(async() => {
    
    trade = await Trade.create({
      year: new Date('2013-04-11'),
      Time_ref: new Date('2013-04-11'),
      magnitude: 3,
      unit: 'Dollers',
      country_code: 'UPC',
      country_name: 'United Provinces of the County',
      goods_exports: 1200,
      goods_inports: 600,
      services_exports: 300,
      services_imports: 400,
      total_exports: 1500,
      total_imports: 1000,
      two_way_trade: 2500
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  it('can create a new trade entry', () => {
    return request(app)
      .post('/api/v1/trades')
      .send({
        year: new Date('2013-04-11'),
        Time_ref: new Date('2013-04-11'),
        magnitude: 3,
        unit: 'Dollers',
        country_code: 'UPC',
        country_name: 'United Provinces of the County',
        goods_exports: 1200,
        goods_inports: 600,
        services_exports: 300,
        services_imports: 400,
        total_exports: 1500,
        total_imports: 1000,
        two_way_trade: 2500
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          year: '2013-04-11T00:00:00.000Z',
          Time_ref: '2013-04-11T00:00:00.000Z',
          magnitude: 3,
          unit: 'Dollers',
          country_code: 'UPC',
          country_name: 'United Provinces of the County',
          goods_exports: 1200,
          goods_inports: 600,
          services_exports: 300,
          services_imports: 400,
          total_exports: 1500,
          total_imports: 1000,
          two_way_trade: 2500,
          __v: 0
        });
      });
  });

  it('gets a trade data entry by Id', () => {
    return request(app)
      .get(`/api/v1/trades/${trade._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          year: '2013-04-11T00:00:00.000Z',
          Time_ref: '2013-04-11T00:00:00.000Z',
          magnitude: 3,
          unit: 'Dollers',
          country_code: 'UPC',
          country_name: 'United Provinces of the County',
          goods_exports: 1200,
          goods_inports: 600,
          services_exports: 300,
          services_imports: 400,
          total_exports: 1500,
          total_imports: 1000,
          two_way_trade: 2500,
          __v: 0
        });
      });
  });

  it('gets all trade data', () => {
    return request(app)
      .get('/api/v1/trades')
      .then(res => {
        expect(res.body).toEqual([
          {
            _id: expect.any(String),
            year: '2013-04-11T00:00:00.000Z',
            Time_ref: '2013-04-11T00:00:00.000Z',
            magnitude: 3,
            unit: 'Dollers',
            country_code: 'UPC',
            country_name: 'United Provinces of the County',
            goods_exports: 1200,
            goods_inports: 600,
            services_exports: 300,
            services_imports: 400,
            total_exports: 1500,
            total_imports: 1000,
            two_way_trade: 2500,
            __v: 0
          }
        ]);
      });
  });
  it('updates a trade data entry', () => {
    return request(app)
      .patch(`/api/v1/trades/${trade._id}`)
      .send({ goods_exports: 1500 })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          year: '2013-04-11T00:00:00.000Z',
          Time_ref: '2013-04-11T00:00:00.000Z',
          magnitude: 3,
          unit: 'Dollers',
          country_code: 'UPC',
          country_name: 'United Provinces of the County',
          goods_exports: 1500,
          goods_inports: 600,
          services_exports: 300,
          services_imports: 400,
          total_exports: 1500,
          total_imports: 1000,
          two_way_trade: 2500,
          __v: 0
        });
      });
  });
  it('deletes a trade entry', () => {
    return request(app)
      .delete(`/api/v1/trades/${trade._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          year: '2013-04-11T00:00:00.000Z',
          Time_ref: '2013-04-11T00:00:00.000Z',
          magnitude: 3,
          unit: 'Dollers',
          country_code: 'UPC',
          country_name: 'United Provinces of the County',
          goods_exports: 1200,
          goods_inports: 600,
          services_exports: 300,
          services_imports: 400,
          total_exports: 1500,
          total_imports: 1000,
          two_way_trade: 2500,
          __v: 0
        });
      });
  });
});
