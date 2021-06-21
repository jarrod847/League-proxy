const router = require("express").Router();
const fetch = require("node-fetch");

function timeout(res, data) {
  console.log("hit");
  return res.status(200).json(data);
}

router.post("/getSummoner", (req, res) => {
  fetch(
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
        setTimeout(timeout(res, data), 50000);
      }
    })
    .catch((e) => {});
});

router.post("/getSummonerRank", (req, res) => {
  fetch(
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
});

module.exports = router;
