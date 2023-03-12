const paypal = require('paypal-rest-sdk');
const Order = require('../models/orderModel.js');

class PayController {

    //[POST /vnpay/create:id]
    async createVNPay(req, res, next) {

    }

    //[GET /vnpay/return]
    async vnpayReturn(req, res, next) {

    }

    // [GET pay/paypal/:id]
    async createPaypal(req, res) {

        paypal.configure({
            mode: 'sandbox', //sandbox or live
            client_id: process.env.PAYPAL_CLIENT_ID,
            client_secret: process.env.PAYPAL_SECRET_ID,
        });
        const id = req.params.id;
        const order = await Order.findById(id);
        if (!order) {
            res.redirect('/order/user');
            return;
        }

        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            redirect_urls: {
                return_url: `http://localhost:3000/order/success/${id}`,
                cancel_url: 'http://localhost:3000/order/user',
            },
            transactions: [
                {
                    amount: {
                        currency: 'USD',
                        total: `${order.total}`,
                    },
                    description: 'DIO SHOES',
                },
            ],
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        res.redirect(payment.links[i].href);
                    }
                }
            }
        });
    }
}

module.exports = new PayController();