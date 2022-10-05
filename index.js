var express = require("express");
var cors = require("cors");
const multer = require("multer");
const uploader = multer();
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
	res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", uploader.single("upfile"), (req, res) => {
	if (req.file) {
		return res.json({
			name: req.file.originalname,
			type: req.file.mimetype,
			size: req.file.size,
		});
	}
	return res.json({ error: "No valid file provided" });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Your app is listening on port " + port);
});
