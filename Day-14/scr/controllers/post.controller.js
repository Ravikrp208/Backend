const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const {toFile} = require("@imagekit/nodesjs")
const {toFile} = require("@imagekit/nodes.js")

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createcontroller(req, res) {
  console.log(res.body, req.file);

  const file = await imagekit.files.upload({
        file: new toFile(Buffer.from(req.file.Buffer), 'file'),
//        file:req.file,
         fileName: "Test",
  });

  res.send(file)
}

module.exports = { createcontroller };
