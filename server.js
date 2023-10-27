import express from 'express';
import dotEnv from 'dotenv';
import API from './routes/index.js';
const PORT = process.env.PORT || 3001;
dotEnv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', API);

app.listen(PORT, () => {
  console.log(`App running at http://localhost:/${PORT}`);
});
