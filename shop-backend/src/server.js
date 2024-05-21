import express from 'express'
import { cartItems as CartItemsRaw, products as ProductsRaw } from './temp-data'

let cartItems = CartItemsRaw;
let products = ProductsRaw;

const app = express();
app.use(express.json());

function populatedCartIds(ids) {
    return ids.map(id => products.find(product => product.id === id));
}

app.get('/hello', (req, res) => {
    res.send('hello!');
})

app.get('/products', (req, res) => {
    res.json(products);
})

app.get('/cart', (req, res) => {
    const populatedCart = populatedCartIds(cartItems);
    res.json(populatedCart);
})

app.post('/cart', (req, res) => {
    const productId = req.body.id;
    cartItems.push(productId);
    const populatedCart = populatedCartIds(cartItems);
    res.json(populatedCart);
})

app.delete('/cart/:productId', (req, res) => {
    const productId = req.body.productId;
    cartItems = cartItems.filter(id => id != productId);
    res.json(cartItems);
})

app.get('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    const product = products.find(product => productId === product.id);
    const populatedCart = populatedCartIds(cartItems);
    res.json(populatedCart);
})

app.listen(8000, () => {
    console.log('server is listening on port 8000')
})