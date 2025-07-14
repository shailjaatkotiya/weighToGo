import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3001;
const DATA_PATH = path.resolve(process.cwd(), 'data', 'space.json');

app.use(express.json());

interface Offer {
  id: number;
  user: string;
  availableKg: number;
  pricePerKg: number;
  flightType: 'domestic' | 'international';
  from: string;
  to: string;
  date: string;
}

interface RequestKg {
  id: number;
  user: string;
  requiredKg: number;
  flightType: 'domestic' | 'international';
  from: string;
  to: string;
  date: string;
}

function readData() {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw) as { offers: Offer[]; requests: RequestKg[] };
}

function writeData(data: { offers: Offer[]; requests: RequestKg[] }) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

app.get('/space/offers', (_, res) => {
  const data = readData();
  res.json(data.offers);
});

app.get('/space/requests', (_, res) => {
  const data = readData();
  res.json(data.requests);
});

app.post('/space/offers', (req, res) => {
  const data = readData();
  const newOffer: Offer = { id: Date.now(), ...req.body };
  data.offers.push(newOffer);
  writeData(data);
  res.status(201).json(newOffer);
});

app.post('/space/requests', (req, res) => {
  const data = readData();
  const newRequest: RequestKg = { id: Date.now(), ...req.body };
  data.requests.push(newRequest);
  writeData(data);
  res.status(201).json(newRequest);
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
}); 