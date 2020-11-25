const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  name: { type: String, lowercase: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  phoneNumber: { type: Number, unique: true },
  password: { type: String, required: true },
  creationDate: Date,
});

UserSchema.pre("save", async (next) => {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = model("User", UserSchema);
module.exports = User;
