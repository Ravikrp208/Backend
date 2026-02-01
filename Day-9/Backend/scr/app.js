/**
 *server ko create karna 
 
* /
**/

const express = require("express");
const noteModel = require("./Models/notes.model");

const app = express();
app.use(express.json());

/**
 * POST /notes
 * req.body => { title, description }
 */

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});
/**
 * post /notes
 *
 */

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Note feached successfully",
    notes,
  });
});

/**
 * DELETE /API /NOTES:ID
 */

app.delete("/api/notes/:id" , async (req , res)=> {
  const id =req.params.id 
  await noteModel .findByIdAndDelete(id)
  
  res.status(200).json({
    message:"Note deleted successfully."
  })

})

app.patch("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updatedNote = await noteModel.findByIdAndUpdate(
      id,
      { description },
      { new: true },
    );

    res.status(200).json({
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating note",
      error: error.message,
    });
  }
});




module.exports = app;
