var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer  = require('multer')


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// multer local store
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  res.json({"name": req.file.originalname,"type": req.file.mimetype,"size": req.file.size});
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
