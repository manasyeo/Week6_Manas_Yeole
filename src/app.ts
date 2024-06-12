import express from 'express';
import { UserRoutes } from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import authorRouter from './routes/autherRoutes';
import ratingRouter from './routes/ratingRoutes';
import reviewRouter from './routes/reviewRoutes';
import orderRouter from './routes/orderRoutes'


const app = express();
const port = 8000;

app.use(express.json());

app.use('/',UserRoutes);
app.use('/',bookRoutes);
app.use('/',authorRouter);
app.use('/',reviewRouter);
app.use('/',ratingRouter);
app.use('/',orderRouter);









app.listen(port,()=>{
    console.log("HII we are comfortable with nodejs");
    
})