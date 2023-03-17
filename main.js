const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const { mergepdfs } = require("./merge");
const upload = multer({ dest: "uploads/" });
app.use("/static", express.static("public"));

const port = 30000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});
app.get("/about", (req, res) => {
  console.log(" about page console");
  res.sendFile(path.join(__dirname, "drag/drag.html"));
});
app.post("/merge", upload.array("pdfs", 3), async (req, res, next) => {
  // console.log(req.files);
  let d = await mergepdfs(
    path.join(__dirname, req.files[0].path),
    path.join(__dirname, req.files[1].path),
    path.join(__dirname, req.files[2].path)
  );
  res.redirect(`http://localhost:30000/static/${d}.pdf`);
  // res.send({ data: req.files });
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
});
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
