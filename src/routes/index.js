
const payRouter = require('./pay');
const cartRouter = require('./cart');
const orderRouter = require('./order');


function route(app) {
    app.use('/cart', cartRouter);
    app.use('/pay', payRouter);
    app.use('/order', orderRouter);
}

module.exports = route;