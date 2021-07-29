const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    cloud_id: {
      type: String,
    },
    path: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("userData", userSchema);
