import  express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import profileRoutes from './src/routes/profile.routes.js';


const app = express();
// middlewares
app.use(bodyParser.json());
app.use(cors());

// routes
app.use('/', profileRoutes);


export default app;
