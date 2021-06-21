const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config;
const server = express();
const summonerRouter = require("../summoner/summoner-router");
const matchRouter = require("../matches/matches-router");
const championsRouter = require("../champions/champion-router");

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use("/player", summonerRouter);
server.use("/match", matchRouter);
server.use("/champions", championsRouter);

module.exports = server;
