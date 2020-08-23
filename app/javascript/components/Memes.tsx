import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
const MEME_INDEX = "/api/v1/memes/index";

function Memes(props: RouteComponentProps) {
  const [memes, setMemes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const loadMemes = async () => {
    const response = await fetch(MEME_INDEX);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Network failure");
    }
  };
  useEffect(() => {
    if (!loaded) {
      loadMemes()
        .then((response) => setMemes(response))
        .catch(() => props.history.push("/"));
      setLoaded(true);
    }
  });

  const allMemes = memes.map((meme, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <img
          src={
            "https://raw.githubusercontent.com/do-community/react_rails_recipe/master/app/assets/images/Sammy_Meal.jpg"
          }
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{meme.name}</h5>
          <Link to={`/meme/${meme.id}`} className="btn custom-button">
            View Meme
          </Link>
        </div>
      </div>
    </div>
  ));
  const noMemes = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No memes yet. Why not <Link to="/new_meme">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Meme for every occasion</h1>
          <p className="lead text-muted">erry day i'm making janule happy</p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-right mb-3">
            <Link to="/meme" className="btn custom-button">
              Create New Meme
            </Link>
          </div>
          <div className="row">{memes.length > 0 ? allMemes : noMemes}</div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
}
export default Memes;
