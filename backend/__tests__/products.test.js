require('dotenv').config();
const supertest = require('supertest');
const mongoose = require('mongoose');

const { app } = require('../server');

const request = supertest(app);

//connecting to the database before all the test
beforeAll(async () => {
  await mongoose.createConnection(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
});

it('should return products by limit', async () => {
  const res = await request.get('/api/products/10');
  expect(res.statusCode).toEqual(200);
  expect(res.body.length).toBeLessThanOrEqual(10);
});

it('should return single product using slug', async () => {
  const res = await request.get('/api/products/single/lenovo-touchpad');
  expect(res.statusCode).toEqual(200);
  expect(res.body.slug).toEqual('lenovo-touchpad');
});

it('should return products sorted by createdAt in ascending', async () => {
  const res = await request.post('/api/products/all').send({
    sort: 'createdAt',
    order: 'asc',
  });
  expect(res.statusCode).toEqual(200);
  const dates = res.body.map(p => {
    return p.createdAt;
  });
  expect(dates).toEqual(expect.arrayContaining(dates.sort()));
});

it('should return products limited to 3 or less per page', async () => {
  const res = await request.post('/api/products/all').send({
    sort: 'createdAt',
    order: 'asc',
  });
  expect(res.statusCode).toEqual(200);

  expect(res.body.length).toBeLessThanOrEqual(3);
});

it('should return products when no filter is applied', async () => {
  const res = await request.post('/api/products/search/filters');
  expect(res.statusCode).toEqual(200);

  expect(res.body.length).toBeGreaterThan(0);
});

afterAll(async () => {
  await mongoose.disconnect();
});
