import  express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import profileRoutes from './src/routes/profile.routes.js';


const app = express();
// middlewares
app.use(bodyParser.json());
app.use(cors(
    {
        origin: ['http://localhost:5173', 'https://me-api-playground-nine.vercel.app/'],
    }
));

// routes
app.use('/', profileRoutes);


export default app;
