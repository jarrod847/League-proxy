const router = require("express").Router();
const fetch = require("node-fetch");

function timeout(res, data) {
  return res.status(200).json(data);
}

router.post("/getSummoner", async (req, res) => {
  try {
    await fetch(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.body.summonerName}`,
      {
        method: "GET",
        headers: {
          "X-Riot-Token": `${process.env.riot_token}`,
        },
      }
    )
      .then((res) => {
        console.log;
        return res.json();
      })
      .then((data) => {
        if (data.status) {
          res.status(400).json({ message: "could not get summoner" });
        } else {
          res.status(200).json(data);
        }
      });
  } catch (err) {
    res.status(400).json({ message: "could not complete fetch request" });
  }
});

router.post("/getSummonerRank", async (req, res) => {
  try {
    await fetch(
      `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${req.body.summonerId}`,
      {
        method: "GET",
        headers: {
          "X-Riot-Token": `${process.env.riot_token}`,
        },
      }
    )
      .then((res) => {
        console.log;
        return res.json();
      })
      .then((data) => {
        console.log("hit");
        res.status(200).json(data);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json(error);
      });
  } catch (err) {
    res.status(400).json({ message: "could not complete fetch request" });
  }
});

module.exports = router;
