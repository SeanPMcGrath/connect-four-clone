const Joi = require("joi");
const mongoose = require("mongoose");
const { playerSchema } = require("./player");

const Game = mongoose.model(
  "Games",
  new mongoose.Schema({
    board: {
      type: Array,
      required: true
    },
    player1: {
      type: playerSchema,
      required: true
    },
    player2: {
      type: playerSchema,
      required: true
    },
    currentPlayer: {
      type: Number,
      required: true,
      min: 1,
      max: 2
    }
  })
);

function validateGame(game) {
  const schema = {
    board: Joi.array()
      .max(20)
      .required(),
    player1: Joi.objectId().required(),
    player2: Joi.objectId().required(),
    currentPlayer: Joi.number()
      .integer()
      .min(1)
      .max(2)
      .required()
  };

  return Joi.validate(game, schema);
}

exports.Game = Game;
exports.validate = validateGame;
