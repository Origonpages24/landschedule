const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://weborigon:admin123@propertydata.hfu5i.mongodb.net/?retryWrites=true&w=majority&appName=propertyData', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch(err => {
    console.error('MongoDB connection error:', err.message); 
});

//SiteDetails Schema
const siteDetailsSchema = new mongoose.Schema({
    slNo: String,
    branchCode: String,
    schNo: String,
    district: String,
    taluk: String,
    village: String,
    kara: String,
    oldTp: String,
    oldSyNo: String,
    subDivNo: String,
    areaAcre: String,
    areaCents: String,
    reSyBkNo: String,
    reSyNo: String,
    subDiv: String,
    areaHec: String,
    areaAres: String,
    areaSqM: String,
    east: String,
    south: String,
    west: String,
    north: String,
});

//SiteDetails Model
const SiteDetails = mongoose.model('SiteDetails', siteDetailsSchema);

//create a new site detail
app.post('/api/sitedetails', async (req, res) => {
    try {
        const siteDetail = new SiteDetails(req.body);
        await siteDetail.save();
        res.status(201).send(siteDetail);
    } catch (error) {
        console.error('Error saving site details:', error);
        res.status(400).send(error);
    }
});

// get all site details
app.get('/api/sitedetails', async (req, res) => {
    try {
        const siteDetails = await SiteDetails.find();
        res.send(siteDetails);
    } catch (error) {
        console.error('Error fetching site details:', error);
        res.status(500).send(error);
    }
});

//delete a site detail by ID
app.delete('/api/sitedetails/:id', async (req, res) => {
    try {
        await SiteDetails.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});