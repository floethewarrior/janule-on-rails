import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

function Meme(props: RouteComponentProps) {
  const [loaded, setLoaded] = useState(false);
  const [meme, setMeme] = useState(null);

  const getMeme = async (url) => {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Network failure");
    }
  };

  useEffect(() => {
    console.log('effect');
    if (!loaded) {
      const id = props.match.params["id"];
      const url = `/api/v1/show/${id}`;
      getMeme(url)
        .then((response) => setMeme(response))
        .catch(() => props.history.push("/"));
      setLoaded(true);
    }
  });
  
  return meme !== null ? (
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {meme.name}
        </h1>
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-2">
            <button type="button" className="btn btn-danger">
              Delete Meme
            </button>
          </div>
        </div>
        <Link to="/memes" className="btn btn-link">
          Back to memes
        </Link>
      </div>
    </div>
  ) : <div>Loading!</div>;
}

export default Meme;
