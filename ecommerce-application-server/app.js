import express from 'express';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import morgan from 'morgan';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';


const app = express();

app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
});

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/order', orderRoutes)

export default app