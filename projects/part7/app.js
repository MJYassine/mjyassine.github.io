const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Watch = require('./models/watch');

const app = express();

app.use(express.json());

const mongoURI = "mongodb+srv://finalProject:pleaseWork@mjyassine.47j07gl.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connection successful'))
  .catch((err) => console.error('MongoDB connection error:', err));

  app.get('/api/watches', async (req, res) => {
    try {
      const watches = await Watch.find();
      res.json(watches);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/')  
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    }
  });
  
  const upload = multer({ storage: storage });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/watches', upload.single('image'), async (req, res) => {
    try {
      const watchData = {
        name: req.body.name,
        dialColor: req.body.dialColor,
        material: req.body.material,
        bracelet: req.body.bracelet,
        price: req.body.price,
        year: req.body.year,
        image: req.file ? req.file.path : null  
      };
  
      const newWatch = new Watch(watchData);
      await newWatch.save();
      res.status(201).json(newWatch);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  });
  