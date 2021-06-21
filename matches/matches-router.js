const router = require("express").Router();
const fetch = require("node-fetch");

router.post("/getMatchIds", (req, res) => {
  fetch(
    `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${req.body.puuid}/ids?start=0&count=5`,
    {
      method: "GET",
      headers: {
        "X-Riot-Token": process.env.riot_token,
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      res.status(200).json(data);
    });
});

router.post("/getMatch", (req, res) => {
  fetch(
    `https://americas.api.riotgames.com/lol/match/v5/matches/${req.body.matchId}`,
    {
      method: "GET",
      headers: {
        "X-Riot-Token": process.env.riot_token,
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("hit");
      const players = data.info.participants;
      for (i in players) {
        if (players[i].puuid == req.body.puuid) {
          res.status(200).json(players[i]);
        }
      }
    });
});

module.exports = router;
