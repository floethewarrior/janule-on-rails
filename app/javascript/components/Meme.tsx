import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

function Meme(props: RouteComponentProps) {
  const [memeLoaded, setMemeLoaded] = useState(false);
  const [meme, setMeme] = useState(null);
  const [edges, setEdges] = useState([]);

  const getMeme = async (url) => {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Network failure");
    }
  };

  const getEdges = async (url) => {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Network failure");
    }
  };

  const deleteMeme = async () => {
    const id = props.match.params["id"];
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]')["content"];
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      props.history.push("/memes");
    } else {
      throw new Error("Network failure");
    }
  };

  useEffect(() => {
    const id = props.match.params["id"];
    if (!memeLoaded) {
      const url = `/api/v1/show/${id}`;
      getMeme(url)
        .then((response) => setMeme(response))
        .catch(() => props.history.push("/"));
      const edgesUrl = `/api/v1/edges/${id}`;
      getEdges(edgesUrl)
        .then((response) => {
          if (response.message == null) {
            setEdges(response);
          }
        })
        .catch(() => props.history.push("/"));
      setMemeLoaded(true);
    }
  });

  const edgeList =
    edges.length != 0
      ? edges.map((edge) => {
          return (
            <li key={edge.id}>
              <Link to={`/meme/${edge.id}`} className="btn btn-link">
                {edge.name}
              </Link>
            </li>
          );
        })
      : null;

  return meme !== null ? (
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">{meme.name}</h1>
      </div>
      <div className="container py-5">
        <div className="row">
          {edgeList != null ? (
            <div>
              Meme Edges<ul>{edgeList}</ul>
            </div>
          ) : null}
          <div className="col-sm-12 col-lg-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteMeme}
            >
              Delete Meme
            </button>
          </div>
        </div>
        <Link to="/memes" className="btn btn-link">
          Back to memes
        </Link>
      </div>
    </div>
  ) : (
    <div>Loading!</div>
  );
}

export default Meme;
