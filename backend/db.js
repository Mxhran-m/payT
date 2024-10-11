const mongoose = require(mongoose);
require('dotenv').config();
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const userScehma = mongoose.schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
    maxLength: 10,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

const User = mongoose.model("User", userScehma);

const accountSchema = mongoose.schema({
  userId:{
    type: mongoose.schema.Types.ObjectId, //Reference to User model
    ref: 'User',
    required: true
  },
  balance:{
    type: Number,
    required: true
  }
})

const Account = mongoose.model("Account", accountSchema);

model.exports = {
  User,
Account
};
