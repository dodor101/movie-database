import express from 'express';
import dotEnv from 'dotenv';
import API from './routes/index.js';
const PORT = process.env.PORT || 3001;
dotEnv.config();
import express_handlebars from 'express-handlebars';
import path from 'path';
const hbs = express_handlebars.create({});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use('/api', API);

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
