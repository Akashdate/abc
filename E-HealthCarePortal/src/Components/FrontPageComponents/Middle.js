import { useState } from "react";
import { Col, Row } from "reactstrap";
import Carousel from "react-bootstrap/Carousel";
import "./Middle.css";
import DoctorsReview from "./DoctorsReview";

function Middle() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="container-fluid ">
      <div>
        <Row className="justify-content-center align-items-center px-5 mx-5 mt-3">
          <Col md={8}>
            <Carousel activeIndex={index} onSelect={handleSelect} style={{}}>
              <Carousel.Item>
                <img
                  className="d-block img-fluid imageFormatting"
                  src={require("../../Images/doc1.jpg")}
                  alt="First slide"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block carousel-image img-fluid imageFormatting"
                  src={require("../../Images/doc2.jpg")}
                  alt="Second slide"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block carousel-image img-fluid imageFormatting"
                  src={require("../../Images/doc3.jpg")}
                  alt="Third slide"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col md={4}>
            <div className="fs-2 mx-3">
              "We At E-Healthcare Portal strive to provide best Health Care
              facilities and seamless experience to our users!"
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <DoctorsReview />
      </div>
    </div>
  );
}

export default Middle;
