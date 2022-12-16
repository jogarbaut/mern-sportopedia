const Athlete = require("../models/athlete.model");

module.exports.createAthlete = (req, res) => {
  const {
    firstName,
    lastName,
    team,
    jerseyNumber,
  } = req.body;

  const user_id = req.user._id;

  Athlete.create({
      firstName,
      lastName,
      team,
      jerseyNumber,
      user_id,
    })
    .then(athlete => res.json(athlete))
    .catch(err => res.json(err))
};

module.exports.getAllAthletes = (req, res) => {
  Athlete.find({}).populate("user_id")
    .then((athlete) => res.json(athlete))
    .catch((err) => res.json(err));
};

module.exports.getAthlete = (req, res) => {
  Athlete.findOne({ _id: req.params.id }).populate("user_id")
    .then((athlete) => res.json(athlete))
    .catch((err) => res.json(err));
};

module.exports.getAthletesByTeam = (req, res) => {
  Athlete.find({ team: req.params.team })
    .then((athlete) => res.json(athlete))
    .catch((err) => res.json(err));
};

module.exports.updateAthlete = (req, res) => {
  Athlete.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((updatedAthlete) => res.json(updatedAthlete))
    .catch((err) => res.json(err));
};

module.exports.updateGamelog = (req, res) => {
  Athlete.updateOne(
    { _id: req.params.id },
    {
      $push: { gamelog: req.body },
    }
  )
    .then((updatedAthleteGamelog) =>
      res.json(updatedAthleteGamelog)
    )
    .catch((err) => res.json(err));
};

module.exports.getGame = (req, res) => {
  Athlete.findOne({ "gamelog._id": req.params.subid }, "gamelog.$")
    .then((game) => res.json(game))
    .catch((err) => res.json(err));
};

module.exports.updateGame = (req, res) => {
  Athlete.findById({ _id: req.params.id })
    .then((athlete) => {
      athlete.gamelog.id(req.params.subid).date = req.body.date;
      athlete.gamelog.id(req.params.subid).opponent = req.body.opponent;
      athlete.gamelog.id(req.params.subid).result = req.body.result;
      athlete.gamelog.id(req.params.subid).score = req.body.score;
      athlete.gamelog.id(req.params.subid).opponentScore =
        req.body.opponentScore;
      athlete.gamelog.id(req.params.subid).points = req.body.points;
      athlete.gamelog.id(req.params.subid).fieldGoalsMade =
        req.body.fieldGoalsMade;
      athlete.gamelog.id(req.params.subid).fieldGoalsAttempted =
        req.body.fieldGoalsAttempted;
      athlete.gamelog.id(req.params.subid).fieldGoalsPercentage =
        req.body.fieldGoalsPercentage;
      athlete.gamelog.id(req.params.subid).threePointFieldGoalsMade =
        req.body.threePointFieldGoalsMade;
      athlete.gamelog.id(req.params.subid).threePointFieldGoalsAttempted =
        req.body.threePointFieldGoalsAttempted;
      athlete.gamelog.id(req.params.subid).threePointFieldGoalsPercentage =
        req.body.threePointFieldGoalsPercentage;
      athlete.gamelog.id(req.params.subid).freethrowsMade =
        req.body.freethrowsMade;
      athlete.gamelog.id(req.params.subid).freethrowsAttempted =
        req.body.freethrowsAttempted;
      athlete.gamelog.id(req.params.subid).freethrowsPercentage =
        req.body.freethrowsPercentage;
      athlete.gamelog.id(req.params.subid).rebounds = req.body.rebounds;
      athlete.gamelog.id(req.params.subid).assists = req.body.assists;
      athlete.gamelog.id(req.params.subid).blocks = req.body.blocks;
      athlete.gamelog.id(req.params.subid).steals = req.body.steals;
      athlete.gamelog.id(req.params.subid).turnovers = req.body.turnovers;
      athlete.save();
    })
    .then((updatedAthleteGamelog) =>
      res.json(updatedAthleteGamelog)
    )
    .catch((err) => res.json(err));
};

module.exports.deleteAthlete = (req, res) => {
  Athlete.deleteOne({ _id: req.params.id })
    .then((deleteConfirmation) => res.json(deleteConfirmation))
    .catch((err) => res.json(err));
};

module.exports.deleteGame = (req, res) => {
  Athlete.findById({ _id: req.params.id })
    .then((athlete) => {
      athlete.gamelog.id(req.params.subid).remove();
      athlete.save();
      res.json(athlete);
    })
    .catch((err) => res.json(err));
};
