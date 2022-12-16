const mongoose = require("mongoose");

const GamelogSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
    },
    opponent: {
      type: String,
      requried: true,
    },
    result: {
      type: String,
      enum: ["W", "L"],
    },
    score: { type: Number },
    opponentScore: { type: Number },
    points: { type: Number },
    fieldGoalsMade: { type: Number },
    fieldGoalsAttempted: { type: Number },
    fieldGoalsPercentage: { type: Number },
    threePointFieldGoalsMade: { type: Number },
    threePointFieldGoalsAttempted: { type: Number },
    threePointFieldGoalsPercentage: { type: Number },
    freethrowsMade: { type: Number },
    freethrowsAttempted: { type: Number },
    freethrowsPercentage: { type: Number },
    rebounds: { type: Number },
    assists: { type: Number },
    blocks: { type: Number },
    steals: { type: Number },
    turnovers: { type: Number },
  },
  { timestamps: true }
);

const AthleteSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      requried: true,
    },
    lastName: {
      type: String,
      requried: true,
    },
    team: {
      type: String,
      enum: [
        "7U",
        "8U",
        "9U",
        "10U",
        "11U",
        "12U",
        "13U",
        "14U",
        "15U",
        "16U",
        "17U",
      ],
      requried: true,
    },
    jerseyNumber: {
      type: Number,
      requried: true,
    },
    user_id: {
      type: String,
      requried: true,
      ref: "User"
    },
    gamelog: [GamelogSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Athlete", AthleteSchema);
