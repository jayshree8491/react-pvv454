import React, { useState, useEffect } from 'react';

import './App.css';
import axios from 'axios';

const NUM_ROWS = 10;
const ROW_CAPACITY = [7, 7, 7, 7, 7, 7, 7, 7, 7, 3];
const INITIAL_BOOKED_SEATS = [
  { row: 1, seatIndex: 2 },
  { row: 2, seatIndex: 1 },
  { row: 2, seatIndex: 2 },
  { row: 3, seatIndex: 5 },
  { row: 5, seatIndex: 4 },
  { row: 6, seatIndex: 0 },
  { row: 6, seatIndex: 1 },
  { row: 8, seatIndex: 6 },
];

const Seat = ({ row, seatIndex, isSelected, isBooked, onClick }) => {
  let className = 'seat';
  if (isSelected) className += ' selected';
  if (isBooked) className += ' booked';

  return <div className={className} onClick={() => onClick(row, seatIndex)}></div>;
};

const TrainCoach = () => {
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get('http://localhost:3000/seats');
        const fetchedSeats = response.data;
        setSeats(fetchedSeats);
      } catch (error) {
        console.error('Error fetching seats:', error);
      }
    };
  
    fetchSeats();
  }, []);
  
  const [seats, setSeats] = useState(() => {
    const initialSeats = Array(NUM_ROWS).fill().map(() => Array(ROW_CAPACITY.length).fill(false));
    INITIAL_BOOKED_SEATS.forEach(({ row, seatIndex }) => {
      initialSeats[row][seatIndex] = true;
    });
    return initialSeats;
  });
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (row, seatIndex) => {
    const seat = { row, seatIndex };
    const index = selectedSeats.findIndex((s) => s.row === row && s.seatIndex === seatIndex);

    if (index === -1) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      setSelectedSeats([...selectedSeats.slice(0, index), ...selectedSeats.slice(index + 1)]);
    }
  };

  const handleReservation = async () => {
    const numSeats = selectedSeats.length;
    if (numSeats === 0) return;
  
    try {
      const response = await axios.post('http://localhost:3000/reserve', { seats: selectedSeats });
      console.log(response.data.message);
      setSelectedSeats([]);
    } catch (error) {
      console.error('Error reserving seats:', error);
    }
  };
          
  

  return (
    <div>
      <div className="coach">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((isBooked, seatIndex) => (
              <Seat
                key={seatIndex}
                row={rowIndex}
                seatIndex={seatIndex}
                isSelected={selectedSeats.some((s) => s.row === rowIndex && s.seatIndex === seatIndex)}
                isBooked={isBooked}
                onClick={handleSeatClick}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={handleReservation}>Reserve Selected Seats</button>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <h1>Train Reservation App</h1>
      <TrainCoach />
    </div>
  );
}

export default App;
