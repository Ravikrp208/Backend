import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import paymentModel from "../models/payment.model.js";
import { stockOfVariant } from "../dao/product.dao.js";
import { getCartDetails } from "../dao/cart.dao.js";
import { createOrder } from "../services/payment.service.js";

export const addToCart = async (req, res) => {
  const { productId, variantId } = req.params;
  const { quantity = 1 } = req.body;

  const product = await productModel.findOne({
    _id: productId,
    "variants._id": variantId,
  });

  if (!product) {
    return res.status(404).json({
      message: "Product or variant not found",
      success: false,
    });
  }

  const stock = await stockOfVariant(productId, variantId);

  const cart =
    (await cartModel.findOne({ user: req.user._id })) ||
    (await cartModel.create({ user: req.user._id }));

  const isProductAlreadyInCart = cart.items.some(
    (item) =>
      item.product.toString() === productId &&
      item.variant?.toString() === variantId,
  );

  if (isProductAlreadyInCart) {
    const quantityInCart = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variant?.toString() === variantId,
    ).quantity;
    if (quantityInCart + quantity > stock) {
      return res.status(400).json({
        message: `Only ${stock} items left in stock. and you already have ${quantityInCart} items in your cart`,
        success: false,
      });
    }

    await cartModel.findOneAndUpdate(
      {
        user: req.user._id,
        "items.product": productId,
        "items.variant": variantId,
      },
      { $inc: { "items.$.quantity": quantity } },
      { new: true },
    );

    return res.status(200).json({
      message: "Cart updated successfully",
      success: true,
    });
  }

  if (quantity > stock) {
    return res.status(400).json({
      message: `Only ${stock} items left in stock`,
      success: false,
    });
  }

  cart.items.push({
    product: productId,
    variant: variantId,
    quantity,
    price: product.price,
  });

  await cart.save();

  return res.status(200).json({
    message: "Product added to cart successfully",
    success: true,
  });
};

export const getCart = async (req, res) => {
  const user = req.user;

  let cart = await cartModel
    .findOne({ user: user._id })
    .populate("items.product");

  if (!cart) {
    cart = await cartModel.create({ user: user._id });
  }

  return res.status(200).json({
    message: "Cart fetched successfully",
    success: true,
    cart,
  });
};

export const incrementCartItemQuantity = async (req, res) => {
  const { productId, variantId } = req.params;

  const product = await productModel.findOne({
    _id: productId,
    "variants._id": variantId,
  });

  if (!product) {
    return res.status(404).json({
      message: "Product or variant not found",
      success: false,
    });
  }

  const cart = await cartModel.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
      success: false,
    });
  }

  const stock = await stockOfVariant(productId, variantId);

  const itemQuantityInCart =
    cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variant?.toString() === variantId,
    )?.quantity || 0;

  if (itemQuantityInCart + 1 > stock) {
    return res.status(400).json({
      message: `Only ${stock} items left in stock. and you already have ${itemQuantityInCart} items in your cart`,
      success: false,
    });
  }

  await cartModel.findOneAndUpdate(
    {
      user: req.user._id,
      "items.product": productId,
      "items.variant": variantId,
    },
    { $inc: { "items.$.quantity": 1 } },
    { new: true },
  );

  return res.status(200).json({
    message: "Cart item quantity incremented successfully",
    success: true,
  });
};

export const createOrderController = async (req, res) => {
  try {
    const cartDetails = await getCartDetails(req.user._id);
    if (!cartDetails || !cartDetails.items || cartDetails.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
        success: false,
      });
    }

    const order = await createOrder({
      amount: cartDetails.totalPrice,
      currency: cartDetails.currency || "INR",
    });

    const payment = await paymentModel.create({
      user: req.user._id,
      price: {
        amount: cartDetails.totalPrice,
        currency: cartDetails.currency || "INR",
      },
      razorpay: {
        orderId: order.id,
      },
      orderItems: cartDetails.items.map((item) => ({
        title: item.product.title,
        productId: item.product._id,
        variantId: item.variant,
        quantity: item.quantity,
        price: item.product.variants.price,
      })),
    });

    return res.status(200).json({
      message: "Order created successfully",
      success: true,
      order,
      paymentId: payment._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Failed to create order",
      success: false,
    });
  }
};

export const verifyOrderController = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const payment = await paymentModel.findOne({
      "razorpay.orderId": razorpay_order_id,
    });

    if (!payment) {
      return res.status(404).json({
        message: "Payment record not found",
        success: false,
      });
    }

    payment.status = "paid";
    payment.razorpay.paymentId = razorpay_payment_id;
    payment.razorpay.signature = razorpay_signature;
    await payment.save();

    await cartModel.findOneAndUpdate({ user: req.user._id }, { items: [] });

    return res.status(200).json({
      message: "Order payment verified successfully",
      success: true,
      payment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Failed to verify order",
      success: false,
    });
  }
};
