const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

// Connection URI
const uri = 'mongodb://localhost:3000';
const dbName = 'trainReservationApp';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
 
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');

  // Create or access the required collections
  const db = client.db(dbName);
  const trainCollection = db.collection('train');
  const coachCollection = db.collection('coach');
  const seatCollection = db.collection('seat');
  const reservationCollection = db.collection('reservation');

  // Define routes and further server configuration
  app.post('/reserve', (req, res) => {
    const { seats } = req.body;

    // Save the reservation data to the database
    // ...

    res.json({ message: 'Reservation saved successfully' });
  });

  app.get('/reservations', (req, res) => {
    reservationCollection.find().toArray((err, reservations) => {
      if (err) {
        console.error('Error fetching reservations:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.json(reservations);
    });
  });

  app.get('/seats', (req, res) => {
    seatCollection.find().toArray((err, seats) => {
      if (err) {
        console.error('Error fetching seats:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.json(seats);
    });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  process.on('SIGINT', () => {
    client.close();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  });
});
