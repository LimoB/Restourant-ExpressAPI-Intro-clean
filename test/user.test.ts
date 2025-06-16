import request from 'supertest';
import app from '../src/app';
import db from '../src/drizzle/db';
import { userTable } from '../src/drizzle/schema';
import { eq } from 'drizzle-orm';

describe('Users API Unit Test', () => {

    let token: string

const testAdminUser = {
  email: "boazkipchirchir15@gmail.com",
  password: "mypassword123"
};

  it('should log in the admin user and return JWT', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testAdminUser.email,
      password: testAdminUser.password,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');

    token = res.body.token;
  });

    it('should access protected route with JWT and return users array', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });


  afterAll(async () => {
    // await db.delete(userTable).where(eq(userTable.email, testUser.email));
    await db.$client.end(); // or await client.end(); depending on your setup
  });
});