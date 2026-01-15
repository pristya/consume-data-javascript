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
app.get('/:id', async (req, res, next) => {
    const {id} = req.params;


    try {
        const [orderRes, userRes] = await Promise.all([
            fetch(`${orderService}/${id}`),
            fetch(`${userService}/${id}`),
        ]);

        if (!orderRes.ok) {
            if (orderRes.status === 400) return res.status(400).json({message: 'Bad Request'});
            if (orderRes.status === 404) return res.status(404).json({message: 'Not Found'});
            throw new Error(`Order Service Error: ${orderRes.status}`);
        }

        if (!userRes.ok) {
            if (userRes.status === 400) return res.status(400).json({message: 'Bad Request'});
            if (userRes.status === 404) return res.status(404).json({message: 'Not Found'});
            throw new Error(`User Service Error: ${userRes.status}`);
        }

        const order = await orderRes.json();
        const user = await userRes.json();
        res.json({
            id: order.id,
            menu: order.menu,
            user: user.name,

        });
    } catch (err) {
        next(err);
    }
});


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error'});
});


app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});