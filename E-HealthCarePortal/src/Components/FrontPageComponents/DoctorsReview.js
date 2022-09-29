import React from "react";
import "./DoctorReviews.css";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Row,
} from "reactstrap";
import Marquee from "react-fast-marquee";

const DoctorsReview = () => {
  return (
    <div className="m-5">
      <Row>
        <h2 className="mb-4">Our Doctors</h2>
        <Marquee speed="50">
          <div className="col-3" id="reviews">
            <Card
              style={{
                width: "18rem",
              }}
            >
              <img alt="Sample" src={require("../../Images/doctors-2.jpg")} />
              <CardBody>
                <CardTitle tag="h5">Dr.Katlynn</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  by Andres
                </CardSubtitle>
                <CardText style={{ height: "10rem" }}>
                  “At 39, I never dreamed I would have a heart operation to save
                  my life. Thank you from the bottom of my heart for repairing
                  mine.”
                </CardText>
              </CardBody>
            </Card>
          </div>
          <div className="col-3">
            <Card
              style={{
                width: "18rem",
              }}
            >
              <img alt="Sample" src={require("../../Images/doctors-3.jpg")} />
              <CardBody>
                <CardTitle tag="h5">Dr. Michale</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  by Anthony
                </CardSubtitle>
                <CardText style={{ height: "10rem" }}>
                  “Thank you for all your dedication and skill over the past
                  eight years. I am very fortunate that you and your staff have
                  given me hope for a brighter future.”
                </CardText>
              </CardBody>
            </Card>
          </div>
          <div className="col-3">
            <Card
              style={{
                width: "18rem",
              }}
            >
              <img alt="Sample" src={require("../../Images/doctors-4.jpg")} />
              <CardBody>
                <CardTitle tag="h5">Dr. Kristina</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  by Christopher
                </CardSubtitle>
                <CardText style={{ height: "10rem" }}>
                  “Thanking you for your support and what I consider your warm
                  and understanding "bedside manner." You make my visit pleasant
                  and I am appreciative of your efforts and dedication to the
                  healing process.”
                </CardText>
              </CardBody>
            </Card>
          </div>
          <div className="col-3">
            <Card
              style={{
                width: "18rem",
              }}
            >
              <img alt="Sample" src={require("../../Images/doctors-5.jfif")} />
              <CardBody>
                <CardTitle tag="h5">Dr. Jadon</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  by Ned
                </CardSubtitle>
                <CardText style={{ height: "10rem" }}>
                  “We don't know where to begin, but you are the most caring
                  doctors that we have ever known. You are “heroes" in our
                  family. Thanks so much for all that you do!”
                </CardText>
              </CardBody>
            </Card>
          </div>
        </Marquee>
      </Row>
    </div>
  );
};

export default DoctorsReview;
