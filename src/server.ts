import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = { origin: process.env.CORS_ORIGIN || '*' };
app.use(cors(corsOptions));
app.use(express.json());
routes(app);

app.listen(Number(port), () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
