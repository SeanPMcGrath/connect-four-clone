const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const Player = mongoose.model(
  "Player",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 32
    }
  })
);

function validatePlayer(player) {
  const schema = {
    username: Joi.string()
      .min(5)
      .max(32)
      .required()
  };

  return Joi.validate(player, schema);
}

exports.Player = Player;
exports.validate = validatePlayer;
