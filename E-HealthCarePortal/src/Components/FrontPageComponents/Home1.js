import React from "react";
import Middle from "./Middle";
import Footer from "./Footer";
import Header from "./Header";
import "./Footer.css";
import "./Home.css";

const Home1 = () => {
  return (
    <div className="home1">
      <div className="row">
        {" "}
        <Header />
      </div>
      <div className="row">
        {" "}
        <Middle />
      </div>
      <div className="row">
        {" "}
        <Footer />
      </div>
    </div>
  );
};

export default Home1;
