
const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  rank: {
    type: Number,
    required: true
  },
  name: {
    type: String,
  },
  hits: {
    type: Number,
  },
  bats: {
    type: String,
  },
  year: {
    type: Number,
  }
});

module.exports = Player = mongoose.model('player', PlayerSchema);