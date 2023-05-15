const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_MY);
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51N3HD6H6sy6fYmnuTtPK1bIguMyImljh309aqzma8JKQy8A3eGBdRYGj4HUrXQqUw3ZP8HhREDthTE9RsCFEgoiE004hxEr6kk');

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
