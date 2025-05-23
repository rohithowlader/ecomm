const Otp = require("../models/Otp");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

exports.sendOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: "Phone is required" });

  const code = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

  await Otp.findOneAndUpdate(
    { phone },
    { code, expiresAt },
    { upsert: true, new: true }
  );

  // In production, use Twilio or SMS API here
  console.log(`OTP for ${phone}: ${code}`);

  res.json({ message: "OTP sent successfully" });
};

exports.verifyOtp = async (req, res) => {
  const { phone, code } = req.body;
  const otpDoc = await Otp.findOne({ phone });

  if (!otpDoc || otpDoc.code !== code || otpDoc.expiresAt < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  let user = await User.findOne({ phone });
  if (!user) {
    user = await User.create({ phone, name: "User" + phone.slice(-4) });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.json({ message: "Login successful", token, user });
};
