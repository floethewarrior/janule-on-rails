import React, { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

const CREATE_MEME_URL = "/api/v1/memes/create";

function NewMeme(props: RouteComponentProps) {
  const [name, setName] = useState("");
  const [creator, setCreator] = useState("kroshtron#5301");

  const sendRequest = async () => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]');
    const token = csrfToken["content"];
    await fetch(CREATE_MEME_URL, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        creator,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        props.history.push(`/meme/${response.id}`);
      })
      .catch((error) => console.log(error.message));
  };

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await sendRequest();
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Create a new meme to feed janule.
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="memeName">Meme name</label>
              <input
                type="text"
                name="name"
                id="memeName"
                className="form-control"
                required
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <label htmlFor="creator">Creator</label>
            <input
              value={creator}
              type="text"
              name="creator"
              id="creator"
              className="form-control"
              required
              onChange={(event) => setCreator(event.target.value)}
            />
            <button type="submit" className="btn custom-button mt-3">
              Create Meme
            </button>
            <Link to="/memes" className="btn btn-link mt-3">
              Back to memes
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
export default NewMeme;
