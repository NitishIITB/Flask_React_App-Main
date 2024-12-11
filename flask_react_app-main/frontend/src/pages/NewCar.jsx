import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Container, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

let BASE_URL = "http://localhost:5000/car";

const NewCar = () => {
  const emptyCar = {
    brand: "",
    make: "",
    year: null,
    cm3: null,
    price: null,
    km: null,
  };

  const inputs = [
    {
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Name",
      label: "Name",
    },
    {
      id: "brand",
      name: "brand",
      type: "text",
      placeholder: "Brand",
      label: "Brand",
    },
    {
      id: "make",
      name: "make",
      type: "text",
      placeholder: "Make",
      label: "Make",
    },
    {
      id: "year",
      name: "year",
      type: "number",
      placeholder: "Year",
      label: "Year",
    },
    {
      id: "price",
      name: "price",
      type: "number",
      placeholder: "Price",
      label: "Price",
    },
    {
      id: "cm3",
      name: "cm3",
      type: "number",
      placeholder: "Cm3",
      label: "Cm3",
    },
    {
      id: "km",
      name: "km",
      type: "number",
      placeholder: "Km",
      label: "Km",
    },
  ];
  

  const [newCar, setNewCar] = useState(emptyCar);
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Car Data:", newCar); // Debugging
    addCar(newCar);
  };

  const onChange = (e) => {
    setNewCar({ ...newCar, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setNewCar(emptyCar);
  };

  const addCar = async (newCar) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar),
      });

      const data = await response.json();
      console.log("Response Status:", response.status); // Debugging
      console.log("Response Data:", data); // Debugging

      if (!response.ok) {
        console.error("Error from backend:", data); // Debugging
        setError(["Failed to add car. Check input data and try again."]);
      } else {
        setError([]);
        navigate("/cars");
      }
    } catch (err) {
      console.error("Request failed:", err); // Debugging
      setError(["An error occurred while connecting to the server."]);
    }
  };

  return (
    <Container>
      <Layout>
        <div>
          <h1 className="text-center text-lg my-2 font-mono font-semibold">
            Insert a New Car
          </h1>
        </div>
        <div>
          <Form onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <Form.Group key={input.id} className="mb-3" controlId={input.id}>
                <Form.Label>{input.label}</Form.Label>
                <Form.Control
                  type={input.type}
                  placeholder={input.placeholder}
                  required={true}
                  value={newCar[input.name] || ""}
                  name={input.name}
                  onChange={onChange}
                />
              </Form.Group>
            ))}

            {error.length > 0 && (
              <div className="alert alert-danger">
                {error.map((err, idx) => (
                  <div key={idx}>{err}</div>
                ))}
              </div>
            )}

            <Button variant="primary" type="submit">
              Insert
            </Button>
            <Button variant="secondary" type="button" onClick={handleReset}>
              Reset
            </Button>
          </Form>
        </div>
      </Layout>
    </Container>
  );
};

export default NewCar;
