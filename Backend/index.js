import express from 'express'
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import multer from 'multer';
import path from "path";
import cors from 'cors';
import Product from './Model/Product.model.js';
import User from './Model/User.model.js';

const app = express();
const port = 3000;

app.use(express.json())
app.use(cors())

// CONNECTION TO THE MONGODB ATLAS DATABASE
mongoose.connect("mongodb+srv://vipinmaurya:Vipin%40123@cluster0.cjmz98f.mongodb.net/e-commerce")
// username : vipinmaurya
// Password : Vipin@123   => (@ = %40)
// URL LINK : https://cloud.mongodb.com/v2/667321375412a11fcc2b152c#/overview



// API Creation
app.get("/", (req, res) => {
    res.send("I am root")
})

// Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

// Creating upload endpoint for images
app.use("/images", express.static("upload/images"))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})


// Uploading products to the database (API to upload)
app.post("/addproduct", async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    });

    console.log(product);
    await product.save();
    console.log("Saved to the database")

    res.json({
        success: true,
        name: req.body.name
    })
})


// Creating API for deleting products
app.post("/removeproduct", async (req, res) => {

    const products = await Product.findOneAndDelete({ id: req.body.id });
    console.log(products);
    console.log("Removed")
    res.json({
        success: true,
        name: req.body.name
    })
})


// Creating API for getting all products
app.get("/allproducts", async (req, res) => {
    const products = await Product.find({});
    console.log("All products are fetched")
    res.send(products);
})



// Creating Endpoint for registering the user
app.post("/signup", async (req, res) => {
    const check = await User.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "Existing user found with same the Email addresss" })
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: req.body.cart,
    });

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })
})


// Creating Endpoint for user login
app.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, errors: "Wrong Password" })
        }
    } else {
        res.json({ success: false, erros: "Email address Does not exists" })
    }
})



app.listen(port, (error) => {
    if (!error) {
        console.log("Listening on port 3000");
    }
    else {
        console.log("Error : " + error)
    }
})