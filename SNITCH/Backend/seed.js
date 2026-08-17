import mongoose from "mongoose";
import dotenv from "dotenv";
import userModel from "./src/models/user.model.js";
import productModel from "./src/models/product.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://Ravikrp:K9v2k64f9mImYPRj@cluster0.0hokdjj.mongodb.net/snitch";

const productsData = [
  {
    title: "Classic White Linen Shirt",
    description: "Cut from breathable, premium European linen, this oversized shirt features a relaxed shoulder profile and a clean button-front design. Perfect for effortless summer styling.",
    price: { amount: 1999, currency: "INR" },
    images: [
      { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop" }
    ],
    variants: [
      {
        images: [{ url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop" }],
        price: { amount: 1999, currency: "INR" },
        stock: 50,
        attributes: { size: "S", color: "White" }
      },
      {
        images: [{ url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop" }],
        price: { amount: 1999, currency: "INR" },
        stock: 75,
        attributes: { size: "M", color: "White" }
      },
      {
        images: [{ url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop" }],
        price: { amount: 1999, currency: "INR" },
        stock: 40,
        attributes: { size: "L", color: "White" }
      }
    ]
  },
  {
    title: "Taylor Pleated Trousers",
    description: "Designed with a high rise and a refined front pleat, these relaxed-fit trousers offer a perfect blend of tailoring and casual comfort. Features side pockets and a button-tab waistband.",
    price: { amount: 2499, currency: "INR" },
    images: [
      { url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop" }
    ],
    variants: [
      {
        images: [{ url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop" }],
        price: { amount: 2499, currency: "INR" },
        stock: 30,
        attributes: { size: "30", color: "Olive" }
      },
      {
        images: [{ url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop" }],
        price: { amount: 2499, currency: "INR" },
        stock: 45,
        attributes: { size: "32", color: "Olive" }
      },
      {
        images: [{ url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop" }],
        price: { amount: 2499, currency: "INR" },
        stock: 20,
        attributes: { size: "34", color: "Olive" }
      }
    ]
  },
  {
    title: "Avenue Suede Jacket",
    description: "Crafted from ultra-soft faux suede, this lightweight jacket features a classic point collar, silver-tone zip closure, and subtle welt pockets. A luxurious layer for transitional weather.",
    price: { amount: 3999, currency: "INR" },
    images: [
      { url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop" }
    ],
    variants: [
      {
        images: [{ url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop" }],
        price: { amount: 3999, currency: "INR" },
        stock: 15,
        attributes: { size: "M", color: "Tan" }
      },
      {
        images: [{ url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop" }],
        price: { amount: 3999, currency: "INR" },
        stock: 20,
        attributes: { size: "L", color: "Tan" }
      }
    ]
  },
  {
    title: "Minimalist Knit Tee",
    description: "Woven from a cotton-blend knit, this relaxed-fit tee features a crew neckline and a slightly structured drape. A versatile wardrobe essential.",
    price: { amount: 1499, currency: "INR" },
    images: [
      { url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop" }
    ],
    variants: [
      {
        images: [{ url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop" }],
        price: { amount: 1499, currency: "INR" },
        stock: 40,
        attributes: { size: "S", color: "Charcoal" }
      },
      {
        images: [{ url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop" }],
        price: { amount: 1499, currency: "INR" },
        stock: 60,
        attributes: { size: "M", color: "Charcoal" }
      },
      {
        images: [{ url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop" }],
        price: { amount: 1499, currency: "INR" },
        stock: 35,
        attributes: { size: "L", color: "Charcoal" }
      }
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Find or create a seller
    let seller = await userModel.findOne({ role: "seller" });
    if (!seller) {
      seller = await userModel.create({
        email: "seller@snitch.co",
        fullname: "Snitch Curated",
        contact: "9876543210",
        password: "password123",
        role: "seller"
      });
      console.log("Created a new seller user:", seller.email);
    } else {
      console.log("Using existing seller user:", seller.email);
    }

    // Clear existing products
    await productModel.deleteMany({});
    console.log("Cleared existing products.");

    // Add seller ID to each product and insert
    const productsToInsert = productsData.map(p => ({
      ...p,
      seller: seller._id
    }));

    const createdProducts = await productModel.insertMany(productsToInsert);
    console.log(`Successfully seeded ${createdProducts.length} premium products.`);

  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

seedDatabase();
