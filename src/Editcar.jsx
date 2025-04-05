import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/cars/${id}`).then((res) => {
      setName(res.data.name);
      setPrice(res.data.price);
      setModel(res.data.model);
      setYear(res.data.year);
      setImage(res.data.image);
    });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/cars/${id}`, { name, price, model, year, image }).then(() => {
      navigate("/"); 
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>✏️ Mashinani Tahrirlash</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        <button type="submit">Yangilash</button>
      </form>
    </div>
  );
};

export default EditCar;