
const AthleteController = require('../controllers/athlete.controller');
const requireAuth = require("../middleware/requireAuth");

module.exports = (app) => {
  // Athlete
    app.get('/api/athlete', AthleteController.getAllAthletes);
    app.get('/api/athlete/:id', AthleteController.getAthlete);
    app.get('/api/:team', AthleteController.getAthletesByTeam);
    app.post('/api/athlete', requireAuth, AthleteController.createAthlete);
    app.put('/api/athlete/:id', requireAuth, AthleteController.updateAthlete);
    app.delete('/api/athlete/:id', requireAuth, AthleteController.deleteAthlete);

    // Gamelog
    app.get('/api/athlete/gamelog/:subid', AthleteController.getGame);
    app.put('/api/athlete/gamelog/:id', requireAuth, AthleteController.updateGamelog);
    app.put('/api/athlete/gamelog/game/:id/:subid', requireAuth, AthleteController.updateGame);
    app.put('/api/athlete/gamelog/remove-game/:id/:subid', requireAuth, AthleteController.deleteGame);
}