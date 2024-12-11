import { Card, Container } from "react-bootstrap";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

let BASE_URL = "http://localhost:5000/car";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}`)
      .then((response) => response.json())
      .then((json) => {
        setCars(json);
        setIsPending(false);
      });
  }, []);

  return (
    <Container>
    <Layout>
      <h2>Cars</h2>
      <div className="mx-8">
        {isPending && <Loading />}
        <div>
          {cars &&
            cars.map((el) => {
              return <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src="https://via.placeholder.com/960x550.png?text=IMAGINE+A+CAR!"
                />
                <Card.Body>
                  <Card.Title>
                    {el.brand} {el.make}
                  </Card.Title>
                  <Card.Text>
                    <div>
                      Price: <span>{el.price}</span>
                    </div>
                    <div>Year: {el.year}</div>
                    <div>Km: {el.km}</div>
                  </Card.Text>
                  <Link to={`/cars/${el.id}`}>View {el.brand} {el.make}</Link>
                </Card.Body>
              </Card>;
            })}
        </div>
      </div>
    </Layout>
    </Container>
  );
};

export default Cars;
