import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
const MEME_INDEX = "/api/v1/memes/index";

function Memes(props: RouteComponentProps) {
  const [memes, setMemes] = useState([]);
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [memeQuery, setMemeQuery] = useState("");
  const [associatedMemes, setAssociatedMemes] = useState([]);

  const loadMemes = async () => {
    const response = await fetch(MEME_INDEX);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Network failure");
    }
  };

  const associateMemes = async () => {
    const url = "/api/v1/memes/associate";
    const csrfToken = document.querySelector('meta[name="csrf-token"]');
    const token = csrfToken["content"];
    await fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: associatedMemes,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => {
        props.history.push(`/memes`);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    if (!loaded) {
      loadMemes()
        .then((response) => {
          setMemes(response);
          setFilteredMemes(response);
        })
        .catch(() => props.history.push("/"));
      setLoaded(true);
    }
  });

  const filterMemes = (filter: string) => {
    setAssociatedMemes([]);
    setMemeQuery(filter);
    if (filter == "") {
      setFilteredMemes(memes);
    } else {
      setFilteredMemes(
        memes.filter((meme) => String(meme.name).toLowerCase().includes(filter))
      );
    }
  };

  const handleMemeCheck = (id: number) => {
    const idIdx = associatedMemes.findIndex((elem) => elem === id);
    if (idIdx === -1) {
      setAssociatedMemes(associatedMemes.concat(id));
    } else {
      const a = associatedMemes.splice(idIdx, 1);
      setAssociatedMemes(associatedMemes);
    }
  };

  const allMemes = filteredMemes.map((meme, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{meme.name}</h5>
          <p className="card-text">
            Created by: {meme.creator}
            <br />
            {meme.edges != null
              ? meme.edges.length > 1
                ? `${meme.edges.length} edges`
                : "1 edge"
              : null}
            <br />
            <input
              key={meme.id}
              onChange={() => handleMemeCheck(meme.id)}
              type="checkbox"
            />
          </p>
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
          <h1 className="display-4">Memes for every occasion</h1>
          <p className="lead text-muted">erry day i'm making janule happy</p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="row">
            <div className="col-sm">
              <input
                placeholder="Search memes"
                id={"search-meme"}
                type="text"
                value={memeQuery}
                onChange={(e) => {
                  filterMemes(e.target.value);
                }}
              />
            </div>
            <div className="col-sm">
              <Link to="/new_meme" className="btn custom-button">
                Create New Meme
              </Link>
            </div>
            <div className="col-sm">
              <button
                disabled={associatedMemes.length < 2}
                type="button"
                className="btn custom-button"
                onClick={() => associateMemes()}
              >
                Associate Memes
              </button>
            </div>
          </div>
          <br />
          <div className="row">
            {filteredMemes.length > 0 ? allMemes : noMemes}
          </div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
}
export default Memes;
