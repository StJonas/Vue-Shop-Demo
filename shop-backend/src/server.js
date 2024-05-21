import express from 'express'
import { MongoClient } from 'mongodb'

require('dotenv').config();
const client = new MongoClient(process.env.DB_URL);
let db = null;

const app = express();
app.use(express.json());

async function connectToDatabase() {
    if (!db) {
        try {
            await client.connect();
            db = client.db('VUE-SHOP-DEMO');
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }
}

app.use(async (req, res, next) => {
    try {
        await connectToDatabase();
        next();
    } catch (error) {
        res.status(500).send('Failed to connect to the database');
    }
});

async function populatedCartIds(ids) {
    return Promise.all(ids.map(id => db.collection('products').findOne({ id })))
}

app.get('/hello', (req, res) => {
    res.send('hello!');
})

app.get('/products', async (req, res) => {
    const products = await db.collection('products').find({}).toArray();
    res.json(products);
})

app.get('/users/:userId/cart', async (req, res) => {
    const user = await db.collection('users').findOne({ id: req.params.userId });
    const populatedCart = await populatedCartIds(user.cartItems);
    res.json(populatedCart);
})

app.post('/users/:userId/cart', async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.id;

    await db.collection('users').updateOne({ id: userId }, {
        $addToSet: { cartItems: productId }
    })

    const user = await db.collection('users').findOne({ id: req.params.userId });
    const populatedCart = await populatedCartIds(user.cartItems);
    res.json(populatedCart);
})

app.delete('user/:userId/cart/:productId', async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.productId;

    await db.collection('users').updateOne({ id: userId }, {
        $pull: { cartItems: productId }
    })

    const user = await db.collection('users').findOne({ id: req.params.userId });
    const populatedCart = await populatedCartIds(user.cartItems);
    res.json(populatedCart);
})

app.get('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    const product = await db.collection('product').findOne({ id: productId })
    res.json(product);
})

app.listen(8000, () => {
    console.log('server is listening on port 8000')
})