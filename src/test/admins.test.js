/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Admin from '../models/Admins';
import adminsSeed from '../seed/admins';

const mockedAdmin = {
  firstName: 'Caroline',
  lastName: 'River',
  email: 'carolineriver@gmail.com',
  password: 'kdjjfun45874',
  dni: '20458785',
  phone: '1168554785',
  location: 'Buenos Aires',
};

const mockedAdminModified = {
  firstName: 'Mario',
  lastName: 'Bros',
  email: 'Mariobros@gmail.com',
  password: 'passwordreseguro',
  dni: '12345678',
  phone: '1168542425',
  location: 'California',
};

const mockedAdminWithNumbers = {
  _id: '63531641063290188f2ab014',
  firstName: 'Mario',
  lastName: 'Bros',
  email: 'Mariobros@gmail.com',
  password: 'passwordreseguro',
  dni: 12345678,
  phone: 1168542425,
  location: 'California',
};

const mockedAdminInvalid = {
  firstName: 'a',
  lastName: 'Hills',
  email: 'Mariobros@gmail.com',
  password: 'Axhvbhd7844',
  dni: '30457895',
  phone: '1168542485',
  location: 'Montana',
};

const firstAdminId = adminsSeed[0]._id;
const secondAdminId = adminsSeed[1]._id;
const invalidId = 456;
const invalidAdminId = '62731244ec6456efd12685ef';

beforeAll(async () => {
  await Admin.collection.insertMany(adminsSeed);
});

describe('Delete/admins', () => {
  test('should return status code 204', async () => {
    const response = await request(app).delete(`/admins/${secondAdminId}`).send();
    expect(response.status).toBe(204);
  });
  test('should return 400', async () => {
    const response = await request(app).delete(`/admins/${invalidId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(`Invalid id: ${invalidId}`);
  });
  test('should return 404', async () => {
    const response = await request(app).delete(`/admins/${secondAdminId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(`Couldn't find admin with id ${secondAdminId}`);
  });
});

describe('Put/admins', () => {
  test('should return status code 200', async () => {
    const response = await request(app).put(`/admins/${firstAdminId}`).send(mockedAdminModified);
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(mockedAdminWithNumbers);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe(`Modified admin with id ${firstAdminId}`);
  });
  test('should return status code 400', async () => {
    const response = await request(app).put(`/admins/${invalidId}`).send(mockedAdmin);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(`Invalid id: ${invalidId}`);
  });
  test('should return status code 404', async () => {
    const response = await request(app).put(`/admins/${invalidAdminId}`).send(mockedAdmin);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(`Couldn't find admin with id ${invalidAdminId}`);
  });
  test('should return status code 400 validate error', async () => {
    const response = await request(app).put(`/admins/${firstAdminId}`).send(mockedAdminInvalid);
    expect(response.status).toBe(400);
    expect(response.body.message[0].message).toBe('first name should have a minimum length of 2 characters');
    expect(response.error).toBeTruthy();
  });
});
