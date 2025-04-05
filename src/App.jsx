import { useEffect, useState } from "react";
import axios from "axios";
import "./app.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EditCar from "./Editcar";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");

  async function fetchCars() {
    const res = await axios.get("http://localhost:5000/cars");
    setCars(res.data);
  }

  useEffect(() => {
    fetchCars();
  }, []);

  const deleteCar = (id) => {
    axios.delete(`http://localhost:5000/cars/${id}`).then(() => {
      setCars(cars.filter((car) => car.id !== id));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCar = { name, price, model, year, image };
    axios.post("http://localhost:5000/cars", newCar).then(() => {
      fetchCars();
      setName("");
      setPrice("");
      setModel("");
      setYear("");
      setImage("");
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🚗 Yangi Mashina Qo‘shish</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nomi" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Narxi" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" placeholder="Modeli" value={model} onChange={(e) => setModel(e.target.value)} required />
        <input type="number" placeholder="Yili" value={year} onChange={(e) => setYear(e.target.value)} required />
        <input type="text" placeholder="Rasm URL" value={image} onChange={(e) => setImage(e.target.value)} required />
        <button type="submit">Qo‘shish</button>
      </form>

      <h2>Mashinalar</h2>
      <div className="m_cards">
        {cars.map((car) => (
          <div className="cards" key={car.id}>
            <img src={car.image} alt={car.name} style={{ width: "200px", height: "auto" }} />
            <h3>{car.name} - {car.model}</h3>
            <p>💰 {car.price}$ | 📅 {car.year}</p>
            
            <button>
              <Link to={`/edit/${car.id}`} style={{ textDecoration: "none", color: "black" }}>✏️ Edit</Link>
            </button>

            <button onClick={() => deleteCar(car.id)}>🗑 O‘chirish</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditCar />} />
      </Routes>
    </Router>
  );
};

export default App;