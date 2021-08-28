const request = require('supertest');
const app = require('../server');

describe('User creation Endpoints', () => {
  it('should fail if user provide wrong password', async () => {
    const res = await request(app).post('/api/users').send({
      email: 'test@test.com',
      password: 'abc',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should fail if user provide wrong email', async () => {
    const res = await request(app).post('/api/users').send({
      email: 'test',
      password: 'abdcbslvpvfc',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should fail if user provide wrong email and password', async () => {
    const res = await request(app).post('/api/users').send({
      email: 'test@',
      password: 'abc',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should pass if user provide correct password and email', async () => {
    const res = await request(app).post('/api/users').send({
      email: 'test@test.com',
      password: 'abcdacsdvf',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});
