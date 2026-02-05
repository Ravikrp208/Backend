const express = require("express");
const noteModel = require("./Models/notes.model");
const cors =require("cors");
const { model } = require("mongoose");

const app = express();

module.exports =app