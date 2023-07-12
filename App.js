const express = require('express');
const app = express();

// Sample train schedule and pricing data
const trainsData = [
    {
        id: 1,
        name: "Train A",
        departureTime: "2023-07-12T10:00:00",
        arrivalTime: "2023-07-12T12:00:00",
        seatsAvailable: 100,
        price: 50.0
    },
    {
        id: 2,
        name: "Train B",
        departureTime: "2023-07-12T11:00:00",
        arrivalTime: "2023-07-12T13:00:00",
        seatsAvailable: 50,
        price: 75.0
    },
    {
        id: 3,
        name: "Train C",
        departureTime: "2023-07-12T12:00:00",
        arrivalTime: "2023-07-12T14:00:00",
        seatsAvailable: 10,
        price: 100.0
    }
];

app.get('/trains', (req, res) => {
    // Retrieve trains within the next 12 hours
    const currentTime = new Date();
    const next12Hours = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000);
    const filteredTrains = trainsData.filter(train =>
        new Date(train.departureTime) >= currentTime && new Date(train.departureTime) <= next12Hours
    );
    res.json(filteredTrains);
});

app.get('/trains/:trainId', (req, res) => {
    // Retrieve detailed information for a specific train
    const trainId = parseInt(req.params.trainId);
    const train = trainsData.find(train => train.id === trainId);
    if (train) {
        res.json(train);
    } else {
        res.status(404).json({ error: "Train not found" });
    }
});

app.listen(3000, () => {
    console.log('API server running on http://localhost:3000');
});
