const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const Joi = require("joi");
const sendEmail = require("../utils/sendEmail")

const generateToken = async (id) => {
  return await jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const registerUser = async (req, res) => {
    const data = req.body;

    const registerSchema = Joi.object().keys({
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string().min(6)
    })

    const validatedData = await registerSchema.validateAsync(data);

    const userExists = await User.findOne({ email: validatedData.email });

    if (userExists) {
        return res.status(401).send({message: "user already exists"});
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    console.log(validatedData.password, hashedPassword);

    validatedData.password = hashedPassword;

    const newUser = await User.create(validatedData);

    const authToken = await generateToken(newUser._id);

    res.cookie("token", authToken, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true,
    });

    if (newUser) {
        const { _id, name, email, photo, phone, bio } = newUser;
        return res.status(201).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            token: authToken,
        });
    } else {
        return res.status(400).send({message: "Whoops! Something Went Wrong!"});
    }
}

// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body;

//   //Validation
//   if (!name || !email || !password) {
//     res.status(400);
//     throw new Error("Please fill in all required fields");
//   }
//   if (password.length < 6) {
//     res.status(400);
//     throw new Error("Password must be up to 6 characters");
//   }

//   // check if user email already exists

//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     res.status(400);
//     throw new Error("User Already Exists!");
//   }

//   const hashedPassword = await bcrypt.hash(password);
//   console.log(hashedPassword)

//   //create new user
//   const user = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//   });

//   //generate token
//   const token = generateToken(user._id);

//   //Send Http-only cookie
//   res.cookie("token", token, {
//     path: "/",
//     httpOnly: true,
//     expires: new Date(Date.now() + 1000 * 86400),
//     sameSite: "none",
//     secure: true,
//   });

//   if (user) {
//     const { _id, name, email, photo, phone, bio } = user;
//     res.status(201).json({
//       _id,
//       name,
//       email,
//       photo,
//       phone,
//       bio,
//       token,
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid user data");
//   }
// });

//Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //validate request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }
  // check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }
  // User exists, check if password is correct
  console.log(password, user.password);
  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  console.log(passwordIsCorrect)
  //generate token
  const token = await generateToken(user._id);

  //Send Http-only cookie
  if (passwordIsCorrect) {
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "none",
      secure: true,
    });
  }

  if (user && passwordIsCorrect) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

//logout user

const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "SUCCESSFULLY LOGGED OUT" });
});
//get user data
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const token = req.user.token;

  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

// Get Login Status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  // verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

//update user

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, photo, phone, bio } = user;
    (user.email = email), (user.name = req.body.name || name);
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;
    user.photo = req.body.photo || photo;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { oldPassword, password } = req.body;
  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }

  //validate

  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please add old and new password");
  }

  //check if old password matches password in DB
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  //save new password
  if (user && passwordIsCorrect) {
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.status(200).send("Password change successful");
  } else {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }
  //delete token if it exists in db
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  //create reset token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(resetToken);
//   res.send("forgot password")
  // hash token before saving to DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // save token to db
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), //thirty minutes
  }).save();

  //construct reset url
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${hashedToken}`;

  //resent email
  const message = `
<h2>hello ${user.name}</h2>
<p>Please use the url below to reset your password</p>
<p>This reset link is valid for only 30minutes</p>
<a href=${resetUrl} clicktracking=off>${resetUrl}</a>
<p>Regards</p>
<p>Pinvent Team</p>
`;

  const subject = "Password Reset Request";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: "Reset Email Sent" });
  } catch (error) {
    console.log(error);
    res.status(500);
    // throw new Error("Email not sent, please try again");
  }
});

//reset password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  console.log(resetToken);

  // hash token, then compare to token in db
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //find token in db
  const userToken = await Token.findOne({
    token: resetToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }
  //find user
  const user = await User.findOne({ _id: userToken.userId });
  user.password = await bcrypt.hash(password, 10);
  await user.save();
  res.status(200).json({
    message: "Password Reset Successfully Please Login",
  });
});

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
};
