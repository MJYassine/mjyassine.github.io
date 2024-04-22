const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const Watch = require('./models/watch');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const mongoURI = "mongodb+srv://finalProject:pleaseWork@mjyassine.47j07gl.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connection successful'))
  .catch((err) => console.error('MongoDB connection error:', err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

app.get('/api/watches', async (req, res) => {
    try {
        const watches = await Watch.find();
        res.json(watches);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

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

app.put('/watches/:id', upload.single('image'), async (req, res) => {
    let updateData = {
        name: req.body.name,
        dialColor: req.body.dialColor,
        material: req.body.material,
        bracelet: req.body.bracelet,
        price: parseFloat(req.body.price),
        year: parseInt(req.body.year, 10)
    };

    if (req.file) {
        updateData.image = req.file.path;
    }

    try {
        const watch = await Watch.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!watch) {
            return res.status(404).send("Watch not found");
        }
        res.json(watch);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});


app.delete('/watches/:id', async (req, res) => {
    try {
        const watch = await Watch.findByIdAndDelete(req.params.id);
        if (!watch) {
            return res.status(404).json({ message: "Watch not found" });
        }
        res.json({ message: "Watch deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

app.delete('/watches/:id', async (req, res) => {
    try {
        const result = await Watch.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).send('Watch not found');
        }
        res.send('Watch deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

