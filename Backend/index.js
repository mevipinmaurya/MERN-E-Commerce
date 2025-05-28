import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import Product from './Model/Product.model.js';
import User from './Model/User.model.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const corsOption = {
    origin: "https://mern-e-commerce-1-56z3.onrender.com",
    credentials: true
}
app.use(cors(corsOption));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://vipinmaurya:Vipin%40123@cluster0.cjmz98f.mongodb.net/e-commerce");

// Image storage setup
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'));

// Upload image endpoint
app.use("/images", express.static("upload/images"))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Add product
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    const id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

    const product = new Product({
        id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    });

    await product.save();
    res.json({ success: true, name: req.body.name });
});

// Remove product
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true });
});

// Get all products
app.get('/allproducts', async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

// Signup
app.post('/signup', async (req, res) => {
    const check = await User.findOne({ email: req.body.email });
    if (check) return res.status(400).json({ success: false, errors: 'User already exists' });

    const cart = {};
    for (let i = 0; i < 300; i++) cart[i] = 0;

    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart
    });

    await user.save();
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, 'secret_ecom');

    res.json({ success: true, token });
});

// Login
app.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.json({ success: false, errors: 'Email not found' });

    const passCompare = req.body.password === user.password;
    if (!passCompare) return res.json({ success: false, errors: 'Incorrect password' });

    const data = { user: { id: user.id } };
    const token = jwt.sign(data, 'secret_ecom');

    res.json({ success: true, token });
});

// New Collection
app.get('/newcollection', async (req, res) => {
    const products = await Product.find({});
    const newCollection = products.slice(-8);
    res.send(newCollection);
});

// Popular in Women
app.get('/popularinwomen', async (req, res) => {
    const products = await Product.find({ category: 'women' });
    res.send(products.slice(0, 4));
});

// Auth Middleware
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send({ errors: 'Authentication required' });

    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (err) {
        res.status(401).send({ errors: 'Invalid token' });
    }
};

// Add to cart
app.post('/addtocart', fetchUser, async (req, res) => {
    const userData = await User.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;

    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send('Added');
});

// Remove from cart
app.post('/removefromcart', fetchUser, async (req, res) => {
    const userData = await User.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0) userData.cartData[req.body.itemId] -= 1;

    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send('Removed');
});

// Get cart data
app.post('/getcart', fetchUser, async (req, res) => {
    const userData = await User.findOne({ _id: req.user.id });
    res.json(userData.cartData);
});

// Serve frontend from Vite build
app.use(express.static(path.join(__dirname, '../Frontend/dist')));

app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
