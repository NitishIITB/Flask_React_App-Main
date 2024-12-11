import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import { Alert, Button, Container } from "react-bootstrap";
import { Card, Form } from "react-bootstrap";

let BASE_URL = "http://localhost:5000/car/";

const Car = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [price, setPrice] = useState(null);
  const [error, setError] = useState([]);
  const [isPending, setIsPending] = useState(true);

  const onChange = (event) => {
    setPrice(event.target.value);
  };

  const getCar = async () => {
    const res = await fetch(`${BASE_URL}${id}`);
    if (!res.ok) {
      setError("Error fetching car");
    } else {
      const data = await res.json();
      setCar(data);
      setPrice(data.price);
    }
    setIsPending(false);
  };

  const handleDelete = async () => {
    const response = await fetch(`${BASE_URL}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const data = await response.json();
      let errArray = data.detail.map((el) => {
        return `${el.loc[1]} -${el.msg}`;
      });
      setError(errArray);
    } else {
      setError([]);
      navigate("/car");
    }
  };

  const updatePrice = async () => {
    console.log("What", `${BASE_URL}${id}`);
    const response = await fetch(`${BASE_URL}${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price }),
    });

    const data = await response.json();
    if (!response.ok) {
      let errArray = data.detail.map((el) => {
        return `${el.loc[1]} -${el.msg}`;
      });
      setError(errArray);
    } else {
      setError([]);
      getCar();
    }
  };

  useEffect(() => {
    getCar(id);
  }, [id]);

  return (
    <Container>
    <Layout>
      {isPending && (
        <div className="bg-red-500 w-full text-white h-10 text-lg">
          <Loading></Loading>
        </div>
      )}

      {error && (
        <div>
          {error &&
            error.map((el, index) => (
              <Alert key="danger" variant="danger">
                {index} - {el}
              </Alert>
            ))}
        </div>
      )}

      {car && (
        <div>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/960x550.png?text=IMAGINE+A+CAR!"
            />
            <Card.Body>
              <Card.Title>
                {car.brand} {car.make}
              </Card.Title>
              <Card.Text>
                <div>Price: <span>{car.price}</span></div>
                <div>Year: {car.year}</div>
                <div>Km: {car.km}</div>
                <div>
                  <Form>
                    <Form.Group className="mb-3" controlId="formPrice">
                      <Form.Label>Price</Form.Label>
                      <Form.Control type="number" placeholder="Enter price" onChange={onChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={updatePrice}>Edit Price</Button>
                    <Button variant="danger" type="submit" onClick={handleDelete}>Delete Car</Button>
                  </Form>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </Layout>
    </Container>
  );
};

export default Car;
