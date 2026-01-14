import express from 'express';

const {
    ORDER_SERVICE_PORT = 4000,
    USER_SERVICE_PORT = 5000
} = process.env;

const orderService = `http://localhost:${ORDER_SERVICE_PORT}`;
const userService = `http://localhost:${USER_SERVICE_PORT}`;


const app = express();
const PORT = 3000;

app.use(express.json());


// API GET 
app.get('/id', sy)




app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});