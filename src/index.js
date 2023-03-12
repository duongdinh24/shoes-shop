const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const orderRouter = require('./routes/orderRouter');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const fileUpload = require('express-fileupload');
const route = require('./routes');

dotenv.config();


var app = express();

// Middleware
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// Session
app.use(
  session({
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true,
    user: {},
    cart: { cartItems: [], total: 0 },
    error: {},
    cookie: { maxAge: 3600000 * 24 * 1 }, // 1 day
  })
);

// View engine
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

// fileUpload
app.use(fileUpload());

// connect to mongodb
mongoose.connect(
  // process.env.MONGODB_URI ||
  'mongodb://localhost:27017/shoe_shop',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
).then(
  () => console.log('Ready to use'),
)
  .catch(err => console.log("FAIL")
  )

route(app);

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.get('/aboutus', async (req, res) => {
  const isLogin = req.session.user ? true : false;
  const user = req.session.user ? req.session.user : {};
  res.render('aboutUs', { isLogin, user });
});

app.get('/', async (req, res) => {
  const isLogin = req.session.user ? true : false;
  const user = req.session.user ? req.session.user : {};
  const latestRelease = await Product.find({}).sort({ _id: -1 }).limit(4);
  res.render('index', { isLogin, user, latestRelease });
});
app.get('*', async (req, res) => {
  res.render('404');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
