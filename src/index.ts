import cors from '@elysiajs/cors';
import openapi from '@elysiajs/openapi';
import { Elysia } from 'elysia';
import { warningRoutes } from './routes/warning';
import { grafikRoutes } from './routes/grafik';
import { formRoutes } from './routes/form';

const app = new Elysia()
  .get('/', () => 'Hello World!')
  .use(warningRoutes)
  .use(grafikRoutes)
  .use(formRoutes)
  .onError(({ code, error }) => {
    if (code === 401) {
      return { success: false, message: 'Unauthorized Access' };
    }
    if (code === 'NOT_FOUND') {
      return { success: false, message: 'Unauthorized Access' };
    }
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Something went wrong' };
  })
  .use(
    cors({
      origin: ['*'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'x-api-key', 'Authorization'],
      credentials: true,
    })
  )
  .use(openapi());

export default app;
