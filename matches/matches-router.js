const router = require("express").Router();
const fetch = require("node-fetch");

router.post("/getMatchIds", async (req, res) => {
  try {
    await fetch(
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
  } catch (err) {
    res.status(400).json({ message: "could not complete fetch request" });
  }
});

router.post("/getMatch", async (req, res) => {
  try {
    await fetch(
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
  } catch (err) {
    res.status(400).json({ message: "could not complete fetch request" });
  }
});

module.exports = router;
