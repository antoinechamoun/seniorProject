const ObjectId = require("mongodb").ObjectId;

const orders = Array.from({ length: 22 }).map((_, idx) => {
  if (idx < 10) {
    var hour = "0" + idx;
    var subtotal = 100;
  } else if (idx > 16 && idx < 21) {
    var hour = idx;
    var subtotal = 100 + 12 * idx;
  } else {
    var hour = idx;
    var subtotal = 100;
  }
  return {
    user: ObjectId("6315be844798fb5a5940bc2f"),
    orderTotal: {
      itemsCount: 3,
      cartSubtotal: subtotal,
    },
    cartItems: [
      {
        name: "Product name",
        price: 34,
        image: { path: "/images/card/card.png" },
        quantity: 3,
        count: 12,
      },
    ],
    paymentMethod: "PayPal",
    isPaid: false,
    isDelivered: false,
    createdAt: `2022-12-07T${hour}:12:36.490+00:00`,
  };
});

module.exports = orders;
