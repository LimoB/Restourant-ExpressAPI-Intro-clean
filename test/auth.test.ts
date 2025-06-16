import request from 'supertest';
import app from '../src/app';
import db from '../src/drizzle/db';
import { userTable } from '../src/drizzle/schema';
import { eq } from 'drizzle-orm';

describe('Auth API Unit Test', () => {


  const testUser = {
    fullName: 'jwtuser',
    email: 'jwtuser@example.com',
    password: 'supersecurepassword',
    userType: 'admin'
  };

  it('should register a user', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe("User created successfully");
  });

  it('should log in the user and return JWT', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');

  });



  afterAll(async () => {
    await db.delete(userTable).where(eq(userTable.email, testUser.email));
    await db.$client.end(); // or await client.end(); depending on your setup
  });
});