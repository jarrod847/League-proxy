const router = require("express").Router();
const fetch = require("node-fetch");

router.get("/", (req, res) => {
  fetch(
    `http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion.json`
  )
    .then((res) => {
      console.log;
      return res.json();
    })
    .then((data) => {
      const champions = Object.values(data.data);
      console.log("send the champs");
      res.status(200).json(champions);
    });
});

router.post("/:id", (req, res) => {
  fetch(
    `http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion/${req.params.id}.json`
  )
    .then((res) => {
      console.log;
      return res.json();
    })
    .then((data) => {
      const championDetails = Object.values(data);
      console.log("champ details sent");
      res.status(200).json(data.data[req.params.id]);
    });
});

module.exports = router;
