import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../models/user.js";

const createSuperAdmin = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Webcraft");

    const existingAdmin = await User.findOne({
      role: "super_admin",
    });

    if (existingAdmin) {
      console.log("Super admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@1234", 12);

    await User.create({
      firstName: "Sajid",
      lastName: "Admin",
      username: "superadmin",
      email: "admin@webcraft.com",
      phone: "9999999999",
      password: hashedPassword,
      role: "super_admin",
      status: "active",
      isEmailVerified: true,
    });

    console.log("Super admin created successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createSuperAdmin();