import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AppError } from '../utils/appError.js';
import { registerSchema, loginSchema } from '../validators/authValidator.js';

const signToken = (user) => jwt.sign(
  { userId: user._id, email: user.email, role: user.role, fullName: user.fullName },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);

export const register = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) throw new AppError('Validation failed', 400, error.details.map(d => d.message));

    const existing = await User.findOne({ email: value.email });
    if (existing) throw new AppError('Email already exists', 409);

    const hashedPassword = await bcrypt.hash(value.password, 10);
    const user = await User.create({ ...value, password: hashedPassword });
    const token = signToken(user);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) throw new AppError('Validation failed', 400, error.details.map(d => d.message));

    const user = await User.findOne({ email: value.email });
    if (!user) throw new AppError('Invalid credentials', 401);

    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) throw new AppError('Invalid credentials', 401);

    const token = signToken(user);
    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
};

export const me = async (req, res) => {
  res.json({ user: req.user });
};
