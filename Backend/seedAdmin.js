const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./Model/UserModel");

// Connect to database
const db = require("./util/db");

// Default admin credentials
const defaultAdmin = {
  userid: "ADMIN001",
  name: "System Administrator",
  email: "admin@ccms.com",
  age: 30,
  address: "Head Office, Colombo",
  userrole: "admin",
  password: "Admin@123", // Change this password after first login
};

// Seed admin user
const seedAdmin = async () => {
  try {
    console.log("Connecting to database...");
    
    // Wait for database connection
    await db;
    console.log("Database connected successfully!");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ 
      $or: [
        { userid: defaultAdmin.userid },
        { email: defaultAdmin.email }
      ]
    });

    if (existingAdmin) {
      console.log("❌ Admin user already exists!");
      console.log("User ID:", existingAdmin.userid);
      console.log("Email:", existingAdmin.email);
      console.log("\nIf you forgot the password, delete this user and run the script again.");
      process.exit(0);
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(defaultAdmin.password, saltRounds);

    // Create new admin user
    const admin = new User({
      userid: defaultAdmin.userid,
      name: defaultAdmin.name,
      email: defaultAdmin.email,
      age: defaultAdmin.age,
      address: defaultAdmin.address,
      userrole: defaultAdmin.userrole,
      password: hashedPassword,
    });

    // Save to database
    await admin.save();

    console.log("\n✅ Default admin user created successfully!");
    console.log("\n==================== LOGIN CREDENTIALS ====================");
    console.log("User ID:  ", defaultAdmin.userid);
    console.log("Email:    ", defaultAdmin.email);
    console.log("Password: ", defaultAdmin.password);
    console.log("Role:     ", defaultAdmin.userrole);
    console.log("===========================================================");
    console.log("\n⚠️  IMPORTANT: Change this password after first login!");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin user:", error);
    process.exit(1);
  }
};

// Run the seed function
seedAdmin();
