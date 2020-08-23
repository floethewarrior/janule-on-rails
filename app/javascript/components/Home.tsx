import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Janule</h1>
          <p className="lead">Don't let your memes be dreams</p>
          <hr className="my-4" />
          <Link to="/memes" className="btn btn-lg custom-button" role="button">
            View Memes
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Home;
