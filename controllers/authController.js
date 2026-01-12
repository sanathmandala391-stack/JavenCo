/*const User = require('../models/User')
const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// 🔑 Token generator
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

/* ================= USER ================= */

// ✅ User Register
/*
exports.userRegister = async (req, res) => {
  const { name, email, password } = req.body; // Destructure

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  // ⚠️ Hash the password if you don't have a 'pre-save' hook in your User Model
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  res.json({
    message: 'User registered',
    token: generateToken(user._id, 'user')
  });
};

// ✅ User Login
exports.userLogin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  res.json({
    message: 'Login successful',
    token: generateToken(user._id, 'user')
  })
}

/* ================= ADMIN ================= */

// ✅ Admin Register (DO THIS ONCE
/*
exports.adminRegister = async (req, res) => {
  const adminExists = await Admin.findOne({ email: req.body.email })
  if (adminExists) {
    return res.status(400).json({ message: 'Admin already exists' })
  }

  const admin = await Admin.create(req.body)

  res.json({
    message: 'Admin registered',
    token: generateToken(admin._id, 'admin')
  })
}

// ✅ Admin Login
exports.adminLogin = async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email })
  if (!admin || !(await bcrypt.compare(req.body.password, admin.password))) {
    return res.status(401).json({ message: 'Invalid admin credentials' })
  }

  res.json({
    message: 'Admin login successful',
    token: generateToken(admin._id, 'admin')
  })
}

*/

const User = require('../models/User');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// 🔑 Token generator
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

/* ================= USER ================= */

// ✅ User Register (Plain Text - No Bcrypt)
exports.userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Directly saving the password without hashing
    const user = await User.create({
      name,
      email,
      password: password 
    });

    res.json({
      message: 'User registered',
      token: generateToken(user._id, 'user')
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ User Login (Plain Text - No Bcrypt)
exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Direct string comparison (password === user.password)
    if (!user || password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      token: generateToken(user._id, 'user')
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= ADMIN ================= */

// ✅ Admin Register
exports.adminRegister = async (req, res) => {
  try {
    const adminExists = await Admin.findOne({ email: req.body.email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Admin created with plain text password
    const admin = await Admin.create(req.body);

    res.json({
      message: 'Admin registered',
      token: generateToken(admin._id, 'admin')
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Admin Login (Plain Text - No Bcrypt)
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    // Direct string comparison
    if (!admin || password !== admin.password) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    res.json({
      message: 'Admin login successful',
      token: generateToken(admin._id, 'admin')
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};